import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalLogo & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Logo',
  args: {
    ...withDefaultContent(''),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-logo' }),
  },
  ...withRender(({ content, ...args }) => `<bal-logo ${props(args)}>${content}</bal-logo>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    color: 'blue',
  },
})

export const Animated = Story({
  args: {
    color: 'blue',
    animated: true,
  },
})
