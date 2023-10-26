import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalNotification & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Notification',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-notification' }),
  },
  ...withRender(({ content, ...args }) => `<bal-notification ${props(args)}>${content}</bal-notification>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    ({ content }) => `<bal-notification>
    <span>${content}</span>
  </bal-notification>`,
  ),
  args: {
    content:
      '<strong>Strong Title </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
})
