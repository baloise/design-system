import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Spacing/Margin',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const SingleSideMargin = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-lg">
  <div class="bg-red-2">
      <div class="mt-base bg-red p-lg">mt-base</div>
  </div>
  <div class="bg-red-2">
      <div class="mr-lg bg-red p-lg">mr-lg</div>
  </div>
  <div class="bg-red-2">
      <div class="mb-sm bg-red p-lg">mb-sm</div>
  </div>
  <div class="bg-red-2">
      <div class="ml-md bg-red p-lg">ml-md</div>
  </div>
</div>`,
  ),
})
export const HorizontalMargin = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-lg">
    <div class="bg-red-2 radius">
        <div class="mx-lg radius bg-red font-weight-bold p-base">mx-lg</div>
    </div>
</div>`,
  ),
})
export const VerticalMargin = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-lg">
    <div class="bg-red-2 radius">
        <div class="my-lg radius bg-red font-weight-bold p-base">my-lg</div>
    </div>
</div>`,
  ),
})
