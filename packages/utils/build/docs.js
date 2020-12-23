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
    return filterDeclarationsAndStatements(nodes, 232)[0]
}

const filterTypeAliasStatements = (nodes) => {
    return filterDeclarationsAndStatements(nodes, 254)[0]
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

const parseType = (typeAlias, typeCode) => {
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

const parseTypeAlias = (typeAlias, parameterName) => {
    const functionType = typeAlias.type
    const parameters = functionType.parameters
    const parameter = parameters.filter(p => p.name.escapedText === parameterName)[0]
    return parseType(typeAlias, parameter.type.kind)
}

const parseParameters = (typeAlias) => (parameter) => {
    return {
        name: parameter.name.escapedText,
        type: (parameter.type)
            ? parseType(typeAlias, parameter.type.kind)
            : parseTypeAlias(typeAlias, parameter.name.escapedText),
    }
}

const parseFilters = (filepath) => {
    const fileContent = fs.readFileSync(filepath, 'utf8')
    const sourceFile = ts.createSourceFile('x.ts', fileContent, ts.ScriptTarget.Latest);
    const typeAlias = filterTypeAliasStatements(sourceFile.statements)
    const variableStatement = filterVariableStatements(sourceFile.statements)
    const variableDeclaration = filterVariableDeclaration(variableStatement.declarationList.declarations)[0]
    const name = variableDeclaration.name.escapedText;
    const descripton = parseFunctionComment(variableStatement, sourceFile).trim()
    const arrowFunction = variableDeclaration.initializer
    const parameters = arrowFunction.parameters.map(parseParameters(typeAlias))
    const type = typeAlias.name.escapedText
    let returnType = arrowFunction.type
    if (returnType === undefined && typeAlias) {
        returnType = typeAlias.type.type
    }

    if (returnType.kind !== 147) {
        console.error(`${name} should return a string! Just add ":string" type at the arrow function. ${filepath}`)
        return process.exit(1);
    }

    return {
        name,
        type,
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

    const utilExports = filters.map(f => `export { ${f.name} } from './filters/${f.name}'`)
    const utilImports = filters.map(f => `import { ${f.type} } from './filters/${f.name}'`)
    const utilStaticTypes = filters.map(f => `  ${f.name}: ${f.type}`)

    const content = utilExports.join('\n') +
        '\n' +
        '\n' +
        utilImports.join('\n') +
        '\n' +
        '\n' +
        'export interface BalUtilsStatic {' +
        '\n' +
        utilStaticTypes.join('\n') +
        '\n' +
        '}' +
        '\n'

    fs.writeFileSync('./src/index.ts', content)
})
