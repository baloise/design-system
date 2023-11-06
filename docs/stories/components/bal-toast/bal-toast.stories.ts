import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { withRender, withComponentControls, StoryFactory, ListenerFactory, newCodeSandboxFile } from '../../utils'

import codeSandboxHtmlTemplate from './code-sandbox/example_component_html.md?raw'
import codeSandboxTsTemplate from './code-sandbox/example_component_ts.md?raw'

type Args = JSX.BalToast

const listener = ListenerFactory()

const meta: Meta<Args> = {
  title: 'Components/Feedback/Toast',
  parameters: {
    balCodeSandbox: {
      ...newCodeSandboxFile('example.component.html', codeSandboxHtmlTemplate),
      ...newCodeSandboxFile('example.component.ts', codeSandboxTsTemplate),
      ...newCodeSandboxFile('example.component.css'),
    },
  },
  args: {
    color: 'info',
    message: 'Hello World',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-toast' }),
  },
  render: (args, context) => {
    const section: HTMLElement = document.createElement('section')

    section.innerHTML = `<bal-button>Trigger Toast</bal-button>`

    listener.addEventListener('click', context, (event: UIEvent) => {
      const button = (event.target as any).closest('bal-button')
      if (button) {
        const label = button.innerText.trim()

        if (label === 'Trigger Toast' && window) {
          const toastController = (window as any).BaloiseDesignSystem.toastController
          toastController.create({
            color: args.color,
            message: args.message,
            duration: 2000,
          })
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

export const Colors = Story({
  args: {
    // place props here
  },
  ...withRender(
    ({ ...args }) => `
<bal-toast color="info">Info - ${args.message}</bal-toast>
<bal-toast color="success">Success - ${args.message}</bal-toast>
<bal-toast color="warning">Warning - ${args.message}</bal-toast>
<bal-toast color="danger">Danger - ${args.message}</bal-toast>
`,
  ),
})
