import { readdir, readFile, writeFile } from 'fs/promises'
import { extname, join } from 'path'

function createDynamicImportRegex(): RegExp {
  return /import\(\s*(["'])(\.\/[^"']+\.js)\1\s*\)/g
}

async function collectJsFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async entry => {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        return collectJsFiles(fullPath)
      }
      return extname(entry.name) === '.js' ? [fullPath] : []
    }),
  )
  return nested.flat()
}

function inlineDynamicImportsInSource(source: string): string {
  let content = source
  let chunkIndex = 0
  const regex = createDynamicImportRegex()
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    const [expression, , specifier] = match
    const alias = `__inlinedDynamicImport${chunkIndex++}`

    content =
      `import * as ${alias} from '${specifier}'\n` +
      content.slice(0, match.index) +
      `Promise.resolve(${alias})` +
      content.slice(match.index + expression.length)

    regex.lastIndex = 0
  }

  return content
}

/**
 * The dist-custom-elements/web output (components/**\/*.js) is documented for static, non-lazy
 * registration and must never contain a real dynamic import() — bundlers that can't code-split
 * (e.g. a single-file IIFE embed) fail or silently mis-bundle otherwise. Every import("./chunk.js")
 * is rewritten into a hoisted static import + Promise.resolve(), which is semantically equivalent
 * since the target is always an already co-located local chunk.
 */
export async function inlineDynamicImports(baseDir: string): Promise<void> {
  const files = await collectJsFiles(baseDir)

  await Promise.all(
    files.map(async file => {
      const source = await readFile(file, 'utf-8')
      if (!source.includes('import(')) {
        return
      }
      await writeFile(file, inlineDynamicImportsInSource(source), 'utf-8')
    }),
  )
}

/**
 * Standing regression guard: fails the build if a dynamic import() ever reappears in the static
 * components/ output, instead of silently shipping a bundler-breaking chunk again.
 */
export async function assertNoDynamicImports(baseDir: string): Promise<void> {
  const files = await collectJsFiles(baseDir)
  const offenders = (
    await Promise.all(
      files.map(async file => {
        const source = await readFile(file, 'utf-8')
        return source.includes('import(') ? file : null
      }),
    )
  ).filter((file): file is string => file !== null)

  if (offenders.length > 0) {
    throw new Error(
      `Dynamic import() found in the static components/ output, which must stay import()-free for ` +
        `non-code-splitting consumers:\n${offenders.map(file => `  - ${file}`).join('\n')}`,
    )
  }
}
