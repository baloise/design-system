import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsHint

const tag = 'ds-hint'

const meta: Meta<Args> = {
  title: 'Components/Hint/Variants',
  args: {
    placement: 'right',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-hint' }),
  },
  ...withRender(
    ({ ...args }) => `
<ds-hint ${props(args)}>
  <ds-hint-title>Help</ds-hint-title>
  <ds-hint-text>This is helpful information.</ds-hint-text>
</ds-hint>
    `,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Hint = Story({
  ...withRender(
    ({ ...args }) => `
<ds-hint ${props(args)}>
  <ds-hint-title>Spider-Man</ds-hint-title>
  <ds-hint-text>Spider-Man is a superhero in Marvel Comics. He was created by writer Stan Lee and artist Steve Ditko.</ds-hint-text>
</ds-hint>
    `,
  ),
})
Hint.storyName = '🧩 Basic'

export const WithSlots = Story({
  ...withRender(
    ({ ...args }) => `
<ds-hint ${props(args)}>
  <span slot="title">What is a deductible?</span>
  <p>A deductible is the amount you pay out of pocket before your insurance covers the rest.</p>
</ds-hint>
    `,
  ),
})
WithSlots.storyName = '🧩 Raw Slots'

export const CustomTriggerLabel = Story({
  args: {
    triggerLabel: 'Learn more about this field',
  },
  ...withRender(
    ({ triggerLabel, ...args }) => `
<ds-hint ${props({ triggerLabel, ...args })}>
  <ds-hint-title>Custom label</ds-hint-title>
  <ds-hint-text>This trigger button has a custom accessible label.</ds-hint-text>
</ds-hint>
    `,
  ),
})
CustomTriggerLabel.storyName = '🧩 Custom Trigger Label'

export const PlacementTop = Story({
  args: {
    placement: 'top',
  },
  ...withRender(
    ({ placement, ...args }) => `
<div style="padding: 2rem 0">
  <ds-hint ${props({ placement, ...args })}>
    <ds-hint-title>Placed above</ds-hint-title>
    <ds-hint-text>The popup panel opens above the trigger on desktop viewports.</ds-hint-text>
  </ds-hint>
</div>
    `,
  ),
})
PlacementTop.storyName = '🧩 Placement: Top'

export const PlacementBottom = Story({
  args: {
    placement: 'bottom',
  },
  ...withRender(
    ({ placement, ...args }) => `
<ds-hint ${props({ placement, ...args })}>
  <ds-hint-title>Placed below</ds-hint-title>
  <ds-hint-text>The popup panel opens below the trigger on desktop viewports.</ds-hint-text>
</ds-hint>
    `,
  ),
})
PlacementBottom.storyName = '🧩 Placement: Bottom'

export const PlacementLeft = Story({
  args: {
    placement: 'left',
  },
  ...withRender(
    ({ placement, ...args }) => `
<div style="padding-left: 2rem">
  <ds-hint ${props({ placement, ...args })}>
    <ds-hint-title>Placed left</ds-hint-title>
    <ds-hint-text>The popup panel opens to the left of the trigger on desktop viewports.</ds-hint-text>
  </ds-hint>
</div>
    `,
  ),
})
PlacementLeft.storyName = '🧩 Placement: Left'

export const CustomCloseLabel = Story({
  args: {
    closeLabel: 'Got it',
  },
  ...withRender(
    ({ closeLabel, ...args }) => `
<ds-hint ${props({ closeLabel, ...args })}>
  <ds-hint-title>Custom close</ds-hint-title>
  <ds-hint-text>The close button inside the drawer shows a custom label on touch viewports.</ds-hint-text>
</ds-hint>
    `,
  ),
})
CustomCloseLabel.storyName = '🧩 Custom Close Label'

export const NoTitle = Story({
  ...withRender(
    ({ ...args }) => `
<ds-hint ${props(args)}>
  <ds-hint-text>Sometimes a title is not needed — just the explanation text is enough.</ds-hint-text>
</ds-hint>
    `,
  ),
})
NoTitle.storyName = '🧩 No Title'

export const Inline = Story({
  ...withRender(
    ({ ...args }) => `
<p style="line-height: 1.6">
  Your premium is calculated based on your risk profile
  <ds-hint ${props(args)}>
    <ds-hint-title>Risk profile</ds-hint-title>
    <ds-hint-text>Your risk profile combines age, driving history, and vehicle type to determine your premium.</ds-hint-text>
  </ds-hint>
  and the selected coverage options.
</p>
    `,
  ),
})
Inline.storyName = '🧩 Inline'
