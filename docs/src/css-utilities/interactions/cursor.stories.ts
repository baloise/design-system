import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Interactions/Cursor',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Classes = Story({
  ...withRender(
    () => `<div class="flex align-items-center justify-content-center">
  <div class="cursor-auto flex align-items-center justify-content-center radius bg-green p-small m-small">auto</div>
  <div class="cursor-pointer flex align-items-center justify-content-center radius bg-green p-small m-small">pointer</div>
  <div class="cursor-wait flex align-items-center justify-content-center radius bg-green p-small m-small">wait</div>
  <div class="cursor-move flex align-items-center justify-content-center radius bg-green p-small m-small">move</div>
</div>`,
  ),
})
