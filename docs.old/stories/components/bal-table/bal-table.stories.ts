import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import {
  props,
  withRender,
  withContent,
  withDefaultContent,
  withComponentControls,
  StoryFactory,
  newCodeSandboxFile,
} from '../../utils'
import { tableHtml } from './bal-table.templates'

type Args = JSX.BalTable & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Table',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-table' }),
  },
  ...withRender(({ content, ...args }) => `<bal-table ${props(args)}>${content}</bal-table>`),
}

const table = tableHtml

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(() => table),
})

import codeSandboxHtmlTemplate from './code-sandbox/example_component_html.md?raw'
import codeSandboxTsTemplate from './code-sandbox/example_component_ts.md?raw'
import angularPkg from '../../../public/assets/code/angular/package.json'
import angularStyles from '../../../public/assets/code/angular/src/styles.scss?raw'

angularPkg.dependencies['@baloise/ds-table'] = 'latest'
angularPkg.dependencies['ag-grid-community'] = 'latest'
angularPkg.dependencies['ag-grid-angular'] = 'latest'

export const AgGrid = Story({
  parameters: {
    balCodeSandbox: {
      files: {
        ...newCodeSandboxFile('example.component.html', codeSandboxHtmlTemplate),
        ...newCodeSandboxFile('example.component.ts', codeSandboxTsTemplate),
        ...newCodeSandboxFile('example.component.css'),
        'src/styles.scss': {
          isBinary: false,
          content: `${angularStyles}
@use 'ag-grid-community/styles/ag-grid' as *;
@use 'ag-grid-community/styles/ag-theme-alpine' as *;
@use '@baloise/ds-table/css/design-system-table' as *;
`,
        },
        'package.json': {
          isBinary: false,
          content: angularPkg,
        },
      },
    },
  },
  args: {
    content: 'No Story available. Try the CodeSandbox button on the documentation page of the AG-Grid section.',
  },
})
