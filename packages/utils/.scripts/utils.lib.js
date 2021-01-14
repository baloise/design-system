const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')

const filters = async () => {
  const filePath = path.join(__dirname, '../docs/filters.json')
  try {
    const content = await file.read(filePath)
    const json = JSON.parse(content)
    log.info(`Read ${json.length} filters`)
    return json
  } catch (error) {
    log.error(`Could not read file '${filePath}'. Maybe run 'npm run utils:build' first.`, error)
    return process.exit(1)
  }
}

module.exports = { filters }
