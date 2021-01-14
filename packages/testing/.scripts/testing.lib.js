const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')

const accessors = async () => {
  const filePath = path.join(__dirname, '../docs/accessors.json')
  try {
    const content = await file.read(filePath)
    const json = JSON.parse(content)
    log.info(`Read ${json.length} accessors`)
    const accessorsMap = new Map()
    json.forEach(accessor => {
      const tag = accessor.name.replace('Accessor', '').replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
      accessorsMap.set(`bal${tag}`, accessor)
    })
    return accessorsMap
  } catch (error) {
    log.error(`Could not read file '${filePath}'. Maybe run 'npm run testing:build' first.`, error)
    return process.exit(1)
  }
}

const mixins = async () => {
  const filePath = path.join(__dirname, '../docs/mixins.json')
  try {
    const content = await file.read(filePath)
    const json = JSON.parse(content)
    log.info(`Read ${json.length} mixins`)
    return json
  } catch (error) {
    log.error(`Could not read file '${filePath}'. Maybe run 'npm run testing:build' first.`, error)
    return process.exit(1)
  }
}

module.exports = { accessors, mixins }
