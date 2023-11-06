import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalClose & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Navigation/Close',
  args: {},
  argTypes: {
    ...withComponentControls({ tag: 'bal-close' }),
  },
  ...withRender(({ content, ...args }) => `<bal-close ${props(args)}></bal-close>`),
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
