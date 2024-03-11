import autoprefixer from 'autoprefixer'
import { mkdir, writeFile } from 'fs/promises'
import { glob } from 'glob'
import { basename, dirname, join, relative } from 'path'
import postcss from 'postcss'
import { compileAsync } from 'sass'
import CleanCSS from 'clean-css'
import ts from 'typescript'
import { execSync } from 'child_process'

export const NEWLINE = '\n'

export const scan = async filePath => {
  // glop always returns and works with forward slashes
  return glob(filePath.replace(/\\/g, '/'))
}

export async function compileSass(file: string, options: { projectRoot: string }) {
  const fileName = basename(file).replace('.sass', '')
  const folderPath = relative(options.projectRoot, dirname(file))
    .replace('sass', '')
    .replace(/^\/|\/$/g, '')

  const sassResult = await compileAsync(file, {
    loadPaths: ['node_modules'],
    sourceMap: true,
    sourceMapIncludeSources: true,
  })

  const postcssResult = await postcss([autoprefixer({ add: true, grid: true, flexbox: true })])
    .process(sassResult.css, {
      from: `${options.projectRoot}/css/*.css`,
      to: `${options.projectRoot}/css`,
      map: {
        inline: false,
        annotation: join(folderPath, `${fileName}.css.map`),
      },
    })
    .async()

  const cssContent = postcssResult.toString()
  const cleanResult = new CleanCSS({ compatibility: '*', level: 2 }).minify(cssContent)

  const outputPath = join('css', folderPath)
  await mkdir(join(options.projectRoot, outputPath), { recursive: true })
  await writeFile(join(options.projectRoot, outputPath, `${fileName}.css`), cssContent)
  await writeFile(join(options.projectRoot, outputPath, `${fileName}.css.map`), JSON.stringify(sassResult.sourceMap))
  await writeFile(join(options.projectRoot, outputPath, `${fileName}.min.css`), cleanResult.styles)
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
