import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Flexbox/Align Self',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Start = Story({
  ...withRender(
    () => `<div class="flex align-items-stretch flex-wrap gap-normal" style="min-height: 200px">
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">1</div>
    <div class="flex align-self-start align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">2</div>
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">3</div>
</div>`,
  ),
})
export const Center = Story({
  ...withRender(
    () => `<div class="flex align-items-stretch flex-wrap gap-normal" style="min-height: 200px">
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">1</div>
    <div class="flex align-self-center align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">2</div>
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">3</div>
</div>`,
  ),
})
export const End = Story({
  ...withRender(
    () => `<div class="flex align-items-stretch flex-wrap gap-normal" style="min-height: 200px">
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">1</div>
    <div class="flex align-self-end align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">2</div>
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">3</div>
</div>`,
  ),
})
export const Stretch = Story({
  ...withRender(
    () => `<div class="flex align-items-stretch flex-wrap gap-normal" style="min-height: 200px">
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; height: 50px">1</div>
    <div class="flex align-self-stretch align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">2</div>
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; height: 50px">3</div>
</div>`,
  ),
})
export const Baseline = Story({
  ...withRender(
    () => `<div class="flex align-items-stretch flex-wrap gap-normal" style="min-height: 200px">
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">1</div>
    <div class="flex align-self-baseline align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">2</div>
    <div class="flex align-items-center justify-content-center bg-green radius" style="min-width: 200px; min-height: 50px">3</div>
</div>`,
  ),
})
