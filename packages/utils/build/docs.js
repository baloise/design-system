/**
 * To understand the typescript ast use this tool
 * https://ts-ast-viewer.com/
 */

const ts = require('typescript')
const glob = require('glob')
const fs = require('fs')

const filterDeclarationsAndStatements = (list, kind) => {
  const nodes = []
  list.forEach(statement => {
    if (statement.kind === kind) {
      nodes.push(statement)
    }
  })
  return nodes
}

const filterVariableStatements = nodes => {
  return filterDeclarationsAndStatements(nodes, 232)[0]
}

const filterTypeAliasStatements = nodes => {
  return filterDeclarationsAndStatements(nodes, 254)[0]
}

const filterVariableDeclaration = nodes => {
  return filterDeclarationsAndStatements(nodes, 249)
}

const parseFunctionComment = (node, sourceFile) =>
  node
    .getFullText(sourceFile)
    .replace(node.getText(sourceFile), '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .filter(l => l !== '/**' && l !== '*/')
    .map(l => (l.startsWith('*') ? l.substring(1) : l))
    .map(l => l.trim())
    .join('\n')

const parseType = typeCode => {
  switch (typeCode) {
    case 131:
      return 'boolean'
    case 144:
      return 'number'
    case 147:
      return 'string'
    case 178:
      return `${parseType(typeCode.elementType)}[]`
    default:
      return 'any'
  }
}

const parseParameters = parameter => {
  return {
    name: parameter.name.escapedText,
    type: parseType(parameter.type.kind),
  }
}

const parseFilters = filepath => {
  const fileContent = fs.readFileSync(filepath, 'utf8')
  const sourceFile = ts.createSourceFile('x.ts', fileContent, ts.ScriptTarget.Latest)
  const variableStatement = filterVariableStatements(sourceFile.statements)
  const variableDeclaration = filterVariableDeclaration(variableStatement.declarationList.declarations)[0]
  const name = variableDeclaration.name.escapedText
  const descripton = parseFunctionComment(variableStatement, sourceFile).trim()
  const arrowFunction = variableDeclaration.initializer
  const parameters = arrowFunction.parameters.map(parseParameters)
  let returnType = arrowFunction.type

  if (returnType === undefined || returnType.kind !== 147) {
    console.error(`${name} should return a string! Just add ":string" type at the arrow function. ${filepath}`)
    return process.exit(1)
  }

  const signature = `(${parameters.map(p => `${p.name}: ${p.type}`).join(', ')}) => string`

  return {
    name,
    descripton,
    returnType: 'string',
    parameters,
    signature,
  }
}

glob('src/filters/**/!(*.spec|index).ts', (err, filterFilePaths) => {
  if (err) {
    return console.log('Could not find any mixins')
  }
  const filters = filterFilePaths.map(m => parseFilters(m))
  fs.writeFileSync('./src/filters.json', JSON.stringify(filters))

  const utilExports = filters.map(f => `export { ${f.name} } from './filters/${f.name}'`)
  const utilStaticTypes = filters.map(f => `  ${f.name}: ${f.signature}`)

  const content = [
    utilExports.join('\n'),
    '',
    'export interface BalUtilsStatic {',
    utilStaticTypes.join('\n'),
    '}',
    '',
  ].join('\n')

  fs.writeFileSync('./src/index.ts', content)
})
