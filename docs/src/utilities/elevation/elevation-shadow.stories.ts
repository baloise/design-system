import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Elevation/Shadow',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const BoxShadow = Story({
  ...withRender(
    () => `<div class="flex align-items-center justify-content-center gap-xx-large">
    <div class="shadow flex align-items-center justify-content-center bg-green radius p-normal">shadow</div>
    <div class="shadow-elevated flex align-items-center justify-content-center bg-green radius p-normal">shadow-elevated</div>
</div>`,
  ),
})
export const TextShadow = Story({
  ...withRender(
    () =>
      `<p class="text-shadow">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>`,
  ),
})
export const PseudoStates = Story({
  ...withRender(
    () => `<div class="bg-green-3 hover:shadow active:shadow-large cursor-pointer">
  <p class="p-normal">Hover and click me!</p>
</div>`,
  ),
})
