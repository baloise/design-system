import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = { content: string }

const meta: Meta<Args> = {
  title: 'Components/Navigation/Link',
  args: {
    content: 'Link',
  },
  ...withRender(
    ({ content, ...args }) => `
<a class="link">${content}</a>
`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🌍 Basic'
