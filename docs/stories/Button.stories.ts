import type { JSX } from '@baloise/design-system-components'
import type { Meta, StoryObj } from '@storybook/html'
import { withContent, withComponentControls, props, render } from './utils'

type Args = JSX.BalButton & { content: string }
type Story = StoryObj<Args>

export default {
  title: 'Example/Button',
  render: ({ content, ...args }) => {
    return render({
      args,
      template: `<bal-button ${props(args)}>${content}</bal-button>`,
    })
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-button' }),
  },
} as Meta<Args>

/**
 * STORIES
 * ------------------------------------------------------
 */

export const Primary: Story = {
  args: {
    content: 'Winnie',
    color: 'primary',
  },
}
