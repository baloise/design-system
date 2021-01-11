/**
 * utils - docs-json
 * --------------------------------------
 * This script reads the defined filter functions and creates
 * a JSON file with all the meta information for documentation
 * and code generations.
 */

const file = require('../../../.scripts/common/file')
const { banner, log } = require('../../../.scripts/common/log')
const {
  createSourceFile,
  parseFunctionComment,
  filterVariableStatements,
  filterInterfaceDeclaration,
} = require('../../../.scripts/common/typescript')

const filterAccessorNode = nodes => {
  return nodes.filter(n => n.declarationList.declarations[0].name.escapedText.endsWith('Accessor'))[0]
}

const filterMixinNodes = nodes => {
  return nodes.filter(n => n.declarationList.declarations[0].name.escapedText.endsWith('Mixin'))
}

const getName = node => node.declarationList.declarations[0].name.escapedText

const parseMixin = fileContent => {
  const sourceFile = createSourceFile(fileContent)
  const interfaceDeclarationNode = filterInterfaceDeclaration(sourceFile.statements)
  const mixinName = interfaceDeclarationNode.name.escapedText
  const mixinMethods = []
  interfaceDeclarationNode.members.forEach(methodNode => {
    const methodName = methodNode.name.escapedText
    const methodComment = parseFunctionComment(methodNode, sourceFile)

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

const parseAccessor = (fileContent, mixins) => {
  const sourceFile = createSourceFile(fileContent)
  const variableStatementsNodes = filterVariableStatements(sourceFile.statements)
  const accessorNode = filterAccessorNode(variableStatementsNodes)
  const accessorDescription = parseFunctionComment(accessorNode, sourceFile)
  const accessorName = getName(accessorNode)
  const accessor = { name: accessorName, description: accessorDescription, methods: [] }

  const mixinOverrideNodes = filterMixinNodes(variableStatementsNodes)
  mixinOverrideNodes.forEach(mixinOverrideNode => {
    const methodNodes = mixinOverrideNode.declarationList.declarations[0].initializer.body.expression.properties
    methodNodes.forEach(methodNode => {
      const methodName = methodNode.name.escapedText
      const methodComment = parseFunctionComment(methodNode, sourceFile)
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
    mixins
      .filter(m => mixinUsed.startsWith(m.name))
      .forEach(m => {
        m.methods.forEach(method => accessor.methods.push(method))
      })
  })

  return accessor
}

const run = async () => {
  await banner('testing : docs-json')

  const pathToMixins = 'src/mixins/**.ts'
  let mixinFilePaths = []
  let mixinFileContents = []
  let mixins = []

  try {
    mixinFilePaths = await file.scan(pathToMixins)
    mixinFilePaths = mixinFilePaths
      .filter(path => path.indexOf('index.ts') === -1)
      .filter(path => path.indexOf('mixins.ts') === -1)
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${pathToFilters}`, error)
  }

  try {
    mixinFileContents = await Promise.all(mixinFilePaths.map(f => file.read(f)))
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${pathToFilters}`, error)
  }

  mixins = mixinFileContents.map(m => parseMixin(m))

  log.info(`Found ${mixins.length} mixins:`)
  mixins.forEach((m, i) => {
    log.list(`${m.name}`)

    if (mixinFilePaths[i].toLowerCase().indexOf(m.name.toLowerCase()) < 0) {
      log.warn(
        `Util should have the same name as the file. Rename the const to ${m.path
          .replace('.ts', '')
          .split('/')
          .slice(-1)}.`,
      )
    }

    m.methods.forEach(f => {
      if (f.description.length === 0) {
        log.warn(`Please add a description to the mixin method ${f.name}.`)
      }
    })
  })

  const pathToAccessors = 'src/accessors/**.accessor.ts'
  let accessors = []
  let accessorFilePaths = []
  let accessorFileContents = []

  try {
    accessorFilePaths = await file.scan(pathToAccessors)
  } catch (error) {
    log.error(`Could not find any accessors unter ${pathToAccessors}`, error)
  }

  try {
    accessorFileContents = await Promise.all(accessorFilePaths.map(f => file.read(f)))
  } catch (error) {
    log.error(`Could not read accessor`, error)
  }

  accessors = accessorFileContents.map(a => parseAccessor(a, mixins))

  log.break().info(`Found ${accessors.length} accessors:`)
  accessors.forEach((a, i) => {
    log.list(`${a.name}`)

    if (a.description.length === 0) {
      log.warn(`Please add a description to the accessor ${a.name}.`)
    }

    a.methods.forEach(m => {
      if (m.description.length === 0) {
        log.warn(`Please add a description to the accessor method ${m.name}.`)
      }
    })
  })

  const pathToMixinsJson = './src/mixins.json'
  try {
    await file.write(pathToMixinsJson, JSON.stringify(mixins))
    log.break().success(`Successfully updated file to ${pathToMixinsJson}`)
  } catch (error) {
    log.error(`Could not update file ${pathToJson}`, error)
  }

  const pathToAccessorsJson = './src/accessors.json'
  try {
    await file.write(pathToAccessorsJson, JSON.stringify(accessors))
    log.success(`Successfully updated file to ${pathToAccessorsJson}`)
  } catch (error) {
    log.error(`Could not update file ${pathToJson}`, error)
  }
}

run()
