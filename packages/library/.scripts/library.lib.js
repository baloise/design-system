const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')

const components = async (isRaw = false) => {
  const filePath = path.join(__dirname, isRaw ? '../docs/components.raw.json' : '../docs/components.json')
  try {
    const content = await file.read(filePath)
    const json = JSON.parse(content)
    log.info(`Read ${json.components.length} components`)
    if (isRaw) {
      return json
    }
    const componentsMap = new Map()
    json.components.forEach(c => componentsMap.set(c.tag, c))
    return componentsMap
  } catch (error) {
    log.error(`Could not read file '${filePath}'. Maybe run 'npm run lib:docs' first.`, error)
    return process.exit(1)
  }
}

module.exports = { components }
