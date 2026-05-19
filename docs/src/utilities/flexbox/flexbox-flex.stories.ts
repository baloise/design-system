import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Flexbox/Flex',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Initial = Story({
  ...withRender(
    () => `<div class="flex gap-normal mb-normal">
    <div class="flex-initial bg-green-2 radius p-normal">Hello</div>
    <div class="flex-initial bg-green-2 radius p-normal">Hello World</div>
    <div class="flex-initial bg-green-2 radius p-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
</div>`,
  ),
})
export const Flex1 = Story({
  ...withRender(
    () => `<div class="flex gap-normal mb-normal">
    <div class="bg-green-2 radius p-normal">Hello</div>
    <div class="bg-green-2 radius p-normal">Hello World</div>
    <div class="bg-green-2 radius p-normal">Lorem ipsum dolor sit amet</div>
</div>
<div class="flex gap-normal">
    <div class="flex-1 bg-green-2 radius p-normal">Hello</div>
    <div class="flex-1 bg-green-2 radius p-normal">Hello World</div>
    <div class="flex-1 bg-green-2 radius p-normal">Lorem ipsum dolor sit amet</div>
</div>`,
  ),
})
export const Auto = Story({
  ...withRender(
    () => `    <div class="flex gap-normal mb-normal">
        <div class="bg-green-2 radius p-normal">Hello</div>
        <div class="bg-green-2 radius p-normal">Hello World</div>
        <div class="bg-green-2 radius p-normal">Lorem ipsum dolor sit amet</div>
    </div>
    <div class="flex gap-normal">
        <div class="flex-auto bg-green-2 radius p-normal">Hello</div>
        <div class="flex-auto bg-green-2 radius p-normal">Hello World</div>
        <div class="flex-auto bg-green-2 radius p-normal">Lorem ipsum dolor sit amet</div>
    </div>`,
  ),
})
export const None = Story({
  ...withRender(
    () => `<div class="flex gap-normal mb-normal">
  <div class="flex-1 bg-green-2 radius p-normal">Lorem ipsum dolor sit amet</div>
  <div class="flex-none bg-green-2 radius p-normal">Lorem ipsum dolor sit amet</div>
  <div class="flex-1 bg-green-2 radius p-normal">Lorem ipsum dolor sit amet</div>
</div>`,
  ),
})
