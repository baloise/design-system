const fs = require('fs')
const path = require('path')
const prompts = require('prompts')

const file = require('../../../../../.build/file')
const log = require('../../../../../.build/log')

const COMPONENT_PATH = path.join(__dirname, '../../../src/components')

const toClassName = tag => toPascalCase(tag.replace('bal-', ''))

const toTag = value => {
  if (value.indexOf('/') > 0) {
    const parts = value.split('/')
    return parts[parts.length - 1]
  }
  return value
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
        { title: 'E2E Test (.e2e.ts)', value: 'test', selected: true },
      ],
    },
  ])

  const tag = toTag(response.component)
  const componentFolder = path.join(COMPONENT_PATH, response.component)
  await file.write(path.join(componentFolder, `${tag}.tsx`), ComponentTemplate(tag))

  if (response.extras.includes('style')) {
    await file.write(path.join(componentFolder, `${tag}.vars.scss`), StyleVarsTemplate(tag))
    await file.write(path.join(componentFolder, `${tag}.scss`), StyleMainTemplate(tag))
  }

  if (response.extras.includes('test')) {
    await file.write(path.join(componentFolder, `test/${tag}.e2e.ts`), TestTemplate(tag))
  }

  if (response.extras.includes('story')) {
    await file.write(path.join(componentFolder, `stories/${tag}.stories.ts`), DocStoryTemplate(response.component))
    await file.write(path.join(componentFolder, `stories/${tag}.docs.mdx`), DocReadmeTemplate(tag))
  }

  log.success(`Created component ${tag}`)
  return
})()

function ComponentTemplate(tag) {
  return `import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: '${tag}',
  shadow: false,
  scoped: false,
})
export class ${toClassName(tag)} implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host>
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
  return `import { newE2EPage } from '@stencil/core/testing';

describe('${tag}', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<${tag}></${tag}>');

    const element = await page.find('${tag}');
    expect(element).toHaveClass('hydrated');
  });
});

`
}

function DocStoryTemplate(filePath) {
  const tag = toTag(filePath)
  const depth = filePath.split('/').reduce(acc => `../${acc}`, '')
  return `import docs from './${tag}.docs.mdx'
  import { BalComponentStory } from '../../${depth}stories/utils'
  import { ${toPascalCase(tag)} } from '../../../${depth}.storybook/vue/components'

  const component = BalComponentStory({
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

function DocReadmeTemplate(tag) {
  return `import { Story, Canvas, Description } from '@storybook/addon-docs'
  import readme from '../readme.md'

  <span id="story--components-${tag.replace('bal-', '')}--basic" style={{ opacity: 0 }}></span>

  # ${toTitle(tag)}

  Todo add some description to the component and its purpose

  <Canvas>
    <Story id="components-${tag.replace('bal-', '')}--basic" />
  </Canvas>

  ## Component Api

  <Description markdown={readme} />

  <br />

  import testing from './testing.md'

  <Description markdown={testing} />

  import github from './github.md'

  <Description markdown={github} />

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
