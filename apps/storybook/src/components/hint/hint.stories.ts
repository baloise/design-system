import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsHint

const tag = 'ds-hint'

const meta: Meta<Args> = {
  title: 'Components/Hint/Variants',
  args: {
    placement: 'right',
    label: 'Help',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ label, ...args }) => `
<ds-hint label="${label}" ${props(args)}>
  This is helpful information.
</ds-hint>
    `,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Hint = Story({
  args: {
    label: 'Spider-Man',
  },
  ...withRender(
    ({ label, ...args }) => `
<ds-hint label="${label}" ${props(args)}>
  Spider-Man is a superhero in Marvel Comics. He was created by writer Stan Lee and artist Steve Ditko.
</ds-hint>
    `,
  ),
})
Hint.storyName = '🧩 Basic'

export const WithCustomStyling = Story({
  args: {
    label: '',
  },
  ...withRender(
    ({ ...args }) => `
<ds-hint ${props(args)}>
  <span slot="title">What is a deductible?</span>
  <p style="font-size: 0.875rem">A deductible is the amount you pay out of pocket before your insurance covers the rest.</p>
</ds-hint>
    `,
  ),
})
WithCustomStyling.storyName = '🧩 Raw Slots'

export const CustomTriggerLabel = Story({
  args: {
    label: 'Custom label',
    triggerLabel: 'Learn more about this field',
  },
  ...withRender(
    ({ label, triggerLabel, ...args }) => `
<ds-hint label="${label}" triggerLabel="${triggerLabel}" ${props(args)}>
  This trigger button has a custom accessible label.
</ds-hint>
    `,
  ),
})
CustomTriggerLabel.storyName = '🧩 Custom Trigger Label'

export const PlacementTop = Story({
  args: {
    label: 'Placed above',
    placement: 'top',
  },
  ...withRender(
    ({ label, placement, ...args }) => `
<div style="padding: 2rem 0">
  <ds-hint label="${label}" placement="${placement}" ${props(args)}>
    The popup panel opens above the trigger on desktop viewports.
  </ds-hint>
</div>
    `,
  ),
})
PlacementTop.storyName = '🧩 Placement: Top'

export const PlacementBottom = Story({
  args: {
    label: 'Placed below',
    placement: 'bottom',
  },
  ...withRender(
    ({ label, placement, ...args }) => `
<ds-hint label="${label}" placement="${placement}" ${props(args)}>
  The popup panel opens below the trigger on desktop viewports.
</ds-hint>
    `,
  ),
})
PlacementBottom.storyName = '🧩 Placement: Bottom'

export const PlacementLeft = Story({
  args: {
    label: 'Placed left',
    placement: 'left',
  },
  ...withRender(
    ({ label, placement, ...args }) => `
<div style="padding-left: 2rem">
  <ds-hint label="${label}" placement="${placement}" ${props(args)}>
    The popup panel opens to the left of the trigger on desktop viewports.
  </ds-hint>
</div>
    `,
  ),
})
PlacementLeft.storyName = '🧩 Placement: Left'

export const CustomCloseLabel = Story({
  args: {
    label: 'Custom close',
    closeLabel: 'Got it',
  },
  ...withRender(
    ({ label, closeLabel, ...args }) => `
<ds-hint label="${label}" closeLabel="${closeLabel}" ${props(args)}>
  The close button inside the drawer shows a custom label on touch viewports.
</ds-hint>
    `,
  ),
})
CustomCloseLabel.storyName = '🧩 Custom Close Label'

export const Inline = Story({
  args: {
    label: 'Risk profile',
  },
  ...withRender(
    ({ label, ...args }) => `
<p style="line-height: 1.6">
  Your premium is calculated based on your risk profile
  <ds-hint label="${label}" ${props(args)}>
    Your risk profile combines age, driving history, and vehicle type to determine your premium.
  </ds-hint>
  and the selected coverage options.
</p>
    `,
  ),
})
Inline.storyName = '🧩 Inline'

export const MigrationSubcomponents = Story({
  args: {
    label: undefined,
  },
  ...withRender(
    ({ label, ...args }) => `
<ds-hint label="${label}" ${props(args)}>
  <ds-hint-title>Spider-Man (legacy)</ds-hint-title>
  <ds-hint-text>This uses deprecated sub-components and will be removed in a future version.</ds-hint-text>
</ds-hint>
    `,
  ),
})
MigrationSubcomponents.storyName = '⚠️ Migration: Legacy Sub-components (v2.0)'

export const MigrationSlots = Story({
  args: {
    label: undefined,
  },
  ...withRender(
    ({ label, ...args }) => `
<ds-hint ${props(args)}>
  <span slot="title">Spider-Man (legacy)</span>
  <ds-hint-text>This uses deprecated slot structure and will be removed in a future version.</ds-hint-text>
</ds-hint>
    `,
  ),
})
MigrationSlots.storyName = '⚠️ Migration: Legacy Slots (v2.0)'
