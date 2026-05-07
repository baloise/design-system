import { execSync } from 'child_process'
import { mkdir, writeFile } from 'fs/promises'
import { glob } from 'glob'
import { browserslistToTargets, transform } from 'lightningcss'
import browserslist from 'browserslist'
import { basename, dirname, join, relative } from 'path'
import { compileAsync } from 'sass-embedded'
import ts from 'typescript'

const lcTargets = browserslistToTargets(browserslist('>0.5%, not dead'))
const IS_RELEASE = process.env['DS_RELEASE'] === 'true'

export const NEWLINE = '\n'

export const scan = async filePath => {
  // glop always returns and works with forward slashes
  return glob(filePath.replace(/\\/g, '/'))
}

export async function compileSass(file: string, options: { projectRoot: string; folderPath?: string }) {
  const fileName = basename(file).replace('.scss', '')

  let folderPath = options.folderPath
  if (!folderPath) {
    folderPath = relative(options.projectRoot, dirname(file))
      .replace('sass', '')
      .replace(/^\/|\/$/g, '')
  }

  const sassResult = await compileAsync(file, {
    loadPaths: ['node_modules'],
    sourceMap: !IS_RELEASE,
    sourceMapIncludeSources: !IS_RELEASE,
  })

  const { code: prefixedCode, map: prefixedMap } = transform({
    filename: `${fileName}.css`,
    code: Buffer.from(sassResult.css),
    sourceMap: !IS_RELEASE,
    targets: lcTargets,
    errorRecovery: true,
  })

  const { code: minCode } = transform({
    filename: `${fileName}.css`,
    code: prefixedCode,
    minify: true,
    targets: lcTargets,
    errorRecovery: true,
  })

  const outputPath = join('css', folderPath)
  await mkdir(join(options.projectRoot, outputPath), { recursive: true })
  await writeFile(join(options.projectRoot, outputPath, `${fileName}.css`), prefixedCode)
  await writeFile(
    join(options.projectRoot, outputPath, `${fileName}.css.map`),
    prefixedMap instanceof Uint8Array ? prefixedMap : '',
  )
  await writeFile(join(options.projectRoot, outputPath, `${fileName}.min.css`), minCode)
}

export async function compileSassToMergedFile(
  files: string[],
  outputFileName: string,
  options: { projectRoot: string; folderPath?: string },
) {
  let mergedCss = ''
  const mergedSourceMap = {
    version: 3,
    sources: [] as string[],
    names: [],
    mappings: '',
    file: outputFileName,
  }

  // Compile all sass files in parallel and merge the CSS (preserving input order)
  const results = await Promise.all(
    files.map(file =>
      compileAsync(file, {
        loadPaths: ['node_modules'],
        sourceMap: true,
        sourceMapIncludeSources: true,
      }),
    ),
  )

  for (const sassResult of results) {
    mergedCss += sassResult.css + NEWLINE
    if (sassResult.sourceMap) {
      mergedSourceMap.sources.push(...(sassResult.sourceMap.sources || []))
    }
  }

  const folderPath = options.folderPath || ''

  const { code: prefixedCode } = transform({
    filename: outputFileName,
    code: Buffer.from(mergedCss),
    sourceMap: false,
    targets: lcTargets,
    errorRecovery: true,
  })

  const { code: minCode } = transform({
    filename: outputFileName,
    code: prefixedCode,
    minify: true,
    targets: lcTargets,
    errorRecovery: true,
  })

  const outputPath = join('css', folderPath)
  await mkdir(join(options.projectRoot, outputPath), { recursive: true })
  await writeFile(join(options.projectRoot, outputPath, outputFileName), prefixedCode)
  await writeFile(join(options.projectRoot, outputPath, `${outputFileName}.map`), JSON.stringify(mergedSourceMap))
  await writeFile(join(options.projectRoot, outputPath, outputFileName.replace('.css', '.min.css')), minCode)
}

export const createSourceFile = content => ts.createSourceFile('x.ts', content, ts.ScriptTarget.Latest)

const filterByKind = kind => list => list.filter(item => item.kind === kind)
const firstByKind = kind => list => filterByKind(kind)(list)[0]

export const filterModuleDeclaration = firstByKind(ts.SyntaxKind.ModuleDeclaration)
export const filterInterfaceDeclaration = firstByKind(ts.SyntaxKind.InterfaceDeclaration)
export const filterVariableStatement = filterByKind(ts.SyntaxKind.VariableStatement)

export const parseFunctionComment = (node, sourceFile) =>
  node
    .getFullText(sourceFile)
    .replace(node.getText(sourceFile), '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .filter(l => l !== '/**' && l !== '*/')
    .map(l => (l.startsWith('*') ? l.substring(2) : l))

export const parseSelectorComment = (node, sourceFile) => {
  const pattern = /[a-zA-Z]/
  return node
    .getFullText(sourceFile)
    .split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .filter(l => pattern.test(l))
    .map(l => (l.startsWith('*') ? l.substring(2) : l))
    .map(l => l.split(':')[0])
}

export async function runCommand(command: string, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      execSync(command, {
        cwd,
        encoding: 'utf-8',
        stdio: 'inherit',
      })
      return resolve()
    } catch (error) {
      return reject(error)
    }
  })
}
