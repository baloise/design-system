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

const parseParameters = parameter => {
  return {
    name: parameter.name.escapedText,
    type: parseType(parameter.type),
  }
}

const parseUtilFunction = (sourceFile, statement) => {
  const variableDeclaration = filterVariableDeclaration(statement.declarationList.declarations)[0]
  const name = variableDeclaration.name.escapedText
  try {
    const description = parseFunctionComment(statement, sourceFile).map(t => t.trim())
    const arrowFunction = variableDeclaration.initializer
    const parameters = arrowFunction.parameters.map(parseParameters)

    let returnType = 'any'
    try {
      returnType = parseType(arrowFunction.type)
    } catch (_) {
      log.warn(`Add a return type to the util function ${name}!`)
    }

    const signature = `(${parameters.map(p => `${p.name}: ${p.type}`).join(', ')}) => ${returnType}`

    return {
      name,
      description,
      parameters,
      returnType,
      signature
    }
  } catch (error) {
    log.error(`Could not read util ${name}`, error)
  }
}

const parseUtils = (filepath, fileContent) => {
  const name = `${filepath.replace('src/utils/', '').replace('.ts', '')}`;

  const sourceFile = createSourceFile(fileContent)
  const variableStatements = filterVariableStatements(sourceFile.statements).filter(statement => {
    if (statement.modifiers && statement.modifiers.length > 0) {
      return statement.modifiers.filter(m => m.kind === 92).length === 1
    }
    return false;
  })

  const functions = variableStatements.map(statement => parseUtilFunction(sourceFile, statement))

  return {
    name,
    functions,
  }
}

const run = async () => {
  await log.title('utils : docs-json')

  const pathToUtils = 'src/utils/**/!(*.spec|index).ts'
  let filePaths = []
  let utilContents = []

  try {
    filePaths = await file.scan(pathToUtils)
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${pathToUtils}`, error)
  }

  try {
    utilContents = await Promise.all(filePaths.map(f => file.read(f)))
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${pathToUtils}`, error)
  }

  const utils = utilContents.map((f, i) => parseUtils(filePaths[i], f))
  utils.forEach(u => {
    log.info(`Found ${u.name}:`)
    u.functions.forEach(f => {
      log.list(`${f.name}`)
    })
    log.break()
  })
  // log.info(`Found ${util.name}:`)
  // utils.forEach(f => {
  //   log.list(`${f.name}`)

  //   if (!f.description) {
  //     log.warn(`Please add a description to the utils ${f.name}.`)
  //   }
  // })
  await file.makeDir(path.join(__dirname, '../docs'))
  await file.save(path.join(__dirname, '../docs/utils.json'), JSON.stringify(utils))
}

run()
