import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Sizing/Height',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Basic = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center">
  <div class="radius bg-green-2 w-12rem h-6rem p-small m-small">
    <div class="h-auto radius bg-green-4 p-small flex align-items-center justify-content-center">h-auto</div>
  </div>
  <div class="radius bg-green-2 w-12rem h-6rem p-small m-small">
    <div class="h-full radius bg-green-4 p-small flex align-items-center justify-content-center">h-full</div>
  </div>
</div>`,
  ),
})
export const FixedHeight = Story({
  ...withRender(
    () => `<div class="flex flex-row flex-wrap align-items-center justify-content-center">
  <div class="h-6rem radius bg-green-4 p-small m-small flex align-items-center justify-content-center">h-6rem</div>
  <div class="h-12rem radius bg-green-4 p-small m-small flex align-items-center justify-content-center">h-12rem</div>
  <div class="h-24rem radius bg-green-4 p-small m-small flex align-items-center justify-content-center">h-24rem</div>
</div>`,
  ),
})
export const Responsive = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center">
  <div class="radius bg-green-2 w-16rem h-8rem p-small m-small">
    <div class="h-full tablet:h-auto radius bg-green-4 p-small flex align-items-center justify-content-center">h-full on small screen</div>
  </div>
</div>`,
  ),
})
