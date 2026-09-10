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
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-lg">
  <div class="pt-base bg-red-2">
      <div class="bg-red p-lg">pt-base</div>
  </div>
  <div class="pr-lg bg-red-2">
      <div class="bg-red p-lg">pr-lg</div>
  </div>
  <div class="pb-sm bg-red-2">
      <div class="bg-red p-lg">pb-sm</div>
  </div>
  <div class="pl-md bg-red-2">
      <div class="bg-red p-lg">pl-md</div>
  </div>
</div>`,
  ),
})
export const HorizontalPadding = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-lg">
    <div class="px-lg bg-red-2 radius">
        <div class="radius bg-red font-weight-bold p-base">px-lg</div>
    </div>
</div>`,
  ),
})
export const VerticalPadding = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-lg">
    <div class="py-lg bg-red-2 radius">
        <div class="radius bg-red font-weight-bold p-base">py-lg</div>
    </div>
</div>`,
  ),
})
