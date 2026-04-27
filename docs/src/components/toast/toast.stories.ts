import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { ListenerFactory, StoryFactory, withComponentControls, withRender } from '../../utils'

// import codeSandboxHtmlTemplate from './code-sandbox/example_component_html.md?raw'
// import codeSandboxTsTemplate from './code-sandbox/example_component_ts.md?raw'

type Args = JSX.BalToast

const listener = ListenerFactory()

const meta: Meta<Args> = {
  title: 'Components/Feedback/Toast',
  parameters: {
    // balCodeSandbox: {
    //   files: {
    //     ...newCodeSandboxFile('example.component.html', codeSandboxHtmlTemplate),
    //     ...newCodeSandboxFile('example.component.ts', codeSandboxTsTemplate),
    //     ...newCodeSandboxFile('example.component.css'),
    //   },
    // },
  },
  args: {
    color: 'warning',
    heading: 'Heading',
    message: 'Toasts are used to inform the user with a simple text message.',
    closable: true,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-toast' }),
  },
  render: (args, context) => {
    const section: HTMLElement = document.createElement('section')

    section.innerHTML = `<ds-button>Trigger Toast</ds-button>`

    listener.addEventListener('click', context, (event: UIEvent) => {
      const button = (event.target as any).closest('ds-button')
      if (button) {
        const label = button.innerText.trim()

        if (label === 'Trigger Toast' && window) {
          const toastController = (window as any).DesignSystem.toastController
          toastController.create({
            color: args.color,
            heading: args.heading,
            message: args.message,
            closable: args.closable,
            duration: 4000,
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
Basic.storyName = '🧩 Basic'

export const Colors = Story({
  args: {
    // place props here
  },
  ...withRender(
    ({ ...args }) => `
<div class="stack">
  <ds-toast closable>Default - ${args.message}</ds-toast>
  <ds-toast closable color="info">Info - ${args.message}</ds-toast>
  <ds-toast closable color="success">Success - ${args.message}</ds-toast>
  <ds-toast closable color="warning">Warning - ${args.message}</ds-toast>
  <ds-toast closable color="danger">Danger - ${args.message}</ds-toast>
</div>
`,
  ),
})
Colors.storyName = '🧩 Colors'
