import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Flexbox/Gap',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Gap = Story({
  ...withRender(
    () => `<div class="flex flex-wrap gap-base mb-base">
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">1</div>
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">2</div>
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">3</div>
</div>
<div class="flex flex-wrap gap-2xl">
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">1</div>
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">2</div>
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">3</div>
</div>`,
  ),
})
export const ColumnGap = Story({
  ...withRender(
    () => `<div class="flex flex-wrap column-gap-xs mb-base bg-red-2">
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">1</div>
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">2</div>
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">3</div>
</div>
<div class="flex flex-wrap column-gap-lg mb-base bg-red-2 mt-base">
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">1</div>
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">2</div>
  <div class="flex-1 bg-red radius flex justify-content-center align-items-center">3</div>
</div>`,
  ),
})
export const RowGap = Story({
  ...withRender(
    () => `<div class="flex flex-wrap row-gap-lg mb-base bg-red-2">
  <div class="min-w-full flex-1 bg-red radius flex justify-content-center align-items-center">1</div>
  <div class="min-w-full flex-1 bg-red radius flex justify-content-center align-items-center">2</div>
</div>`,
  ),
})
