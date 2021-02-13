/**
 * utils - docs-json
 * --------------------------------------
 * This script reads the defined filter functions and creates
 * a JSON file with all the meta information for documentation
 * and code generations.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')
const {
  createSourceFile,
  parseFunctionComment,
  filterVariableStatements,
  filterVariableDeclaration,
  parseType,
} = require('../../../.scripts/typescript')

const parseComment = (node, sourceFile) => {
  const text = parseFunctionComment(node, sourceFile)

  const indexOfDescription = text.indexOf('@description')
  const indexOfExample = text.indexOf('@example')

  const descriptionEnd = indexOfExample === -1 ? text.length : indexOfExample
  const description = text
    .slice(indexOfDescription + 1, descriptionEnd)
    .map(l => l.trim())
    .filter(l => l)
    .join('\n')

  let example = ''
  if (indexOfExample >= 0) {
    example = text
      .slice(indexOfExample + 1, text.length)
      .map(l => l.trim())
      .filter(l => l)
      .join('\n')
  }

  return { description, example }
}

const parseParameters = parameter => {
  return {
    name: parameter.name.escapedText,
    type: parseType(parameter.type),
  }
}

const parseFilters = (filepath, fileContent) => {
  const sourceFile = createSourceFile(fileContent)
  const variableStatement = filterVariableStatements(sourceFile.statements)[0]
  const variableDeclaration = filterVariableDeclaration(variableStatement.declarationList.declarations)[0]
  const name = variableDeclaration.name.escapedText

  if (variableStatement.getText(sourceFile).indexOf('export') !== 0) {
    log.error(`${name} should be exported! Just add "export" in front of the const. ${filepath}`)
    return process.exit(1)
  }

  const comment = parseComment(variableStatement, sourceFile)
  const arrowFunction = variableDeclaration.initializer
  const parameters = arrowFunction.parameters.map(parseParameters)
  let returnType = arrowFunction.type

  if (returnType === undefined || returnType.kind !== 147) {
    log.error(`${name} should return a string! Just add ":string" type at the arrow function. ${filepath}`)
    return process.exit(1)
  }

  const signature = `(${parameters.map(p => `${p.name}: ${p.type}`).join(', ')}) => string`

  return {
    name,
    path: filepath,
    description: comment.description,
    example: comment.example,
    returnType: 'string',
    parameters,
    signature,
  }
}

const run = async () => {
  await log.title('filters : docs-json')

  const pathToFilters = 'src/filters/**/!(*.spec|index).ts'
  let filePaths = []
  let filterContents = []
  let filters = []

  try {
    filePaths = await file.scan(pathToFilters)
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${pathToFilters}`, error)
  }

  try {
    filterContents = await Promise.all(filePaths.map(f => file.read(f)))
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${pathToFilters}`, error)
  }

  filters = filterContents.map((f, i) => parseFilters(filePaths[i], f))

  log.info(`Found ${filters.length} filters:`)
  filters.forEach(f => {
    log.list(`${f.name}`)

    if (f.path.indexOf(f.name) < 0) {
      log.warn(
        `Util should have the same name as the file. Rename the const to ${f.path
          .replace('.ts', '')
          .split('/')
          .slice(-1)}.`,
      )
    }

    if (!f.description) {
      log.warn(`Please add a description to the filter ${f.name}.`)
    }
  })
  await file.makeDir(path.join(__dirname, '../docs'))
  await file.save(path.join(__dirname, '../docs/filters.json'), JSON.stringify(filters))
}

run()
