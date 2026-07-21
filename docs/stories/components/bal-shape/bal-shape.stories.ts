import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalShape & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Shape',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-shape' }),
  },
  ...withRender(({ content, ...args }) => `<bal-shape ${props(args)}>${content}</bal-shape>`),
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
