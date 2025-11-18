import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { withRender, withContent, withDefaultContent, withComponentControls, StoryFactory, props } from '../../utils'

type Args = JSX.BalNotification & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Containment/Notification',
  args: {
    ...withDefaultContent(),
    content:
      '<strong>Strong Title </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-notification' }),
  },
  ...withRender(
    ({ content, ...args }) => `<bal-notification ${props(args)}>
  <span>${content}</span>
</bal-notification>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
