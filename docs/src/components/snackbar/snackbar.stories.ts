import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { ListenerFactory, StoryFactory, withComponentControls, withRender } from '../../utils'

// import codeSandboxHtmlTemplate from './code-sandbox/example_component_html.md?raw'
// import codeSandboxTsTemplate from './code-sandbox/example_component_ts.md?raw'

type Args = JSX.BalSnackbar

const listener = ListenerFactory()

const meta: Meta<Args> = {
  title: 'Components/Feedback/Snackbar',
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
    action: 'More',
    message: 'Snackbar is used to inform the user with a simple text message and a action.',
    closable: false,
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
            heading: args.heading,
            message: args.message,
            closable: args.closable,
            action: args.action,
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
  <bal-snackbar heading="Default">${args.message}</bal-snackbar>
  <bal-snackbar color="info" heading="Info">${args.message}</bal-snackbar>
  <bal-snackbar color="success" heading="Success">${args.message}</bal-snackbar>
  <bal-snackbar color="warning" heading="Warning">${args.message}</bal-snackbar>
  <bal-snackbar color="danger" heading="Danger">${args.message}</bal-snackbar>
</div>
`,
  ),
})

import { BrandIconCarPurple } from '@baloise/ds-assets/dist'

export const BrandIcons = Story({
  args: {
    // place props here
  },
  ...withRender(
    ({ ...args }) => `
  <bal-snackbar heading="With Brand Icons" svg='${BrandIconCarPurple}' action="Aktion">${args.message}</bal-snackbar>
`,
  ),
})
