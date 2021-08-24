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

const filterFunctionStatements = nodes => {
  return filterDeclarationsAndStatements(nodes, 252)
}

const filterVariableStatements = nodes => {
  return filterDeclarationsAndStatements(nodes, 233)
}

const filterVariableDeclaration = nodes => {
  return filterDeclarationsAndStatements(nodes, 249)
}

const filterInterfaceDeclaration = nodes => {
  return filterInterfaceDeclarations(nodes)[0]
}

const filterInterfaceDeclarations = nodes => {
  return filterDeclarationsAndStatements(nodes, 254)
}

const filterExportedStatements = nodes => {
  return nodes.filter(statement => {
    if (statement.modifiers && statement.modifiers.length > 0) {
      return statement.modifiers.filter(m => m.kind === 92).length === 1
    }
    return false
  })
}

const parseParameters = parameter => {
  return {
    name: parameter.name.escapedText,
    type: parseType(parameter.type),
  }
}

const parseFunctionComment = (node, sourceFile) =>
  node
    .getFullText(sourceFile)
    .replace(node.getText(sourceFile), '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .filter(l => l !== '/**' && l !== '*/')
    .map(l => (l.startsWith('*') ? l.substring(2) : l))

const parseType = type => {
  if (type === undefined) {
    return 'any'
  }
  if (type.typeName) {
    return type.typeName.escapedText
  }

  switch (type.kind) {
    case 150:
      return 'undefined'
    case 103:
    case 191:
      return 'null'
    case 131:
      return 'boolean'
    case 144:
      return 'number'
    case 147:
      return 'string'
    case 173:
      return 'Blob'
    case 160:
      return 'RegExp'
    case 178:
      return `${parseType(type.elementType)}[]`
    case 183: // UnionType like string | number
      return type.types.map(parseType).join(' | ')
    default:
      return 'any'
  }
}

module.exports = {
  createSourceFile,
  filterDeclarationsAndStatements,
  filterVariableStatements,
  filterVariableDeclaration,
  filterFunctionStatements,
  filterExportedStatements,
  filterInterfaceDeclaration,
  filterInterfaceDeclarations,
  parseFunctionComment,
  parseType,
  parseParameters,
}
