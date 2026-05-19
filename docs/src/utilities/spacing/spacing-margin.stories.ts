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
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-large">
  <div class="bg-red-2">
      <div class="mt-normal bg-green p-large">mt-normal</div>
  </div>
  <div class="bg-red-2">
      <div class="mr-large bg-green p-large">mr-large</div>
  </div>
  <div class="bg-red-2">
      <div class="mb-small bg-green p-large">mb-small</div>
  </div>
  <div class="bg-red-2">
      <div class="ml-medium bg-green p-large">ml-medium</div>
  </div>
</div>`,
  ),
})
export const HorizontalMargin = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-large">
    <div class="bg-red-2 radius">
        <div class="mx-large radius bg-green font-weight-bold p-normal">mx-large</div>
    </div>
</div>`,
  ),
})
export const VerticalMargin = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center gap-large">
    <div class="bg-red-2 radius">
        <div class="my-large radius bg-green font-weight-bold p-normal">my-large</div>
    </div>
</div>`,
  ),
})
