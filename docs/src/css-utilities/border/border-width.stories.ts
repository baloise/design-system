import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Border/Border Width',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Examples = Story({
  ...withRender(
    () => `<div class="border-primary border-width-none p-small mb-small">None</div>
<div class="border-primary border-width-small p-small mb-small">Small</div>
<div class="border-primary border-width-normal p-small mb-small">Normal</div>
<div class="border-primary border-width-large p-small mb-small">Large</div>`,
  ),
})
