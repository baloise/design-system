/**
 * vue - components
 * --------------------------------------
 * Adds the component to the Vue app instance.
 */

const path = require('path')
const camelCase = require('lodash.camelcase')
const upperFirst = require('lodash.upperfirst')
const file = require('../../../.build/file')
const { title } = require('../../../.build/log')
const libaryLib = require('../../components/.build/components.lib')

const run = async () => {
  await title('vue : components')
  const components = await libaryLib.components()
  const componentNames = []
  components.forEach(component => {
    componentNames.push(upperFirst(camelCase(component.tag)))
  })

  const appComponents = componentNames.map(name => `  app.component('${name}', ${name})`)
  const content = [
    '// generated file by .build/components.js',
    '',
    `import { App } from 'vue'`,
    `import {`,
    componentNames.join(',\n'),
    `} from '../components'`,
    '',
    'export const applyComponents = (app: App) => {',
    appComponents.join('\n'),
    '',
    '}',
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/generated/components.ts'), content)
}

run()
