import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Border/Border Colors',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Border = Story({
  ...withRender(() => `<div class="border-primary p-normal"></div>`),
})
export const Colors = Story({
  ...withRender(
    () => `<div class="border-primary p-x-small mb-x-small">Primary</div>
<div class="border-grey p-x-small mb-x-small">Grey</div>
<div class="border-grey-dark p-x-small mb-x-small">Grey Dark</div>
<div class="border-success p-x-small mb-x-small">Success</div>
<div class="border-danger p-x-small mb-x-small">Danger</div>
<div class="border-warning p-x-small mb-x-small">Warning</div>`,
  ),
})
export const Position = Story({
  ...withRender(
    () => `<div class="flex gap-normal">
  <div class="border-top-primary p-x-small bg-green-2 flex-1">Top</div>
  <div class="border-right-primary p-x-small bg-green-2 flex-1">Right</div>
  <div class="border-bottom-primary p-x-small bg-green-2 flex-1">Bottom</div>
  <div class="border-left-primary p-x-small bg-green-2 flex-1">Left</div>
</div>`,
  ),
})
export const PseudoStates = Story({
  ...withRender(
    () => `<div class="border-primary hover:border-primary-hover active:border-primary-active cursor-pointer">
  <p class="p-normal">Hover and click me!</p>
</div>`,
  ),
})
