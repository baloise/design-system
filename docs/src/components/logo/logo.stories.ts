import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX.BalLogo & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Logo',
  args: {
    ...withDefaultContent(''),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'ds-logo' }),
  },
  ...withRender(({ content, ...args }) => `<ds-logo ${props(args)}>${content}</ds-logo>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const Animated = Story({
  args: {
    color: 'blue',
    animated: true,
  },
})
Animated.storyName = '🧩 Animated'
