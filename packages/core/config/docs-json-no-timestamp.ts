import { JsonDocs, OutputTargetDocsJson } from '@stencil/core/internal'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

interface InheritanceEntry {
  cssVar: string
  figmaName: string
}

interface TokenValue {
  name: string
  cssVarName: string
  value: string
  nativeValue: string
  inheritance: InheritanceEntry[]
  path: string[]
}

function parseScssStyles(dirPath: string): Array<{ name: string; docs: string }> {
  if (!dirPath || !existsSync(dirPath)) return []

  let files: string[]
  try {
    files = readdirSync(dirPath).filter(f => f.endsWith('.scss'))
  } catch {
    return []
  }

  const styles: Array<{ name: string; docs: string }> = []
  const propRegex = /@prop\s+(--[\w-]+)\s*:\s*(.+)/g

  for (const file of files) {
    const content = readFileSync(join(dirPath, file), 'utf8')
    let match: RegExpExecArray | null
    propRegex.lastIndex = 0
    while ((match = propRegex.exec(content)) !== null) {
      styles.push({ name: match[1], docs: match[2].trim() })
    }
  }

  return styles
}

function convertTokenPathToCssVar(componentName: string, path: string[]): string {
  return `--ds-${componentName.toLowerCase()}-${path.join('-').toLowerCase()}`
}

// Strip emoji and non-alphanumeric characters (except spaces) from a token path segment
function stripEmoji(s: string): string {
  return s.replace(/[^\p{L}\p{N}\s]/gu, '').trim()
}

// Convert a reference path like "🏷️ Semantic.🔤 Text.Color.Primary" to both a CSS var and a Figma name
function refPathToEntry(refPath: string): InheritanceEntry {
  const parts = refPath.split('.').map(stripEmoji)
  // Skip tier for CSS var but include it in the Figma name (e.g. "Semantic / Text / Color / Primary")
  const pathParts = parts.slice(1)
  return {
    cssVar: `--ds-${pathParts.join('-').toLowerCase().replace(/\s+/g, '-')}`,
    figmaName: parts.join(' / '),
  }
}

// Follow token references until a raw value is reached.
// Returns the native value string and the ordered inheritance chain
// (from most primitive to the component's own var, inclusive).
function resolveTokenChain(
  rawValue: string,
  ownEntry: InheritanceEntry,
  tokensData: any,
): { nativeValue: string; inheritance: InheritanceEntry[] } {
  const chain: InheritanceEntry[] = []
  let current = rawValue

  for (let depth = 0; depth < 6; depth++) {
    const refMatch = current.match(/^\{(.+)\}$/)
    if (!refMatch) break

    const refPath = refMatch[1]
    chain.push(refPathToEntry(refPath))

    const parts = refPath.split('.')
    let node: any = tokensData
    for (const p of parts) {
      node = node?.[p]
    }

    if (!node || !('$value' in node)) break

    const next = node.$value
    if (next !== null && typeof next === 'object') {
      // Color object — extract hex
      return {
        nativeValue: next.hex ?? JSON.stringify(next),
        inheritance: [...chain.reverse(), ownEntry],
      }
    }
    current = String(next)
  }

  return {
    nativeValue: current,
    inheritance: [...chain.reverse(), ownEntry],
  }
}

function flattenTokenObject(
  obj: any,
  componentName: string,
  tokensData: any,
  path: string[] = [],
  hierarchyPath: string[] = [],
  result: TokenValue[] = [],
): TokenValue[] {
  for (const key in obj) {
    if (!key.startsWith('$')) {
      const value = obj[key]
      const newPath = [...path, key]
      const newHierarchyPath = [...hierarchyPath, key]

      if (value && typeof value === 'object' && '$value' in value) {
        const cssVarName = convertTokenPathToCssVar(componentName, newPath)
        const tokenValue = typeof value.$value === 'string' ? value.$value : JSON.stringify(value.$value)
        const ownEntry: InheritanceEntry = {
          cssVar: cssVarName,
          figmaName: newHierarchyPath.map(stripEmoji).join(' / '),
        }
        const { nativeValue, inheritance } = resolveTokenChain(tokenValue, ownEntry, tokensData)
        result.push({
          name: newHierarchyPath.join(' / '),
          cssVarName,
          value: tokenValue,
          nativeValue,
          inheritance,
          path: newHierarchyPath,
        })
      } else if (value && typeof value === 'object' && !value.$type) {
        flattenTokenObject(value, componentName, tokensData, newPath, newHierarchyPath, result)
      }
    }
  }
  return result
}

function extractComponentTokens(tokensFilePath: string): Map<string, TokenValue[]> {
  const componentTokens = new Map<string, TokenValue[]>()

  if (!existsSync(tokensFilePath)) {
    console.warn(`Tokens file not found: ${tokensFilePath}`)
    return componentTokens
  }

  try {
    const content = readFileSync(tokensFilePath, 'utf8')
    const tokens = JSON.parse(content)

    // Find the Component section (may have emoji prefix)
    let componentSection = null
    for (const key in tokens) {
      if (key.includes('Component') || key === '🧩 Component') {
        componentSection = tokens[key]
        break
      }
    }

    if (componentSection) {
      for (const componentName in componentSection) {
        if (!componentName.startsWith('$')) {
          const tokenArray = flattenTokenObject(
            componentSection[componentName],
            componentName,
            tokens,
            [],
            ['🧩 Component', componentName],
          )
          if (tokenArray.length > 0) {
            componentTokens.set(componentName.toLowerCase(), tokenArray)
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading component tokens from ${tokensFilePath}:`, error)
  }

  return componentTokens
}

/**
 * Custom output target that generates docs-json without timestamp and path information
 * This wraps the standard docs-json output and removes the timestamp field and all path-related properties
 * Also enriches components with design tokens from Base.tokens.json
 */
export function docsJsonWithoutTimestamp(outputTarget: OutputTargetDocsJson): OutputTargetDocsJson {
  return {
    ...outputTarget,
    type: 'docs-custom',
    generator: async (docs: JsonDocs) => {
      // Remove timestamp from docs
      const { timestamp: _timestamp, ...docsWithoutTimestamp } = docs as any

      // Read component tokens from Base.tokens.json
      // process.cwd() is packages/core/ during Stencil build, so go up two levels to reach workspace root
      const tokensFilePath = join(process.cwd(), '..', '..', 'packages', 'tokens', 'tokens', 'Base.tokens.json')
      const componentTokens = extractComponentTokens(tokensFilePath)

      // Remove path-related properties from components and add tokens
      if (docsWithoutTimestamp.components) {
        docsWithoutTimestamp.components = docsWithoutTimestamp.components.map((component: any) => {
          const {
            dirPath: _dirPath,
            filePath: _filePath,
            readmePath: _readmePath,
            usagesDir: _usagesDir,
            ...componentWithoutPaths
          } = component

          const scssStyles = parseScssStyles(_dirPath)
          if (scssStyles.length > 0) {
            componentWithoutPaths.styles = [...(componentWithoutPaths.styles ?? []), ...scssStyles]
          }

          // Extract component name from tag (e.g., "ds-badge" -> "badge", "ds-progress-bar" -> "progressbar")
          // Hyphens are stripped to match PascalCase token keys lowercased (e.g., ProgressBar -> progressbar)
          const tagName = component.tag?.toLowerCase().replace(/^ds-/, '').replace(/-/g, '')
          const tokens = componentTokens.get(tagName)

          // Add tokens array if component has design tokens
          if (tokens && tokens.length > 0) {
            componentWithoutPaths.tokens = tokens
          }

          return componentWithoutPaths
        })
      }

      // Write the file without timestamp and paths
      const content = JSON.stringify(docsWithoutTimestamp, null, 2)
      writeFileSync(outputTarget.file, content, 'utf8')
    },
  } as any
}
