const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const libraryLib = require('../../packages/library/.scripts/library.lib')
const path = require('path')
const { NEWLINE, SIDEBAR_SEPERATOR_START, SIDEBAR_SEPERATOR_END } = require('./utils/constants')

const getSidebarStart = content => content.split(SIDEBAR_SEPERATOR_START)[0] + SIDEBAR_SEPERATOR_START

const getSidebarEnd = content => NEWLINE + SIDEBAR_SEPERATOR_END + content.split(SIDEBAR_SEPERATOR_END)[1]

const run = async () => {
  log.title('docs : sidebar')

  let sidebarContent = ''
  const filePath = path.join(__dirname, '../_sidebar.template.md')
  try {
    sidebarContent = await file.read(filePath)
  } catch (error) {
    log.error(`Could not read file '${filePath}'.`, error)
    return process.exit(1)
  }

  const components = await libraryLib.components()

  const content = [getSidebarStart(sidebarContent)]
  content.push(NEWLINE + '- **Components**' + NEWLINE)
  components.forEach(component => {
    if (component.tag.indexOf('bal-icon-') === -1) {
      if (component.parent === null) {
        content.push(`  - [${component.tag}](components/${component.tag}/readme)`)
      }
    }
  })
  content.push(getSidebarEnd(sidebarContent))

  await file.save(path.join(__dirname, '../_sidebar.md'), content.join(NEWLINE))
}

run()
