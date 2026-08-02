import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Spacing/Padding',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const SingleSidePadding = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-large">
  <div class="pt-normal bg-red-2">
      <div class="bg-green p-large">pt-normal</div>
  </div>
  <div class="pr-large bg-red-2">
      <div class="bg-green p-large">pr-large</div>
  </div>
  <div class="pb-small bg-red-2">
      <div class="bg-green p-large">pb-small</div>
  </div>
  <div class="pl-medium bg-red-2">
      <div class="bg-green p-large">pl-medium</div>
  </div>
</div>`,
  ),
})
export const HorizontalPadding = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-large">
    <div class="px-large bg-red-2 radius">
        <div class="radius bg-green font-weight-bold p-normal">px-large</div>
    </div>
</div>`,
  ),
})
export const VerticalPadding = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-large">
    <div class="py-large bg-red-2 radius">
        <div class="radius bg-green font-weight-bold p-normal">py-large</div>
    </div>
</div>`,
  ),
})
