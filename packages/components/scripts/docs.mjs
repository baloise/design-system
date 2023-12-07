import { fileURLToPath } from 'url'
import path from 'path'
import fetch from 'node-fetch'
import {
  exec,
  done,
  logger,
  scan,
  readFile,
  makeDir,
  writeFile,
  createSourceFile,
  filterModuleDeclaration,
  filterInterfaceDeclaration,
  parseFunctionComment,
  filterVariableStatement,
  parseSelectorComment,
} from '../../../.build/utils/index.mjs'
import { adjustInterfacesReference } from './interfaces.mjs'
import { createTagList } from './tags.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')

const run = async () => {
  const log = logger('components docs build')
  log.start()

  try {
    await makeDir(path.join(__dirname, '.tmp'))
    await createTestingDocs()
    await createTestingSelectors()
    await createContributorList()
    await exec('npm', ['run', 'docs:build'])
    await adjustInterfacesReference()
    await createTagList()
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

// This script reads the defined filter functions and creates
// a JSON file with all the meta information for documentation
// and code generations.
async function createTestingDocs() {
  const pathToTypes = path.join(__dirname, '../testing/src/commands/**/bal-**.types.ts')
  const typeFilePaths = await scan(pathToTypes)
  const typeFileContents = await Promise.all(typeFilePaths.map(f => readFile(f)))
  const commands = typeFileContents.map((m, i) => parseTestingType(m, typeFilePaths[i])).flat()
  await writeFile(path.join(__dirname, '.tmp/commands.json'), JSON.stringify(commands, undefined, 2))
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
      component: filePath.split('/').pop().replace('.types.ts', ''),
    })
  })
  return commands
}

// This script reads the defined filter functions and creates
// a JSON file with all the meta information for documentation
// and code generations.
async function createTestingSelectors() {
  const pathToType = path.join(__dirname, '../testing/src/selectors/index.ts')
  const typeFileContent = await readFile(pathToType)
  const selectors = parseTestingSelectorTypes(typeFileContent)
  await writeFile(path.join(__dirname, '.tmp/selectors.json'), JSON.stringify(selectors, undefined, 2))
}

function parseTestingSelectorTypes(fileContent, _filePath) {
  const sourceFile = createSourceFile(fileContent)
  const variableStatementsNode = filterVariableStatement(sourceFile.statements)
  const properties = variableStatementsNode[0].declarationList.declarations[0].initializer.properties
  const selectors = {}
  properties.forEach(commandNode => {
    const commandComment = parseSelectorComment(commandNode, sourceFile)
    let selectorsList = []

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
async function createContributorList() {
  const filePath = path.join(__dirname, '.tmp/contributors.json')
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

run()
