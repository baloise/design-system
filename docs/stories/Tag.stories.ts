import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { withContent, withComponentControls, props, StoryFactory, withRender } from './utils'

type Args = JSX.BalTag & { content: string }

const meta: Meta<Args> = {
  title: 'Example/Tag',
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-tag' }),
  },
  ...withRender(({ content, ...args }) => `<bal-tag ${props(args)}>${content}</bal-tag>`),
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
  ...withRender(args => `<bal-tag ${props(args)}>Secondary</bal-tag>`),
})
