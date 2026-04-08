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

export const Colors = Story({
  args: {
    // place props here
  },
  ...withRender(
    ({ ...args }) => `
<div class="stack">
  <bal-toast closable>Default - ${args.message}</bal-toast>
  <bal-toast closable color="info">Info - ${args.message}</bal-toast>
  <bal-toast closable color="success">Success - ${args.message}</bal-toast>
  <bal-toast closable color="warning">Warning - ${args.message}</bal-toast>
  <bal-toast closable color="danger">Danger - ${args.message}</bal-toast>
</div>
`,
  ),
})
