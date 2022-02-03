const fs = require('fs')
const { pascalCase } = require('change-case')
const libaryLib = require('../../components/.build/components.lib')

async function main() {
  const docsComponents = await libaryLib.components()
  const tags = []
  docsComponents.forEach(c => {
    if (c.tag !== 'bal-app' && !c.tag.startsWith('bal-doc')) {
      tags.push(c.tag)
    }
  })
  const importNames = tags.map(tag => pascalCase(tag))
  const defineComponents = tags.map(tag => `  app.component('${tag}', ${pascalCase(tag)})`)

  const finalText = [
    `import { App } from 'vue'`,
    `import {`,
    ...importNames.map(n => `  ${n},`),
    `} from './proxies/index'`,
    ``,
    `export const applyComponents = (app: App) => {`,
    ...defineComponents,
    `}`,
    ``,
  ]

  fs.writeFileSync('src/components.generated.ts', finalText.join('\n'))
}

main()
