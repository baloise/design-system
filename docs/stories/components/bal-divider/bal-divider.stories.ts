import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalDivider & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Divider',
  argTypes: {
    ...withComponentControls({ tag: 'bal-divider' }),
  },
  ...withRender(({ ...args }) => `<bal-divider ${props(args)}></bal-divider>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Dashed = Story({
  args: {
    borderStyle: 'dashed'
  }
})

export const LayoutVertical = Story({
  args: {
    layout: 'vertical',
    color: 'primary',
  },
  ...withRender(
    ({ ...args }) => `<bal-stack>
  <bal-text>Left</bal-text>
  <bal-divider ${props(args)}></bal-divider>
  <bal-text>Right</bal-text>
</bal-stack>`,
  ),
})
