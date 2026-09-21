import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Border/Border Colors',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Border = Story({
  ...withRender(() => `<div class="border-primary p-base"></div>`),
})
export const Colors = Story({
  ...withRender(
    () => `<div class="border-primary p-xs mb-xs">Primary</div>
<div class="border-grey p-xs mb-xs">Grey</div>
<div class="border-grey-dark p-xs mb-xs">Grey Dark</div>
<div class="border-success p-xs mb-xs">Success</div>
<div class="border-danger p-xs mb-xs">Danger</div>
<div class="border-warning p-xs mb-xs">Warning</div>`,
  ),
})
export const Position = Story({
  ...withRender(
    () => `<div class="flex gap-base">
  <div class="border-top-primary p-xs bg-red-2 flex-1">Top</div>
  <div class="border-right-primary p-xs bg-red-2 flex-1">Right</div>
  <div class="border-bottom-primary p-xs bg-red-2 flex-1">Bottom</div>
  <div class="border-left-primary p-xs bg-red-2 flex-1">Left</div>
</div>`,
  ),
})
export const PseudoStates = Story({
  ...withRender(
    () => `<div class="border-primary hover:border-primary-hover active:border-primary-active cursor-pointer">
  <p class="p-base">Hover and click me!</p>
</div>`,
  ),
})
