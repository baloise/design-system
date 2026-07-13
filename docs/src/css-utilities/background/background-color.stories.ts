import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Background/Background Colors',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Basic = Story({
  ...withRender(() => `<div class="bg-green p-normal">Green background</div>`),
})
export const InvertedColors = Story({
  ...withRender(
    () => `<div class="bg-primary p-normal">
  <p class="text-white">Hello World</p>
</div>`,
  ),
})
export const PseudoStates = Story({
  ...withRender(
    () => `<div class="bg-green-3 hover:bg-green-4 active:bg-red-3 cursor-pointer">
  <p class="text-white p-normal">Hover and click me!</p>
</div>`,
  ),
})
