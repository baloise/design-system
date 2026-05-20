import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Flexbox/Align Items',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Start = Story({
  ...withRender(
    () => `<div class="flex align-items-start flex-wrap gap-normal" style="min-height: 200px">
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 50px">1</div>
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 150px">2</div>
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 100px">3</div>
</div>`,
  ),
})
export const Center = Story({
  ...withRender(
    () => `<div class="flex align-items-center flex-wrap gap-normal" style="min-height: 200px">
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 50px">1</div>
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 150px">2</div>
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 100px">3</div>
</div>`,
  ),
})
export const End = Story({
  ...withRender(
    () => `<div class="flex align-items-end flex-wrap gap-normal" style="min-height: 200px">
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 50px">1</div>
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 150px">2</div>
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 100px">3</div>
</div>`,
  ),
})
export const Stretch = Story({
  ...withRender(
    () => `<div class="flex align-items-stretch flex-wrap gap-normal" style="min-height: 200px">
    <div class="bg-green radius flex justify-content-center align-items-center" style="min-height: 4rem; min-width: 200px">1</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="min-height: 4rem; min-width: 200px">2</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="min-height: 4rem; min-width: 200px">3</div>
</div>`,
  ),
})
export const Baseline = Story({
  ...withRender(
    () => `<div class="flex align-items-baseline flex-wrap gap-normal" style="min-height: 200px">
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 50px">1</div>
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 150px">2</div>
  <div class="bg-green radius flex justify-content-center align-items-center" style="min-width: 200px; min-height: 100px">3</div>
</div>`,
  ),
})
