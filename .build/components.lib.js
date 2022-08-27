const path = require('path')
const file = require('./file')
const log = require('./log')

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/components");

const components = async () => {
  const filePath = path.join(PACKAGE, 'src/stories/assets/data/components.json')
  try {
    const content = await file.read(filePath)
    const json = JSON.parse(content)
    log.info(`Read ${json.components.length} components`)
    const componentsMap = new Map()
    json.components.forEach(c => {
      if (!c.tag.includes('bal-icon-')) {
        componentsMap.set(c.tag, c)
      }
    })
    return componentsMap
  } catch (error) {
    log.error(`Could not read file '${filePath}'. Maybe run 'npm run build' first.`, error)
    return process.exit(1)
  }
}

module.exports = { components }
