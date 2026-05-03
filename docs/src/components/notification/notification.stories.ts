import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  StoryFactory,
  createCssMappings,
  cssClasses,
  props,
  withComponentControls,
  withRender,
} from '../../utils'

type Args = JSX.DsNotification & { slot: string }

const tag = 'ds-notification'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Notification/Variants',
  args: {
    heading: 'Strong Title',
    slot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ slot, heading, ...args }) => `
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
  ${slot}
</section>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {},
  ...withRender(
    ({ slot, ...args }) => `<ds-notification ${props(args)}>
  ${slot}
</ds-notification>`,
  ),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({})
BasicHtml.storyName = '🌍 Basic'

export const Alerts = Story({
  args: {
    alert: true,
    heading: undefined,
  },
  ...withRender(
    ({ slot, ...args }) => `
<div class="stack">
  <ds-notification ${props(args)} heading="Alert">
    ${slot}
  </ds-notification>
  <ds-notification ${props(args)} color="info" heading="Information">
    ${slot}
  </ds-notification>
  <ds-notification ${props(args)} color="success" heading="Success">
    ${slot}
  </ds-notification>
  <ds-notification ${props(args)} color="warning" heading="Warning">
    ${slot}
  </ds-notification>
  <ds-notification ${props(args)} color="danger" heading="Danger">
    ${slot}
  </ds-notification>
</div>`,
  ),
})
Alerts.storyName = '🧩 Alerts'

export const Outlines = Story({
  args: {
    heading: undefined,
  },
  ...withRender(
    ({ slot, ...args }) => `
<div class="stack">
  <ds-notification ${props(args)} color="outline-base" heading="Alert">
    ${slot}
  </ds-notification>
  <ds-notification ${props(args)} color="outline-purple" heading="Information">
    ${slot}
  </ds-notification>
  <ds-notification ${props(args)} color="outline-green" heading="Success">
    ${slot}
  </ds-notification>
  <ds-notification ${props(args)} color="outline-yellow" heading="Warning">
    ${slot}
  </ds-notification>
  <ds-notification ${props(args)} color="outline-red" heading="Danger">
    ${slot}
  </ds-notification>
</div>`,
  ),
})
Outlines.storyName = '🧩 Outlines'
