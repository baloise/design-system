import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import {
  withContent,
  withDefaultContent,
  withComponentControls,
  StoryFactory,
  ListenerFactory,
  newCodeSandboxFile,
} from '../../utils'

import codeSandboxHtmlTemplate from './code-sandbox/example_component_html.md?raw'
import codeSandboxTsTemplate from './code-sandbox/example_component_ts.md?raw'
import codeSandboxModalHtmlTemplate from './code-sandbox/modal_component_html.md?raw'
import codeSandboxModalTsTemplate from './code-sandbox/modal_component_ts.md?raw'

type Args = JSX.BalModal & { content: string }

const listener = ListenerFactory()

const meta: Meta<Args> = {
  title: 'Components/Feedback/Modal',
  parameters: {
    balCodeSandbox: {
      files: {
        ...newCodeSandboxFile('example.component.html', codeSandboxHtmlTemplate),
        ...newCodeSandboxFile('example.component.ts', codeSandboxTsTemplate),
        ...newCodeSandboxFile('example.component.css'),
        ...newCodeSandboxFile('modal.component.html', codeSandboxModalHtmlTemplate),
        ...newCodeSandboxFile('modal.component.ts', codeSandboxModalTsTemplate),
        ...newCodeSandboxFile('modal.component.css'),
      },
    },
  },
  args: {
    ...withDefaultContent(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing?</p>
    <bal-button-group position="right" reverse="true">
      <bal-button color="text">Cancel</bal-button>
      <bal-button color="primary">Okay</bal-button>
    </bal-button-group>`),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-modal' }),
  },
  render: (args, context) => {
    const section: HTMLElement = document.createElement('section')

    section.innerHTML = `
<bal-button>Open Modal</bal-button>
<bal-modal id="modal">
  <bal-modal-header>Modal Title</bal-modal-header>
  <bal-modal-body>
    ${args.content}
  </bal-modal-body>
</bal-modal>`

    listener.addEventListener('click', context, (event: UIEvent) => {
      const button = (event.target as any).closest('bal-button')
      if (button) {
        const label = button.innerText.trim()

        const modal = document.getElementById('modal') as HTMLBalModalElement
        if (modal) {
          if (label === 'Open Modal') {
            modal.open()
          }

          if (label === 'Cancel' || label === 'Okay') {
            modal.close()
          }
        }
      }
    })

    return section
  },
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
