import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Border/Border Radius',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Examples = Story({
  ...withRender(
    () => `<div class="border-primary radius-none p-sm mb-sm">None</div>
<div class="border-primary radius p-sm mb-sm">Normal</div>
<div class="border-primary radius-lg p-sm mb-sm">Large</div>
<div class="border-primary radius-rounded p-sm mb-sm">Rounded</div>`,
  ),
})
