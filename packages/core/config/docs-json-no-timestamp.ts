import { JsonDocs, OutputTargetDocsJson } from '@stencil/core/internal'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

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

export interface POParam {
  name: string
  type: string
}

export interface POMethod {
  name: string
  params: POParam[]
  docs: string
}

export interface POLocator {
  name: string
  type: string
  docs: string
}

export interface PageObjectData {
  class: string
  import: string
  locators: POLocator[]
  actions: POMethod[]
  assertions: POMethod[]
}

function extractJsDocBefore(content: string, index: number): string {
  const before = content.slice(0, index)
  const match = before.match(/\/\*\*([\s\S]*?)\*\/\s*$/)
  if (!match) return ''
  return match[1]
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
}

function parseParams(paramStr: string): POParam[] {
  const trimmed = paramStr.trim()
  if (!trimmed) return []
  return trimmed.split(',').map(p => {
    const colonIdx = p.indexOf(':')
    if (colonIdx === -1) return { name: p.trim(), type: 'unknown' }
    return { name: p.slice(0, colonIdx).trim(), type: p.slice(colonIdx + 1).trim() }
  })
}

export function parsePOFile(content: string): PageObjectData | null {
  const classMatch = content.match(/class\s+(Ds\w+)\s+extends\s+PageObject/)
  if (!classMatch) return null
  const className = classMatch[1]

  const locators: POLocator[] = []
  const locatorRegex = /readonly\s+(\w+)\s*:\s*Locator/g
  let m: RegExpExecArray | null
  while ((m = locatorRegex.exec(content)) !== null) {
    locators.push({ name: m[1], type: 'Locator', docs: extractJsDocBefore(content, m.index) })
  }

  const actions: POMethod[] = []
  const assertions: POMethod[] = []
  const methodRegex = /async\s+(\w+)\s*\(([^)]*)\)\s*\{/g
  while ((m = methodRegex.exec(content)) !== null) {
    const name = m[1]
    if (name === 'constructor') continue
    const method: POMethod = {
      name,
      params: parseParams(m[2]),
      docs: extractJsDocBefore(content, m.index),
    }
    if (name.startsWith('assert')) {
      assertions.push(method)
    } else {
      actions.push(method)
    }
  }

  return { class: className, import: '@baloise/ds-playwright', locators, actions, assertions }
}

function extractComponentPageObjects(playwrightDir: string): Map<string, PageObjectData> {
  const map = new Map<string, PageObjectData>()
  if (!existsSync(playwrightDir)) return map
  let files: string[]
  try {
    files = readdirSync(playwrightDir).filter(f => f.endsWith('.po.ts'))
  } catch {
    return map
  }
  for (const file of files) {
    const componentName = file.replace('.po.ts', '')
    const content = readFileSync(join(playwrightDir, file), 'utf8')
    const data = parsePOFile(content)
    if (data) map.set(componentName, data)
  }
  return map
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

// Convert a reference path like "🔗 Alias.🔤 Text.Color.Primary" to both a CSS var and a Figma name
function refPathToEntry(refPath: string): InheritanceEntry {
  const parts = refPath.split('.').map(stripEmoji)
  // Skip tier for CSS var but include it in the Figma name (e.g. "Alias / Text / Color / Primary")
  const pathParts = parts.slice(1)
  return {
    cssVar: `--ds-${pathParts.join('-').toLowerCase().replace(/\s+/g, '-')}`,
    figmaName: parts.join(' / '),
  }
}

// Follow token references until a raw value is reached.
// Returns the native value string and the ordered inheritance chain
// (from most global to the component's own var, inclusive).
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
 * Scans the components directory for CSS-only components.
 * A CSS-only component has a .style.scss file but no .tsx file.
 */
function scanCssOnlyComponents(componentsDir: string): string[] {
  const cssOnlyComponents: string[] = []

  if (!existsSync(componentsDir)) return cssOnlyComponents

  let dirs: string[]
  try {
    dirs = readdirSync(componentsDir)
  } catch {
    return cssOnlyComponents
  }

  for (const dir of dirs) {
    const dirPath = join(componentsDir, dir)

    // Check for .style.scss file
    const hasStyleScss = existsSync(join(dirPath, `${dir}.style.scss`))

    // Check for .tsx file
    const hasTsx = existsSync(join(dirPath, `${dir}.tsx`))

    // CSS-only if it has style.scss but no .tsx
    if (hasStyleScss && !hasTsx) {
      cssOnlyComponents.push(dir)
    }
  }

  return cssOnlyComponents
}

/**
 * Create a CSS-only component entry for the components.json
 */
function createCssOnlyComponentEntry(
  componentName: string,
  styles: Array<{ name: string; docs: string }>,
  tokens: TokenValue[] | undefined,
  docs: string,
): any {
  return {
    tag: componentName,
    type: 'css-only',
    docs,
    styles: styles.length > 0 ? styles : [],
    tokens: tokens && tokens.length > 0 ? tokens : [],
    properties: [],
  }
}

/**
 * Custom output target that generates docs-json without timestamp and path information
 * This wraps the standard docs-json output and removes the timestamp field and all path-related properties
 * Also enriches components with design tokens from Base.tokens.json
 */
export function enrichComponentDocsJson(outputTarget: OutputTargetDocsJson): OutputTargetDocsJson {
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

      const playwrightDir = join(process.cwd(), '..', '..', 'packages', 'playwright', 'src', 'lib', 'components')
      const pageObjects = extractComponentPageObjects(playwrightDir)

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

          // Add styles the component css vairables --component
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

          const poName = component.tag?.toLowerCase().replace(/^ds-/, '') ?? ''
          const po = pageObjects.get(poName)
          if (po) {
            componentWithoutPaths.pageObject = po
          }

          // Add type marker for web-component
          componentWithoutPaths.type = 'web-component'

          return componentWithoutPaths
        })
      }

      // Scan and add CSS-only components
      const componentsDir = join(process.cwd(), 'src', 'components')
      const cssOnlyComponentNames = scanCssOnlyComponents(componentsDir)

      for (const componentName of cssOnlyComponentNames) {
        const componentDir = join(componentsDir, componentName)
        const styles = parseScssStyles(componentDir)
        const tokens = componentTokens.get(componentName.toLowerCase())
        const docs = extractComponentDescription(componentDir)
        const variants = extractComponentVariants(componentDir)

        const cssOnlyEntry = createCssOnlyComponentEntry(componentName, styles, tokens, docs)
        // Phase 2: Add variants to entry when needed
        if (variants.length > 0) {
          cssOnlyEntry.variants = variants
        }
        docsWithoutTimestamp.components.push(cssOnlyEntry)
      }

      // Write the file without timestamp and paths
      const content = JSON.stringify(docsWithoutTimestamp, null, 2)
      writeFileSync(outputTarget.file, content, 'utf8')
    },
  } as any
}

/**
 * Extract JSDoc description from SCSS file
 * Phase 1: Extracts the lead description (everything before first @tag)
 */
function extractComponentDescription(componentDir: string): string {
  const componentName = basename(componentDir)
  const scssFile = join(componentDir, `${componentName}.style.scss`)

  if (!existsSync(scssFile)) {
    return ''
  }

  try {
    const content = readFileSync(scssFile, 'utf8')
    const jsDocMatch = content.match(/^\/\*\*([\s\S]*?)\*\//m)

    if (!jsDocMatch) {
      return ''
    }

    // Extract lead description (everything before first @tag)
    const jsDocContent = jsDocMatch[1]
    const leadMatch = jsDocContent.match(/^([\s\S]*?)(?=\s*@|$)/)

    if (leadMatch) {
      return leadMatch[1]
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '').trim())
        .filter(Boolean)
        .join('\n')
    }

    return ''
  } catch (error) {
    console.error(`Error reading component description from ${scssFile}:`, error)
    return ''
  }
}

/**
 * Phase 2: Extract variant properties from @variant tags
 * Extracts CSS modifier classes and their descriptions for component variants
 * Example: @variant is-invalid - Invalid state style
 */
function extractComponentVariants(componentDir: string): Array<{ name: string; docs: string }> {
  const componentName = basename(componentDir)
  const scssFile = join(componentDir, `${componentName}.style.scss`)

  if (!existsSync(scssFile)) {
    return []
  }

  try {
    const content = readFileSync(scssFile, 'utf8')
    const jsDocMatch = content.match(/^\/\*\*([\s\S]*?)\*\//m)

    if (!jsDocMatch) {
      return []
    }

    const jsDocContent = jsDocMatch[1]
    const variantRegex = /@variant\s+([\w-]+)\s*-\s*(.+)/g
    const variants: Array<{ name: string; docs: string }> = []

    let m: RegExpExecArray | null
    while ((m = variantRegex.exec(jsDocContent)) !== null) {
      variants.push({
        name: m[1],
        docs: m[2].trim(),
      })
    }

    return variants
  } catch (error) {
    console.error(`Error reading variants from ${scssFile}:`, error)
    return []
  }
}
