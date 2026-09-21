import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Elevation/Shadow',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const BoxShadow = Story({
  ...withRender(
    () => `<div class="flex align-items-center justify-content-center gap-2xl">
    <div class="shadow flex align-items-center justify-content-center bg-red radius p-base">shadow</div>
    <div class="shadow-elevated flex align-items-center justify-content-center bg-red radius p-base">shadow-elevated</div>
</div>`,
  ),
})
export const TextShadow = Story({
  ...withRender(
    () => `<div class="flex gap-base flex-wrap">
    <div class="flex-1 p-lg radius" style="background: linear-gradient(135deg, var(--ds-global-color-primary-6), var(--ds-global-color-info-3), var(--ds-global-color-success-5)); min-width: 12rem;">
      <p class="text-on-primary text-shadow mb-none">With text-shadow</p>
    </div>
    <div class="flex-1 p-lg radius" style="background: linear-gradient(135deg, var(--ds-global-color-primary-6), var(--ds-global-color-info-3), var(--ds-global-color-success-5)); min-width: 12rem;">
      <p class="text-on-primary mb-none">Without text-shadow</p>
    </div>
</div>`,
  ),
})
export const PseudoStates = Story({
  ...withRender(
    () => `<div class="bg-red-3 hover:shadow active:shadow-elevated cursor-pointer">
  <p class="p-base">Hover and click me!</p>
</div>`,
  ),
})
