
import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalNavigation & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Deprecated/Navigation',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-navigation' }),
  },
  ...withRender(({ content, ...args }) => `<bal-navigation ${props(args)}>${content}</bal-navigation>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Secondary = Story({
  args: {
    // place props here
  },
})
