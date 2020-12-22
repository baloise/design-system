/**
 * To understand the typescript ast use this tool
 * https://ts-ast-viewer.com/
 */

const ts = require('typescript');
const glob = require('glob');
const fs = require('fs');

const filterDeclarationsAndStatements = (sourceFile, kind) => {
    const nodes = []
    sourceFile.forEachChild(child => {
        if (child.kind === kind) {
            nodes.push(child)
        }
    })
    return nodes
}

const filterVariableStatements = (sourceFile) => {
    return filterDeclarationsAndStatements(sourceFile, 229)
}

const filterInterfaceDeclaration = (sourceFile) => {
    return filterDeclarationsAndStatements(sourceFile, 250)
}

const filterMixinNodes = (nodes) => {
    return nodes.filter(n => n.declarationList.declarations[0].name.escapedText.endsWith('Mixin'))
}

const filterAccessorNode = (nodes) => {
    return nodes.filter(n => n.declarationList.declarations[0].name.escapedText.endsWith('Accessor'))[0]
}

const getName = (node) => node.declarationList.declarations[0].name.escapedText

const parseMethodComment = (node, sourceFile) => node.getFullText(sourceFile)
    .replace(node.getText(sourceFile), '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .filter(l => l !== '/**' && l !== '*/')
    .map(l => l.startsWith('*') ? l.substring(1) : l)
    .join('\n')

const parseAccessor = (filepath, mixins) => {
    const fileContent = fs.readFileSync(filepath, 'utf8')
    const sourceFile = ts.createSourceFile('x.ts', fileContent, ts.ScriptTarget.Latest)
    const variableStatementsNodes = filterVariableStatements(sourceFile)
    const accessorNode = filterAccessorNode(variableStatementsNodes)
    const accessorDescription = parseMethodComment(accessorNode, sourceFile)
    const accessorName = getName(accessorNode)
    const accessor = { name: accessorName, description: accessorDescription, methods: [] }
    const mixinOverrideNodes = filterMixinNodes(variableStatementsNodes)
    mixinOverrideNodes.forEach(mixinOverrideNode => {
        const methodNodes = mixinOverrideNode.declarationList.declarations[0].initializer.body.expression.properties
        methodNodes.forEach(methodNode => {
            const methodName = methodNode.name.escapedText
            const methodComment = parseMethodComment(methodNode, sourceFile)
            const methodSignature = methodNode.initializer.parameters
                .map(p => p.getFullText(sourceFile))
                .filter(p => p)
                .map(p => p.trim())
            accessor.methods.push({ name: methodName, description: methodComment, signature: methodSignature.join(', ') })
        })
    })

    const mixinOverrides = mixinOverrideNodes.map(m => m.declarationList.declarations[0].name.escapedText)
    const accessorNodeDeclaration = accessorNode.declarationList.declarations[0]
    const mixinsUsed = accessorNodeDeclaration.initializer.arguments
        .map(a => a.escapedText)
        .filter(m => mixinOverrides.indexOf(m) === -1)

    mixinsUsed.forEach(mixinUsed => {
        mixins.filter(m => mixinUsed.startsWith(m.name))
            .forEach(m => {
                m.methods.forEach(method => accessor.methods.push(method))
            })
    })

    return accessor
}

const parseMixin = (filepath) => {
    const fileContent = fs.readFileSync(filepath, 'utf8')
    const sourceFile = ts.createSourceFile('x.ts', fileContent, ts.ScriptTarget.Latest);
    const interfaceDeclarationNode = filterInterfaceDeclaration(sourceFile)[0]
    const mixinName = interfaceDeclarationNode.name.escapedText
    const mixinMethods = []
    interfaceDeclarationNode.members.forEach(methodNode => {
        const methodName = methodNode.name.escapedText
        const methodComment = parseMethodComment(methodNode, sourceFile)
        const methodSignature = methodNode.parameters
            .map(p => p.getFullText(sourceFile))
            .filter(p => p)
            .map(p => p.trim())
            .join(', ')
        mixinMethods.push({
            name: methodName,
            description: methodComment,
            signature: methodSignature,
        })
    })

    return {
        name: mixinName,
        methods: mixinMethods,
    }
}

glob('src/mixins/**.ts', (err, mixinFilepaths) => {
    if (err) {
        return console.log('Could not find any mixins')
    }
    mixinFilepaths = mixinFilepaths
        .filter(path => path.indexOf('index.ts') === -1)
        .filter(path => path.indexOf('mixins.ts') === -1)

    const mixins = mixinFilepaths.map(m => parseMixin(m))

    glob('src/accessors/**.accessor.ts', (err, accessorFilepaths) => {
        if (err) {
            return console.log('Could not find any accessors')
        }

        const accessors = accessorFilepaths.map(a => parseAccessor(a, mixins))
        fs.writeFileSync('../../docs/www/accessors.json', JSON.stringify(accessors))
    })
})

