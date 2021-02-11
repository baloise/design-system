/**
 * To understand the typescript ast use this tool
 * https://ts-ast-viewer.com/
 */

const ts = require('typescript')

const createSourceFile = fileContent => ts.createSourceFile('x.ts', fileContent, ts.ScriptTarget.Latest)

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
  return filterDeclarationsAndStatements(nodes, 232)
}

const filterVariableDeclaration = nodes => {
  return filterDeclarationsAndStatements(nodes, 249)
}

const filterInterfaceDeclaration = nodes => {
  return filterDeclarationsAndStatements(nodes, 253)[0]
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

const parseType = typeCode => {
  switch (typeCode) {
    case 131:
      return 'boolean'
    case 144:
      return 'number'
    case 147:
      return 'string'
    case 173:
      return 'Blob'
    case 182:
      return 'undefined'
    case 178:
      return `${parseType(typeCode.elementType)}[]`
    default:
      return 'any'
  }
}

module.exports = {
  createSourceFile,
  filterDeclarationsAndStatements,
  filterVariableStatements,
  filterVariableDeclaration,
  filterInterfaceDeclaration,
  parseFunctionComment,
  parseType,
}
