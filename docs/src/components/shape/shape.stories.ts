import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX.BalShape & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Shape',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'ds-shape' }),
  },
  ...withRender(({ content, ...args }) => `<ds-shape ${props(args)}>${content}</ds-shape>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    content: '',
    color: 'green',
    rotation: '0',
    variation: '1',
  },
})
Basic.storyName = '🧩 Basic'
