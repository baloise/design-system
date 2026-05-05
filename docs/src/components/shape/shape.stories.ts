import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsShape & { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Shape/Variants',
  args: {
    slot: 'Hello World',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-shape' }),
  },
  ...withRender(({ slot, ...args }) => `<ds-shape ${props(args)}>${slot}</ds-shape>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    slot: '',
    color: 'green',
    rotation: '0',
    variation: '1',
  },
})
Basic.storyName = '🧩 Basic'
