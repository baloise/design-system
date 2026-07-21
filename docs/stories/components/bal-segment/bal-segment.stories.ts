import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalSegment

const meta: Meta<Args> = {
  title: 'Components/Form/Segment',
  args: {
    value: 'yes',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-segment' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-segment ${props(args)}>
  <bal-segment-item value="yes" label="Yes"></bal-segment-item>
  <bal-segment-item value="no" label="No"></bal-segment-item>
</bal-segment>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Vertical = Story({
  ...withRender(
    () => `
<bal-segment vertical value="10000">
  <bal-segment-item value="7000" label="max. 7’000 km">entspricht rund 186 km pro Woche</bal-segment-item>
  <bal-segment-item value="10000" label="max. 10’000 km">entspricht rund 186 km pro Woche</bal-segment-item>
  <bal-segment-item value="15000" label="max. 15’000 km">entspricht rund 186 km pro Woche</bal-segment-item>
  <bal-segment-item value="20000" label="max. 20’000 km">entspricht rund 186 km pro Woche</bal-segment-item>
  <bal-segment-item value="21000" label="mehr als 20’000 km"
    >entspricht rund 186 km pro Woche</bal-segment-item
  >
</bal-segment>`,
  ),
})

export const Expanded = Story({
  args: {
    expanded: true,
  },
})
