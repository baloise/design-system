import { Config } from '@stencil/core'
import {} from '@stencil/core/compiler'
import { JsonDocs } from '@stencil/core/internal'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'
import { ComponentModelConfig, vueOutputTarget } from '@baloise/vue-output-target'
import { writeFileSync } from 'fs'
import { propsToMarkdown } from './.scripts/readme/markdown-props'
import { eventsToMarkdown } from './.scripts/readme/markdown-events'
import { methodsToMarkdown } from './.scripts/readme/markdown-methods'
import { slotsToMarkdown } from './.scripts/readme/markdown-slots'

const NEWLINE = '\n'

const vueComponentModels: ComponentModelConfig[] = [
  {
    elements: ['bal-radio-group', 'bal-datepicker', 'bal-timeinput', 'bal-select'],
    event: 'balChange',
    targetAttr: 'value',
  },
  {
    elements: ['bal-checkbox'],
    event: 'balChange',
    targetAttr: 'checked',
  },
  {
    elements: ['bal-input', 'bal-textarea', 'bal-slider'],
    event: 'balInput',
    targetAttr: 'value',
  },
  {
    elements: ['bal-accordion', 'bal-dropdown'],
    event: 'balCollapsed',
    targetAttr: 'is-active',
  },
]

export const config: Config = {
  namespace: 'design-system-components',
  globalStyle: 'src/styles/global.scss',
  globalScript: 'src/global.ts',
  enableCache: true,
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-json',
      file: 'src/stories/assets/components.json',
    },
    {
      type: 'www',
      dir: 'public',
      empty: true,
      copy: [{ src: 'assets/fonts', warn: true }],
    },
    {
      type: 'docs-custom',
      generator: (docs: JsonDocs) => {
        for (let index = 0; index < docs.components.length; index++) {
          const component = docs.components[index]
          const content = [
            `### ${component.tag}`,
            NEWLINE,
            ...propsToMarkdown(component.props),
            ...eventsToMarkdown(component.events),
            ...methodsToMarkdown(component.methods),
            ...slotsToMarkdown(component.slots),
          ]

          try {
            writeFileSync(component.readmePath, content.join(NEWLINE))
          } catch (err) {
            console.error(err)
          }
        }
      },
    },
    vueOutputTarget({
      componentCorePackage: '../../public/build/design-system-components.esm.js',
      proxiesFile: './.storybook/vue/components.ts',
      componentModels: vueComponentModels,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }),
  ],
}
