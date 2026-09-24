import type { JSX } from '@helvetia-design/core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../../utils'

type Args = JSX.DsSheet & { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Overlays/Sheet/Variants',
  args: {
    slot: `
    <!-- Mobile Variant -->
    <div class="ds-stack tablet:hidden">
      <div class="ds-stack-content">
        <h3 class="ds-title is-4">CHF 460.60 per year</h3>
        <p class="text-sm">incl. statutory charges</p>
      </div>
      <div class="ds-buttons">
        <button class="ds-button is-secondary is-square" aria-label="back"><ds-icon name="caret-left"></ds-icon></button>
        <button class="ds-button">Select offer</button>
      </div>
    </div>
    <!-- Desktop Variant -->
    <div class="ds-stack as-row mobile:hidden">
      <div class="ds-stack-content">
        <h3 class="ds-title">CHF 460.60 per year</h3>
        <p class="text-sm">incl. statutory charges</p>
      </div>
      <div class="ds-buttons fit-content">
        <button class="ds-button is-secondary">back</button>
        <button class="ds-button">Select offer</button>
      </div>
    </div>`,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-sheet' }),
  },
  ...withRender(({ slot, ...args }) => `<ds-sheet ${props(args)}>${slot}</ds-sheet>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(({ slot, ...args }) => `<ds-sheet style="position:relative" ${props(args)}>${slot}</ds-sheet>`),
})
Basic.storyName = '🧩 Basic'
