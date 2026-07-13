import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Layout/Placement',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Examples = Story({
  ...withRender(
    () => `<div class="flex flex-wrap gap-normal align-items-center justify-content-center">
    <div class="relative bg-green-2 w-9rem h-9rem mx-3 my-3 md:my-0 radius">
        <div class="absolute top-0 left-0 bg-green flex align-items-center justify-content-center w-4rem h-4rem radius">1</div>
    </div>
    <div class="relative bg-green-2 w-9rem h-9rem mx-3 my-3 md:my-0 radius">
        <div class="absolute top-0 right-0 bg-green flex align-items-center justify-content-center w-4rem h-4rem radius">2</div>
    </div>
    <div class="relative bg-green-2 w-9rem h-9rem mx-3 my-3 md:my-0 radius">
        <div class="absolute bottom-0 right-0 bg-green flex align-items-center justify-content-center w-4rem h-4rem radius">3</div>
    </div>
    <div class="relative bg-green-2 w-9rem h-9rem mx-3 my-3 md:my-0 radius">
        <div class="absolute bottom-0 left-0 bg-green flex align-items-center justify-content-center w-4rem h-4rem radius">4</div>
    </div>
</div>`,
  ),
})
