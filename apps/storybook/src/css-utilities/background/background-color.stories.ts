import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Background/Background Colors',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Basic = Story({
  ...withRender(() => `<div class="bg-red p-normal">Green background</div>`),
})
export const InvertedColors = Story({
  ...withRender(
    () => `<div class="bg-primary p-normal text-on-primary">
  Hello World
</div>`,
  ),
})
export const PseudoStates = Story({
  ...withRender(
    () => `<div class="bg-red-3 hover:bg-red-4 active:bg-red-3 cursor-pointer">
  <p class="text-white p-normal">Hover and click me!</p>
</div>`,
  ),
})
