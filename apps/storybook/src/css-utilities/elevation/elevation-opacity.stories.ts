import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Elevation/Opacity',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Examples = Story({
  ...withRender(
    () => `<div class="flex align-items-center justify-content-center gap-normal">
    <div class="opacity-half flex align-items-center justify-content-center bg-green radius p-normal">opacity-half</div>
    <div class="opacity-disabled flex align-items-center justify-content-center bg-green radius p-normal">opacity-disabled</div>
    <div class="opacity-backdrop flex align-items-center justify-content-center bg-green radius p-normal">opacity-backdrop</div>
    <div class="opacity-full flex align-items-center justify-content-center bg-green radius p-normal">opacity-full</div>
</div>`,
  ),
})
