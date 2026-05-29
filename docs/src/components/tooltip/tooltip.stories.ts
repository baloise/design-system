import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsTooltip & { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Tooltip/Variants',
  args: {
    slot: 'Tooltip content',
    reference: 'tooltip-basic',
    placement: 'bottom',
    open: true,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-tooltip' }),
  },
  ...withRender(
    ({ slot, ...args }) => `
<div class="flex justify-content-center align-items-center p-lg">
  <button class="button" id="tooltip-basic" type="button">Hover over me</button>
  <ds-tooltip ${props(args)}>${slot}</ds-tooltip>
</div>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const PlacementTop = Story({
  args: { placement: 'top', slot: 'Tooltip top', reference: 'tooltip-placement-top' },
  ...withRender(
    ({ slot, ...args }) => `
<div class="flex justify-content-center align-items-center p-lg">
  <button class="button" id="tooltip-placement-top" type="button">Trigger</button>
  <ds-tooltip ${props(args)}>${slot}</ds-tooltip>
</div>`,
  ),
})
PlacementTop.storyName = '🧩 Placement Top'

export const PlacementRight = Story({
  args: { placement: 'right', slot: 'Tooltip right', reference: 'tooltip-placement-right' },
  ...withRender(
    ({ slot, ...args }) => `
<div class="flex justify-content-center align-items-center p-lg">
  <button class="button" id="tooltip-placement-right" type="button">Trigger</button>
  <ds-tooltip ${props(args)}>${slot}</ds-tooltip>
</div>`,
  ),
})
PlacementRight.storyName = '🧩 Placement Right'

export const PlacementBottom = Story({
  args: { placement: 'bottom', slot: 'Tooltip bottom', reference: 'tooltip-placement-bottom' },
  ...withRender(
    ({ slot, ...args }) => `
<div class="flex justify-content-center align-items-center p-lg">
  <button class="button" id="tooltip-placement-bottom" type="button">Trigger</button>
  <ds-tooltip ${props(args)}>${slot}</ds-tooltip>
</div>`,
  ),
})
PlacementBottom.storyName = '🧩 Placement Bottom'

export const PlacementLeft = Story({
  args: { placement: 'left', slot: 'Tooltip left', reference: 'tooltip-placement-left' },
  ...withRender(
    ({ slot, ...args }) => `
<div class="flex justify-content-center align-items-center p-lg">
  <button class="button" id="tooltip-placement-left" type="button">Trigger</button>
  <ds-tooltip ${props(args)}>${slot}</ds-tooltip>
</div>`,
  ),
})
PlacementLeft.storyName = '🧩 Placement Left'

export const ContentWidth = Story({
  args: {
    contentWidth: 200,
    slot: 'Long tooltip content that wraps to multiple lines when constrained.',
    reference: 'tooltip-content-width',
  },
  ...withRender(
    ({ slot, ...args }) => `
<div class="flex justify-content-center align-items-center p-xl">
  <button class="button" id="tooltip-content-width" type="button">Trigger</button>
  <ds-tooltip ${props(args)}>${slot}</ds-tooltip>
</div>`,
  ),
})
ContentWidth.storyName = '🧩 Content Width'
