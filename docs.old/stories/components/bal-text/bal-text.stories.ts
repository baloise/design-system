import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalText & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Typography/Text',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-text' }),
  },
  ...withRender(({ content, ...args }) => `<bal-text ${props(args)}>${content}</bal-text>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    () => `
<p><b>Primary paragraph</b> use b or strong to make bold sections</p>
<p class="text-primary-light text-small"><b>Secondary paragraph</b> used for hints</p>
`,
  ),
})

export const Text = Story({
  args: {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
})

export const NoWrap = Story({
  args: {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    noWrap: true,
  },
})
