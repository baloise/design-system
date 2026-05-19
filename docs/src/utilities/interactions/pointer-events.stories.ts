import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Interactions/Pointer Events',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Classes = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center">
  <button class="button m-small pointer-events-auto">Auto</button>
  <button class="button m-small pointer-events-none">None</button>
</div>`,
  ),
})
