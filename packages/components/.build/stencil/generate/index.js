const fs = require('fs')
const path = require('path')
const prompts = require('prompts')

const file = require('../../../../../.build/file')
const log = require('../../../../../.build/log')

const COMPONENT_PATH = path.join(__dirname, '../../../src/components')
const CYPRESS_PATH = path.join(__dirname, '../../../cypress/integration')

const toClassName = tag => toPascalCase(tag.replace('bal-', ''))

const toTag = value => {
  if (value.indexOf('/') > 0) {
    const parts = value.split('/')
    return parts[parts.length - 1]
  }
  return value
}

const toStoryTitle = value => {
  const tag = toTag(value)
  const componentPath = value.replace(COMPONENT_PATH, '')
    .split('/')
    .filter(v => !v.startsWith(tag))
    .map(v => toTitle(v))
    .join('/')
  return `${componentPath}${componentPath.length ? '/': ''}${toTitle(tag.replace('bal-', ''))}`
}

const toStoryId = value => {
  const tag = toTag(value)
  const componentName = tag.replace('bal-', '')
  const componentPath = value.replace(COMPONENT_PATH, '')
    .split('/')
    .filter(v => !v.startsWith(tag))
    .join('/')
  return `${componentPath}${componentPath.length ? '-': ''}${componentName}`
}

;(async () => {
  log.title(`Component Generator`)

  const response = await prompts([
    {
      type: 'text',
      name: 'component',
      message: 'Component tag name (dash-case)',
      validate: value => {
        if (value) {
          const tag = toTag(value)

          // verify that the component is unique
          const fileExists = fs.existsSync(path.join(COMPONENT_PATH, value, `${tag}.tsx`))
          if (fileExists) {
            return 'Component already exists'
          }

          // validate the tag name that is starts with bal-
          return tag.startsWith('bal-') ? true : 'The component tag should start with bal-'
        }

        return 'Enter a component tag name like bal-button'
      },
    },
    {
      type: 'multiselect',
      name: 'extras',
      message: 'Which additional files do you want to generate',
      choices: [
        { title: 'Storybook (/stories)', value: 'story', selected: true },
        { title: 'Stylesheet (.scss)', value: 'style', selected: true },
        { title: 'E2E Test (/test)', value: 'test', selected: true },
        { title: 'Unit Test (/test)', value: 'unit', selected: false },
      ],
    },
  ])

  if(!response.component) {
    return
  }

  const tag = toTag(response.component)
  const componentFolder = path.join(COMPONENT_PATH, response.component)
  await file.write(path.join(componentFolder, `${tag}.tsx`), ComponentTemplate(tag))
  await file.write(path.join(componentFolder, `readme.md`), `# ${tag}
`)

  if (response.extras.includes('style')) {
    await file.write(path.join(componentFolder, `${tag}.vars.scss`), StyleVarsTemplate(tag))
    await file.write(path.join(componentFolder, `${tag}.scss`), StyleMainTemplate(tag))
  }

  if (response.extras.includes('test')) {
    await file.write(path.join(componentFolder, `test/${tag}.cy.html`), TestTemplate(tag))
    await file.write(path.join(componentFolder, `test/${tag}.visual.html`), TestTemplate(tag))
    await file.write(path.join(CYPRESS_PATH, `${tag.replace('bal-', '')}.spec.ts`), TestScriptTemplate(tag))
  }

  if (response.extras.includes('unit')) {
    await file.write(path.join(componentFolder, `test/${tag}.spec.ts`), TestUnitTemplate(tag))
  }

  if (response.extras.includes('story')) {
    await file.write(path.join(componentFolder, `stories/${tag}.stories.ts`), DocStoryTemplate(response.component))
    await file.write(path.join(componentFolder, `stories/${tag}.docs.mdx`), DocReadmeTemplate(response.component))
    await file.write(path.join(componentFolder, `stories/testing.md`), '')
  }

  log.success(`Created component ${tag}`)
  return
})()

function ComponentTemplate(tag) {
  return `import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: '${tag}',
})
export class ${toClassName(tag)} implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host>
        <p>Hello World</p>
        <slot></slot>
      </Host>
    )
  }
}
`
}

function StyleVarsTemplate(tag) {
  return `// define variables for your component here with !default.

// $${tag.replace('bal-', '')}-color: $text !default;

`
}

function StyleMainTemplate(tag) {
  return `@import './${tag}.vars.scss';

// TODO: import this stylesheet in src/styles/components/_all.scss

${tag} {
  position: static;
  display: block;
}
`
}

function TestTemplate(tag) {
  return `<!DOCTYPE html>
  <html dir="ltr" lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <script type="module" src="/build/design-system-components.esm.js"></script>
      <script nomodule src="/build/design-system-components.js"></script>
    </head>
    <body>
      <bal-doc-app>
        <main class="container py-5">
          <${tag} data-testid="${tag.replace('bal-', '')}"></${tag}>
        </main>
      </bal-doc-app>
    </body>
  </html>

`
}

function TestScriptTemplate(tag) {
  return `import { byTestId } from '../../../testing/src'

describe('${toClassName(tag)}', () => {
  const basic = byTestId('${tag.replace('bal-', '')}')

  before(() => cy.visitPage('/components/${tag}/test/${tag}.cy.html'))

  it('should have content', () => {
    cy.get(basic).contains('Hello World')
  })
})
`
}

function TestUnitTemplate(tag) {
  return `describe('${toClassName(tag)}', () => {
  it('should be true', () => {
    expect(true)
  })
})
`
}

function DocStoryTemplate(filePath) {
  const tag = toTag(filePath)
  const depth = filePath.split('/').reduce(acc => `../${acc}`, '')
  return `import docs from './${tag}.docs.mdx'
import { BalComponentStory } from '../../${depth}stories/utils'
import { ${toPascalCase(tag)} } from '../../../${depth}.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/${toStoryTitle(filePath)}',
  component: ${toPascalCase(tag)},
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: \`<${tag} v-bind="args"></${tag}>\`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
`
}

function DocReadmeTemplate(filePath) {
  const tag = toTag(filePath)
  const storyId = toStoryId(filePath)

  return `import { Story, Canvas, Description } from '@storybook/addon-docs'
import readme from '../readme.md'

<bal-doc-banner id="story--components-${storyId}--basic">${toTitle(tag.replace('bal-', ''))}</bal-doc-banner>

<bal-doc-tabs>
  <a href="#story--components-accordion--basic">Overview</a>
  {/* <a href="#examples">Examples</a> */}
  <a href="#component-api">API</a>
  {/* <a href="#usage">Usage</a> */}
  <a href="#integration">Integration</a>
  <a href="#testing">Testing</a>
</bal-doc-tabs>

<bal-doc-lead>
Todo add some description to the component and its purpose
</bal-doc-lead>

<Canvas withSource="open">
  <Story id="components-${storyId}--basic" />
</Canvas>

<bal-doc-app>
  <bal-button-group class="mb-6" position="center">
    <a class="button is-primary" href="?path=/story/components-${storyId}--basic">
      Go to playground (Canvas)
    </a>
  </bal-button-group>
</bal-doc-app>

## Component Api

<Description markdown={readme} />

<br />

## Integration

This documentation explains how to implement and use Baloise Design System components across different technologies.

<bal-doc-link-list>
  <a href="?path=/docs/getting-started-html5-overview--page">
    <bal-doc-link-list-item template="html5"></bal-doc-link-list-item>
  </a>
  <a href="?path=/docs/getting-started-vue-overview--page">
    <bal-doc-link-list-item template="vue"></bal-doc-link-list-item>
  </a>
  <a href="?path=/docs/getting-started-angular-overview--page">
    <bal-doc-link-list-item template="angular"></bal-doc-link-list-item>
  </a>
  <a href="?path=/docs/getting-started-react-overview--page">
    <bal-doc-link-list-item template="react"></bal-doc-link-list-item>
  </a>
</bal-doc-link-list>

import testing from './testing.md'

<Description markdown={testing} />
`
}

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper)
}

function clearAndUpper(text) {
  return text.replace(/-/, '').toUpperCase()
}

function toTitle(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpperWithSpace)
}

function clearAndUpperWithSpace(text) {
  return text.replace(/-/, ' ').toUpperCase()
}
