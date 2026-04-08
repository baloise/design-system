import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  StoryFactory,
  createCssMappings,
  cssClasses,
  props,
  withComponentControls,
  withContent,
  withDefaultContent,
  withRender,
} from '../../utils'

type Args = JSX.BalNotification & { content: string }

const tag = 'bal-notification'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Containment/Notification',
  args: {
    ...withDefaultContent(),
    heading: 'Strong Title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ content, heading, ...args }) => `
<section role="status" aria-live="polite" aria-atomic="true" ${cssClasses(
      {
        ...css('color', (color: string) => `is-${color}`),
        ...css('size', (size: string) => `is-${size}`),
        noIcon: 'has-no-icon',
      },
      args,
      'notification',
    )}>
  <h2>${heading}</h2>
  ${content}
</section>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const WebComponentBasic = Story({
  args: {},
  ...withRender(
    ({ content, ...args }) => `<bal-notification ${props(args)}>
  ${content}
</bal-notification>`,
  ),
})

export const Alerts = Story({
  args: {
    alert: true,
    heading: undefined,
  },
  ...withRender(
    ({ content, ...args }) => `
<div class="stack">
  <bal-notification ${props(args)} heading="Alert">
    ${content}
  </bal-notification>
  <bal-notification ${props(args)} color="info" heading="Information">
    ${content}
  </bal-notification>
  <bal-notification ${props(args)} color="success" heading="Success">
    ${content}
  </bal-notification>
  <bal-notification ${props(args)} color="warning" heading="Warning">
    ${content}
  </bal-notification>
  <bal-notification ${props(args)} color="danger" heading="Danger">
    ${content}
  </bal-notification>
</div>`,
  ),
})

export const Outlines = Story({
  args: {
    heading: undefined,
  },
  ...withRender(
    ({ content, ...args }) => `
<div class="stack">
  <bal-notification ${props(args)} color="outline-base" heading="Alert">
    ${content}
  </bal-notification>
  <bal-notification ${props(args)} color="outline-purple" heading="Information">
    ${content}
  </bal-notification>
  <bal-notification ${props(args)} color="outline-green" heading="Success">
    ${content}
  </bal-notification>
  <bal-notification ${props(args)} color="outline-yellow" heading="Warning">
    ${content}
  </bal-notification>  
  <bal-notification ${props(args)} color="outline-red" heading="Danger">
    ${content}
  </bal-notification>
</div>`,
  ),
})
