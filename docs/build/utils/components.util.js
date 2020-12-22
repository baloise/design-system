const componentsJson = require("../../www/components.json")
const { readFile } = require("../utils/file.util")
const { NEWLINE, DOCS_CHILD_REGEX, DOCS_HEADING_REGEX } = require("../constants")

const components = new Map()

const addChildInformation = (component) => {
    component.parent = null
    component.isChild = false
    component.childComponents = []

    const lines = component.readme.split(NEWLINE)
        .filter(line => line.match(DOCS_HEADING_REGEX) === null)
    const firstLine = lines[0]
    const parentTag = firstLine.match(DOCS_CHILD_REGEX)

    if (parentTag !== null && parentTag.length > 0) {
        lines.shift()
        const parent = parentTag[0].replace('<!-- docs:child of', '').replace('-->', '').trim()
        component.parent = parent
        component.isChild = true
    }

    while (lines.length > 0 && lines[0] && lines[0].length === 0) {
        lines.shift()
    }
    component.readme = lines.join(NEWLINE)
    return component
}

const addExamples = (component) => {
    component.examples = readFile(`www/components/${component.tag}/index.html`)
    return component
}

const addToMap = (component) => {
    components.set(component.tag, component)
    return component
}

const addChildToParrent = (childComponent) => {
    const parent = components.get(childComponent.parent)
    parent.childComponents.push(childComponent.tag)
    components.set(parent.tag, parent)
}

componentsJson.components
    .map(addChildInformation)
    .map(addExamples)
    .map(addToMap)
    .filter(c => c.isChild)
    .forEach(addChildToParrent)

module.exports = {
    components,
}
