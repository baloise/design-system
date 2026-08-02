import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Flexbox/Justify Content',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Start = Story({
  ...withRender(
    () => `<div class="flex justify-content-start flex-flex-wrap gap-normal">
    <div class="bg-green radius p-normal">1</div>
    <div class="bg-green radius p-normal">2</div>
    <div class="bg-green radius p-normal">3</div>
</div>`,
  ),
})
export const Center = Story({
  ...withRender(
    () => `<div class="flex justify-content-center flex-flex-wrap gap-normal">
    <div class="bg-green radius p-normal">1</div>
    <div class="bg-green radius p-normal">2</div>
    <div class="bg-green radius p-normal">3</div>
</div>`,
  ),
})
export const End = Story({
  ...withRender(
    () => `<div class="flex justify-content-end flex-flex-wrap gap-normal">
    <div class="bg-green radius p-normal">1</div>
    <div class="bg-green radius p-normal">2</div>
    <div class="bg-green radius p-normal">3</div>
</div>`,
  ),
})
export const SpaceBetween = Story({
  ...withRender(
    () => `<div class="flex justify-content-space-between flex-flex-wrap gap-normal">
    <div class="bg-green radius p-normal">1</div>
    <div class="bg-green radius p-normal">2</div>
    <div class="bg-green radius p-normal">3</div>
</div>`,
  ),
})
export const SpaceAround = Story({
  ...withRender(
    () => `<div class="flex justify-content-space-around flex-flex-wrap gap-normal">
    <div class="bg-green radius p-normal">1</div>
    <div class="bg-green radius p-normal">2</div>
    <div class="bg-green radius p-normal">3</div>
</div>`,
  ),
})
export const SpaceEvenly = Story({
  ...withRender(
    () => `<div class="flex justify-content-space-evenly flex-flex-wrap gap-normal">
    <div class="bg-green radius p-normal">1</div>
    <div class="bg-green radius p-normal">2</div>
    <div class="bg-green radius p-normal">3</div>
</div>`,
  ),
})
