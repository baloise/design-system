const { banner, printSuccess } = require('./utils/log.util')
const { readFile, writeFile } = require('./utils/file.util')
const { components } = require('./utils/components.util')
const { SIDEBAR_TEMPLATE_FILEPATH, NEWLINE, SIDEBAR_FILEPATH, SIDEBAR_SEPERATOR_START, SIDEBAR_SEPERATOR_END } = require('./constants')

const getSidebarStart = (content) => content.split(SIDEBAR_SEPERATOR_START)[0] + SIDEBAR_SEPERATOR_START

const getSidebarEnd = (content) => NEWLINE + SIDEBAR_SEPERATOR_END + content.split(SIDEBAR_SEPERATOR_END)[1]

banner('Starting generating the sidebar')

const sidebarContent = readFile(SIDEBAR_TEMPLATE_FILEPATH)
const newContent = [getSidebarStart(sidebarContent)]
newContent.push(NEWLINE + '- **Components**' + NEWLINE)
components.forEach(component => {
    if (component.parent === null) {
        newContent.push(`  - [${component.tag}](www/components/${component.tag}/readme)`)
    }
})
newContent.push(getSidebarEnd(sidebarContent))
const err = writeFile(SIDEBAR_FILEPATH, newContent.join(NEWLINE))
if (err === null) {
    printSuccess(SIDEBAR_FILEPATH)
}

