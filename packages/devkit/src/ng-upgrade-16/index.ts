/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import { findNodes } from '@schematics/angular/utility/ast-utils'
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript'
import { glob } from 'glob'

import { AngularType, SchemaOptions } from './schema'
import { getWorkspace } from '@schematics/angular/utility/workspace'
import { join } from 'path'

interface RenameConfig {
  [oldName: string]: string // oldName -> newName
}

const RENAME_CONFIG: RenameConfig = {
  '@baloise/design-system-components-angular/standalone': '@baloise/ds-angular',
  '@baloise/design-system-components-angular': '@baloise/ds-angular-module',
  '@baloise/design-system-components': '@baloise/ds-core',
  '@baloise/design-system-tokens': '@baloise/ds-tokens',
  '@baloise/design-system-styles': '@baloise/ds-styles',
  '@baloise/design-system-css': '@baloise/ds-css',
  '@baloise/design-system-icons': '@baloise/ds-icons',
  '@baloise/design-system-brand-icons': '@baloise/ds-brand-icons',
  '@baloise/design-system-maps': '@baloise/ds-maps',
  '@baloise/design-system-fonts': '@baloise/ds-fonts',
  '@baloise/design-system-favicons': '@baloise/ds-fonts',
  '@baloise/design-system-testing': '@baloise/ds-testing',
  '@baloise/design-system-components-table': '@baloise/ds-table',
  // Add more renaming rules here as needed
}

export default function (options: SchemaOptions): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule | void> => {
    const actions: Rule[] = []

    actions.push(changePackageName(options))
    actions.push(updateImports(RENAME_CONFIG))
    actions.push(updateSassImports())
    actions.push((tree: Tree, _context: SchematicContext) => {
      _context.addTask(new NodePackageInstallTask())
      return tree
    })

    return chain(actions)(host, context) as any
  }
}

function changePackageName(options: SchemaOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJsonPath = '/package.json'
    const packageJsonContent = tree.read(packageJsonPath)

    if (!packageJsonContent) {
      throw new Error('Could not find package.json')
    }

    const packageJson = JSON.parse(packageJsonContent.toString())

    // Update package name
    // const upgradeVersion = '~16.0.0'
    const upgradeVersion = 'latest'
    const changePackage = (from: string, to: string) => {
      if (packageJson.dependencies[`@baloise/${from}`]) {
        packageJson.dependencies[`@baloise/${to}`] = upgradeVersion
        delete packageJson.dependencies[`@baloise/${from}`]
      } else {
        if (packageJson.devDependencies[`@baloise/${from}`]) {
          packageJson.devDependencies[`@baloise/${to}`] = upgradeVersion
          delete packageJson.devDependencies[`@baloise/${from}`]
        }
      }
    }

    if (options.angularType === AngularType.Standalone) {
      changePackage('design-system-components-angular', 'ds-angular')
    } else if (options.angularType === AngularType.Module) {
      changePackage('design-system-components-angular', 'ds-angular-module')
    }

    changePackage('design-system-components', 'ds-core')

    changePackage('design-system-css', 'ds-css')

    changePackage('design-system-styles', 'ds-styles')
    changePackage('design-system-tokens', 'ds-tokens')

    changePackage('design-system-icons', 'ds-icons')
    changePackage('design-system-brand-icons', 'ds-brand-icons')
    changePackage('design-system-favicons', 'ds-favicons')
    changePackage('design-system-fonts', 'ds-fonts')
    changePackage('design-system-maps', 'ds-maps')

    changePackage('design-system-components-table', 'ds-table')
    changePackage('design-system-testing', 'ds-testing')
    changePackage('design-system-cli', 'ds-devkit')

    if (!packageJson.dependencies[`@baloise/ds-css`] && !packageJson.dependencies[`@baloise/ds-styles`]) {
      packageJson.dependencies[`@baloise/ds-css`] = upgradeVersion
    }

    tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2))

    return tree
  }
}

function updateImports(config: RenameConfig): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(tree)
    if (!workspace) {
      throw new Error('Could not find Angular workspace configuration')
    }

    const project = workspace.projects.get(workspace.projects.keys().next().value)

    if (!project) {
      throw new Error('Could not find project in Angular workspace')
    }

    const tsFiles = await findTypeScriptFiles()
    tsFiles.forEach(filePath => {
      const sourceFile = getSourceFile(tree, filePath)
      const fileChanges: { [filePath: string]: ts.TextChange[] } = {}

      findNodes(sourceFile, ts.SyntaxKind.ImportDeclaration)
        .filter((node: any) => {
          const moduleSpecifier = node.moduleSpecifier.getText(sourceFile)
          return Object.keys(config).some(oldName => moduleSpecifier.includes(oldName))
        })
        .forEach((node: any) => {
          // const importClause = change.importClause.getText(sourceFile)
          const moduleSpecifier = node.moduleSpecifier.getText(sourceFile)
          const newModuleSpecifier = Object.keys(config).reduce((acc, oldName) => {
            return acc.replace(oldName, config[oldName])
          }, moduleSpecifier)

          // Extract imported items
          const namedImports = node.importClause?.getText(sourceFile) || ''
          const importClause = namedImports ? `${namedImports}` : ''

          const recorder = fileChanges[filePath] || []
          recorder.push({
            span: {
              start: node.getStart(sourceFile),
              length: node.getWidth(sourceFile),
            },
            newText: `import ${importClause} from ${newModuleSpecifier};`,
          })
          fileChanges[filePath] = recorder
        })

      // Apply all changes for the current file
      const recorder = tree.beginUpdate(filePath)
      fileChanges[filePath]?.forEach(change => {
        recorder.remove(change.span.start, change.span.length)
        recorder.insertRight(change.span.start, change.newText)
      })
      tree.commitUpdate(recorder)
    })
  }
}

function updateSassImports(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.getDir('src').visit((path, file) => {
      if (!file) return
      if (path.endsWith('.scss') || path.endsWith('.sass')) {
        const oldImportPath = '@baloise/design-system-css'
        const newImportPath = '@baloise/ds-css'
        const content = file.content.toString()

        if (content.includes(oldImportPath)) {
          const newContent = content.replace(new RegExp(oldImportPath, 'g'), newImportPath)
          const recorder = tree.beginUpdate(path)
          recorder.remove(0, content.length)
          recorder.insertLeft(0, newContent)
          tree.commitUpdate(recorder)
        }
      }
    })

    return tree
  }
}

function getSourceFile(host: Tree, path: string): ts.SourceFile {
  const content = host.readText(path)
  const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true)
  return source
}

async function findTypeScriptFiles(): Promise<string[]> {
  const pattern = '**/*.ts'
  const result = await glob(pattern.replace(/\\/g, '/'), {
    cwd: join(process.cwd(), 'src').replace(/\\/g, '/'),
    ignore: ['**/node_modules/**'],
  })
  return result.map(file => join('src', file))
}
