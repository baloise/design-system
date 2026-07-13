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
    () => `<div class="border-primary radius-none p-small mb-small">None</div>
<div class="border-primary radius p-small mb-small">Normal</div>
<div class="border-primary radius-lg p-small mb-small">Large</div>
<div class="border-primary radius-rounded p-small mb-small">Rounded</div>`,
  ),
})
