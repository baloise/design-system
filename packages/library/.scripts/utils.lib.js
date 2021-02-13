const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')

const utils = async () => {
  const filePath = path.join(__dirname, '../docs/utils.json')
  try {
    const content = await file.read(filePath)
    const json = JSON.parse(content)
    log.info(`Read ${json.length} utils`)
    return json
  } catch (error) {
    log.error(`Could not read file '${filePath}'. Maybe run 'npm run lib:build' first.`, error)
    return process.exit(1)
  }
}

module.exports = { utils }
