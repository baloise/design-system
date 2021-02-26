const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')
const { createSourceFile, filterFunctionStatements, parseFunctionComment, filterExportedFunctionStatements, parseParameters, parseType } = require('../../../.scripts/typescript')

const read = async ({ fileName }) => {
  const filePath = path.join(__dirname, `../docs/${fileName}.json`)
  try {
    const content = await file.read(filePath)
    return JSON.parse(content)
  } catch (error) {
    log.error(`Could not read file '${filePath}'. Maybe run 'npm run lib:build' first.`, error)
    return process.exit(1)
  }
}

const write = async ({ name, files, multiple, assertedReturnType }) => {
  let filePaths = await readFiles(files)
  let filterContents = await readFileContents(files, filePaths)

  if (filterContents.length === 0) {
    return
  }

  const functionFiles = filterContents.map((f, i) => ({
    filePath: filePaths[i],
    fileName: filePaths[i].split(`/`)[filePaths[i].split(`/`).length - 1].replace('.ts', ''),
    functions: parseUtility({
      filePath: filePaths[i],
      fileContent: f,
      multiple,
      assertedReturnType,
    }),
  }))

  log.info(`Found ${functionFiles.length} ${name}:`)
  functionFiles.forEach(functionFile => {
    functionFile.functions.forEach(fn => {
      log.list(`${fn.name} in ${fn.filePath}`)
    })
  })

  await file.makeDir(path.join(__dirname, '../docs'))
  await file.save(path.join(__dirname, `../docs/${name}.json`), JSON.stringify(functionFiles))
}

function parseFunction({ statement, sourceFile, assertedReturnType, filePath }) {
  const name = statement.name.escapedText
  const type = parseType(statement.type)

  if (type === 'any') {
    log.warn(`Please define a specific return type for your function ${name}`)
  }

  if (assertedReturnType !== undefined && assertedReturnType !== type) {
    log.error(`Return type of the function ${name} must be ${assertedReturnType}`)
    return process.exit(1)
  }

  const parameters = statement.parameters.map(parseParameters)
  const signature = `(${parameters.map(p => `${p.name}: ${p.type}`).join(', ')}) => ${type}`
  const documentation = parseFunctionComment(statement, sourceFile).join('\n')

  if (documentation.length === 0) {
    log.warn(`Please add a documentation description to your function ${name} in ${filePath}`)
  }

  return { name, type, parameters, signature, documentation, filePath }
}

function parseUtility({ filePath, fileContent, multiple, assertedReturnType }) {
  const sourceFile = createSourceFile(fileContent)
  const functionStatements = filterFunctionStatements(sourceFile.statements)
  const exportedFunctionStatements = filterExportedFunctionStatements(functionStatements)

  if (exportedFunctionStatements.length === 0) {
    log.warn(`Could not find any exported function in the ${filePath} file!`)
    return []
  }

  if (multiple === false && exportedFunctionStatements.length > 1) {
    log.warn(`Please only export one function in the ${filePath} file!`)
    return []
  }

  if (multiple === false) {
    let name = exportedFunctionStatements[0].name.escapedText
    if (!filePath.includes(name)) {
      log.warn(`File must have the same name as the exported function ${name}`, filePath)
      return []
    }
  }

  return exportedFunctionStatements.map(statement => parseFunction({ statement, sourceFile, assertedReturnType, filePath }))
}

async function readFiles(files) {
  try {
    return await file.scan(files)
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${files}`, error)
    return []
  }
}

async function readFileContents(files, filePaths) {
  try {
    return await Promise.all(filePaths.map(f => file.read(f)))
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${files}`, error)
    return []
  }
}

module.exports = { read, write }
