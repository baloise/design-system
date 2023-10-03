
import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalRadio & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Radio',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-radio' }),
  },
  ...withRender(({ content, ...args }) => `<bal-radio ${props(args)}>${content}</bal-radio>`),
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
