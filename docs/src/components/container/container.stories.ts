import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

type Args = Record<string, unknown>

const meta: Meta<Args> = {
  title: 'Components/Container/Variants',
  args: {},
  argTypes: {},
  ...withRender(
    () => `
<div class="container bg-purple-2 p-base">
  <p>Default container — constrained to <code>--ds-alias-container-width-base</code> on desktop.</p>
</div>
    `,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

/**
 * STORIES — Container Variants
 * ——————————————————————————————
 * Each story demonstrates a different max-width constraint for layout needs.
 */

export const Basic = Story({})
Basic.storyName = '🌍 Default'

export const Fluid = Story({
  ...withRender(
    () => `
<div class="container is-fluid bg-purple-2 p-base">
  <p>Fluid container — expands to <code>--ds-alias-container-width-fluid</code>.</p>
</div>
    `,
  ),
})
Fluid.storyName = '🌍 Fluid'

export const Compact = Story({
  ...withRender(
    () => `
<div class="container is-compact bg-purple-2 p-base">
  <p>Compact container — constrained to <code>--ds-alias-container-width-compact</code>.</p>
</div>
    `,
  ),
})
Compact.storyName = '🌍 Compact'
