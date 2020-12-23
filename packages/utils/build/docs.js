/**
 * To understand the typescript ast use this tool
 * https://ts-ast-viewer.com/
 */

const ts = require('typescript');
const glob = require('glob');
const fs = require('fs');

const filterDeclarationsAndStatements = (list, kind) => {
    const nodes = []
    list.forEach(statement => {
        if (statement.kind === kind) {
            nodes.push(statement)
        }
    })
    return nodes
}

const filterVariableStatements = (nodes) => {
    return filterDeclarationsAndStatements(nodes, 232)
}

const filterVariableDeclaration = (nodes) => {
    return filterDeclarationsAndStatements(nodes, 249)
}

const parseFunctionComment = (node, sourceFile) => node.getFullText(sourceFile)
    .replace(node.getText(sourceFile), '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .filter(l => l !== '/**' && l !== '*/')
    .map(l => l.startsWith('*') ? l.substring(1) : l)
    .join('\n')

const parseType = (typeCode) => {
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

const parseParameters = (parameter) => {
    return {
        name: parameter.name.escapedText,
        type: parseType(parameter.type.kind),
    }
}

const parseFilters = (filepath) => {
    const fileContent = fs.readFileSync(filepath, 'utf8')
    const sourceFile = ts.createSourceFile('x.ts', fileContent, ts.ScriptTarget.Latest);
    const variableStatement = filterVariableStatements(sourceFile.statements)[0]
    const variableDeclaration = filterVariableDeclaration(variableStatement.declarationList.declarations)[0]
    const name = variableDeclaration.name.escapedText;
    const descripton = parseFunctionComment(variableStatement, sourceFile).trim()
    const arrowFunction = variableDeclaration.initializer
    const parameters = arrowFunction.parameters.map(parseParameters)
    const returnType = arrowFunction.type
    if (returnType === undefined || returnType.kind !== 147) {
        console.error(`${name} should return a string! Just add ":string" type at the arrow function. ${filepath}`)
        return process.exit(1);
    }

    return {
        name,
        descripton,
        returnType: 'string',
        parameters,
    }
}

glob('src/filters/**/!(*.spec|index).ts', (err, filterFilePaths) => {
    if (err) {
        return console.log('Could not find any mixins')
    }
    const filters = filterFilePaths.map(m => parseFilters(m))
    fs.writeFileSync('./src/filters.json', JSON.stringify(filters))
})
