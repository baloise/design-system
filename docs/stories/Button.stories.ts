import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { withContent, withComponentControls, props, StoryFactory, withRender } from './utils'

type Args = JSX.BalTag & { content: string }

const meta: Meta<Args> = {
  title: 'Example/Button',
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-button' }),
  },
  ...withRender(({ content, ...args }) => `<bal-button ${props(args)}>${content}</bal-button>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Primary = Story({
  args: {
    content: 'Winnie',
    color: 'primary',
    closable: true,
  },
})

export const Secondary = Story({
  args: {
    color: 'danger',
    closable: false,
  },
  ...withRender(args => `<bal-button ${props(args)}>Secondary</bal-button>`),
})
