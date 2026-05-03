import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Link/Variants',
  args: {
    slot: 'Link',
  },
  ...withRender(
    ({ slot, ...args }) => `
<a class="link">${slot}</a>
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
