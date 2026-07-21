import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { withRender, withComponentControls, StoryFactory, ListenerFactory, newCodeSandboxFile } from '../../utils'

import codeSandboxHtmlTemplate from './code-sandbox/example_component_html.md?raw'
import codeSandboxTsTemplate from './code-sandbox/example_component_ts.md?raw'

type Args = JSX.BalSnackbar

const listener = ListenerFactory()

const meta: Meta<Args> = {
  title: 'Components/Feedback/Snackbar',
  parameters: {
    balCodeSandbox: {
      files: {
        ...newCodeSandboxFile('example.component.html', codeSandboxHtmlTemplate),
        ...newCodeSandboxFile('example.component.ts', codeSandboxTsTemplate),
        ...newCodeSandboxFile('example.component.css'),
      },
    },
  },
  args: {
    color: 'info',
    icon: 'info-circle',
    subject: 'Title',
    action: 'More',
    message: 'Hello World',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-snackbar' }),
  },
  render: (args, context) => {
    const section: HTMLElement = document.createElement('section')

    section.innerHTML = `<bal-button>Trigger Snackbar</bal-button>`

    listener.addEventListener('click', context, (event: UIEvent) => {
      const button = (event.target as any).closest('bal-button')
      if (button) {
        const label = button.innerText.trim()

        if (label === 'Trigger Snackbar' && window) {
          const snackbarController = (window as any).BaloiseDesignSystem.snackbarController
          snackbarController.create({
            color: args.color,
            icon: args.icon,
            subject: args.subject,
            message: args.message,
            action: args.action,
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
<bal-snackbar color="info" subject="Info">${args.message}</bal-snackbar>
<bal-snackbar color="success" subject="Success">${args.message}</bal-snackbar>
<bal-snackbar color="warning" subject="Warning">${args.message}</bal-snackbar>
<bal-snackbar color="danger" subject="Danger">${args.message}</bal-snackbar>
`,
  ),
})
