import { BuildCoreExecutorSchema } from './schema'
import { dirname, join, sep } from 'path'
import replace from 'replace-in-file'
import { mkdir, readFile, rm, writeFile } from 'fs/promises'
import { copy } from 'fs-extra'
import {
  createSourceFile,
  filterInterfaceDeclaration,
  filterModuleDeclaration,
  filterVariableStatement,
  parseFunctionComment,
  parseSelectorComment,
  runCommand,
  scan,
} from '../utils'

export default async function runExecutor(options: BuildCoreExecutorSchema) {
  try {
    // pre build tasks
    await createTestingDocs(options)
    await createTestingSelectors(options)
    await createContributorList(options)

    // stencil build task
    await runCommand('npx stencil build', join(process.cwd(), options.projectRoot))

    // post build tasks
    await adjustGlobalVar(options)
    await createTagList()
    await copyToDocs(options)
    await cleanUp(options)
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}

/********************************************************************************
 * pre build task
 ********************************************************************************/

// This script reads the defined filter functions and creates
// a JSON file with all the meta information for documentation
// and code generations.
async function createTestingSelectors(options: BuildCoreExecutorSchema) {
  const pathToType = join(options.projectRoot, '../testing/src/selectors/index.ts')
  const typeFileContent = await readFile(pathToType, 'utf-8')
  const selectors = parseTestingSelectorTypes(typeFileContent)
  await writeFile(
    join(options.projectRoot, '../../resources/data/selectors.json'),
    JSON.stringify(selectors, undefined, 2),
  )
}

function parseTestingSelectorTypes(fileContent) {
  const sourceFile = createSourceFile(fileContent)
  const variableStatementsNode = filterVariableStatement(sourceFile.statements)
  const properties = variableStatementsNode[0].declarationList.declarations[0].initializer.properties
  const selectors = {}
  properties.forEach(commandNode => {
    const commandComment = parseSelectorComment(commandNode, sourceFile)
    const selectorsList = []

    for (let i = 1; i < commandComment.length; i += 2) {
      selectorsList.push({
        selector: commandComment[i + 1],
        description: commandComment[i],
      })
    }

    selectors[commandComment[0]] = { selectors: [...selectorsList] }
  })
  return selectors
}

// This script loads all the contributors from the GitHub API
// for the documentation
async function createContributorList(options: BuildCoreExecutorSchema) {
  const filePath = join(options.projectRoot, '../../resources/data/contributors.json')
  let contributors = []
  try {
    const res = await fetch('https://api.github.com/repos/baloise/design-system/contributors')
    const json = await res.json()
    contributors = json
      .filter(c => c.type === 'User')
      .map(u => ({
        url: u.html_url,
        name: u.login,
        avatar: u.avatar_url,
      }))
  } catch (_) {
    //
  }
  await writeFile(filePath, JSON.stringify(contributors, undefined, 2))
}

// This script reads the defined filter functions and creates
// a JSON file with all the meta information for documentation
// and code generations.
async function createTestingDocs(options: BuildCoreExecutorSchema) {
  const pathToTypes = join(options.projectRoot, '../testing/src/commands/**/bal-**.types.ts')
  const typeFilePaths = await scan(pathToTypes)
  const typeFileContents = await Promise.all(typeFilePaths.map(f => readFile(f, 'utf-8')))
  const commands = typeFileContents.map((m, i) => parseTestingType(m, typeFilePaths[i])).flat()
  await writeFile(
    join(options.projectRoot, '../../resources/data/commands.json'),
    JSON.stringify(commands, undefined, 2),
  )
}

function parseTestingType(fileContent, filePath) {
  const sourceFile = createSourceFile(fileContent)
  const moduleDeclarationNode = filterModuleDeclaration(sourceFile.statements)
  const interfaceDeclarationNode = filterInterfaceDeclaration(moduleDeclarationNode.body.statements)
  const commands = []
  interfaceDeclarationNode.members.forEach(commandNode => {
    commands.push({
      name: commandNode.name.escapedText,
      description: parseFunctionComment(commandNode, sourceFile),
      signature: commandNode.getText(sourceFile).replace(commandNode.name.escapedText, ''),
      path: filePath,
      component: filePath.split(sep).pop().replace('.types.ts', ''),
    })
  })
  return commands
}

/********************************************************************************
 * post build task
 ********************************************************************************/

async function adjustGlobalVar(options: BuildCoreExecutorSchema) {
  const files = join(options.projectRoot, 'dist/cjs/app-globals*.js')
  await replace({
    files: files.replace(/\\/g, '/'),
    from: `const global =`,
    to: `const globalImport =`,
  })
  await replace({
    files: files.replace(/\\/g, '/'),
    from: `const globalScripts = global.globalScript;`,
    to: `const globalScripts = globalImport.globalScript;`,
  })
}

// This script creates a list with all the main component tags.
export async function createTagList() {
  const content = await readFile(join('resources/data/components.json'), 'utf-8')
  const json = JSON.parse(content)
  const componentTags = json.components
    .map(component => component.tag)
    .filter(tag => !tag.startsWith('bal-doc'))
    .reduce((acc, newTag) => {
      const hasComponent = acc.some(tag => newTag.startsWith(tag))
      if (!hasComponent && newTag !== 'bal-tab-item' && newTag !== 'bal-notices') {
        acc.push(newTag)
      }
      return acc
    }, [])

  const filePath = join('resources/data/tags.json')
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, JSON.stringify(componentTags, undefined, 2))
}

async function copyToDocs(options: BuildCoreExecutorSchema) {
  await copy(join(options.projectRoot, 'www'), join('e2e/generated/www'))
}

async function cleanUp(options: BuildCoreExecutorSchema) {
  await rm(join(options.projectRoot, 'icons'), { recursive: true, force: true })
  await rm(join(options.projectRoot, 'playwright'), { recursive: true, force: true })
}
