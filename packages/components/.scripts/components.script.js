/**
 * components script - docs-json
 * --------------------------------------
 * This script adds additional information to the generated
 * component.json to generate a documentation out of it.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')
const { NEWLINE, DOCS_CHILD_REGEX, DOCS_HEADING_REGEX } = require('../../../.scripts/constants')
const libraryLib = require('./components.lib')

const addChildInformation = component => {
  component.parent = null
  component.isChild = false
  component.childComponents = []

  const lines = component.readme.split(NEWLINE)
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

const addExamples = component => {
  component.examples = file.readSync(path.join(__dirname, `../src/components/${component.tag}/index.html`))
  return component
}

const run = async () => {
  await log.title('library : docs-json')
  const json = await libraryLib.components(true)
  const componentsMap = new Map()

  const components = json.components
    .filter(c => !c.tag.includes('bal-icon-'))
    .map(addChildInformation)
    .map(addExamples)
    .map(c => {
      componentsMap.set(c.tag, c)
      return c
    })

  components.forEach(component => {
    log.list(component.tag)

    if (component.isChild) {
      const parent = componentsMap.get(component.parent)
      if (parent === undefined) {
        log.warn(`The child component '${component.tag} has no parent component!'`)
      } else {
        parent.childComponents.push(component.tag)
        componentsMap.set(parent.tag, parent)
      }
    }

    if (!component.isChild && component.examples === null) {
      log.warn(`Please add an index.html file with examples to the component '${component.tag}!'`)
    }
  })

  json.components = Array.from(componentsMap, ([name, value]) => value)

  await file.save(path.join(__dirname, '../docs/components.json'), JSON.stringify(json))
}

run()
