import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Flexbox/Align Content',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Start = Story({
  ...withRender(
    () => `<div class="flex align-content-start flex-wrap gap-normal" style="min-height: 200px">
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">1</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">2</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">3</div>
</div>`,
  ),
})
export const Center = Story({
  ...withRender(
    () => `<div class="flex align-content-center flex-wrap gap-normal" style="min-height: 200px">
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">1</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">2</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">3</div>
</div>`,
  ),
})
export const End = Story({
  ...withRender(
    () => `<div class="flex align-content-end flex-wrap gap-normal" style="min-height: 200px">
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">1</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">2</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 4rem">3</div>
</div>`,
  ),
})
export const SpaceBetween = Story({
  ...withRender(
    () => `<div class="flex align-content-space-between flex-wrap gap-normal" style="min-height: 200px">
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px" style="height: 4rem">1</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">2</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">3</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">4</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">5</div>
</div>`,
  ),
})
export const SpaceAround = Story({
  ...withRender(
    () => `<div class="flex align-content-space-around flex-wrap gap-normal" style="min-height: 200px">
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px" style="height: 4rem">1</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">2</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">3</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">4</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">5</div>
</div>`,
  ),
})
export const SpaceEvenly = Story({
  ...withRender(
    () => `<div class="flex align-content-space-evenly flex-wrap gap-normal" style="min-height: 200px">
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px" style="height: 4rem">1</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">2</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">3</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">4</div>
    <div class="bg-green radius flex justify-content-center align-items-center" style="height: 4rem; width: 200px">5</div>
</div>`,
  ),
})
