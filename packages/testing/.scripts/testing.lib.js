const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')

const commands = async () => {
  const filePath = path.join(__dirname, '../docs/commands.json')
  try {
    const content = await file.read(filePath)
    const json = JSON.parse(content)
    log.info(`Read ${json.length} commands`)
    const commandsMap = new Map()
    json.forEach(command => {
      let componentCommands = []
      if (commandsMap.has(command.component)) {
        componentCommands = commandsMap.get(command.component)
      }
      commandsMap.set(command.component, [...componentCommands, command])
    })
    return commandsMap
  } catch (error) {
    log.error(`Could not read file '${filePath}'. Maybe run 'npm run testing:build' first.`, error)
    return process.exit(1)
  }
}

module.exports = { commands }
