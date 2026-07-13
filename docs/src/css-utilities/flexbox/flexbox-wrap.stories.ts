import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Flexbox/Flex Wrap',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Wrap = Story({
  ...withRender(
    () => `<div class="flex flex-wrap" style="max-width: 500px">
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">1</div>
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">2</div>
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">3</div>
</div>`,
  ),
})
export const WrapReverse = Story({
  ...withRender(
    () => `<div class="flex flex-wrap-reverse" style="max-width: 500px">
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">1</div>
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">2</div>
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">3</div>
</div>`,
  ),
})
export const Nowrap = Story({
  ...withRender(
    () => `<div class="flex flex-nowrap" style="max-width: 500px">
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">1</div>
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">2</div>
  <div class="flex align-items-center justify-content-center bg-green m-normal radius" style="min-width: 200px; min-height: 100px">3</div>
</div>`,
  ),
})
