import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsSteps

const meta: Meta<Args> = {
  title: 'Components/Steps/Variants',
  args: {
    vertical: false,
    label: '',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-steps' }),
  },
  ...withRender(
    args => `
<ds-steps ${props(args)}>
  <ds-step name="a" label="Cart"></ds-step>
  <ds-step name="b" label="Shipping"></ds-step>
  <ds-step name="c" label="Payment"></ds-step>
  <ds-step-panel for="a">Content A</ds-step-panel>
  <ds-step-panel for="b">Content B</ds-step-panel>
  <ds-step-panel for="c">Content C</ds-step-panel>
</ds-steps>`,
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

export const States = Story({
  ...withRender(
    () => `
<ds-steps value="c">
  <ds-step name="a" label="Done" done></ds-step>
  <ds-step name="b" label="Invalid" invalid></ds-step>
  <ds-step name="c" label="Active"></ds-step>
  <ds-step name="d" label="Disabled" disabled></ds-step>
  <ds-step-panel for="a">Content A</ds-step-panel>
  <ds-step-panel for="b">Content B</ds-step-panel>
  <ds-step-panel for="c">Content C</ds-step-panel>
  <ds-step-panel for="d">Content D</ds-step-panel>
</ds-steps>`,
  ),
})
States.storyName = '🧩 States'

export const Hidden = Story({
  ...withRender(
    () => `
<ds-steps>
  <ds-step name="a" label="Cart"></ds-step>
  <ds-step name="b" label="Hidden" hidden></ds-step>
  <ds-step name="c" label="Shipping"></ds-step>
  <ds-step name="d" label="Payment"></ds-step>
  <ds-step-panel for="a">Content A</ds-step-panel>
  <ds-step-panel for="b">Content B (hidden)</ds-step-panel>
  <ds-step-panel for="c">Content C</ds-step-panel>
  <ds-step-panel for="d">Content D</ds-step-panel>
</ds-steps>`,
  ),
})
Hidden.storyName = '🧩 Hidden Step'

export const Vertical = Story({
  args: { vertical: true },
  ...withRender(
    () => `
<ds-steps vertical>
  <ds-step name="a" label="Cart"></ds-step>
  <ds-step name="b" label="Shipping"></ds-step>
  <ds-step name="c" label="Payment"></ds-step>
  <ds-step-panel for="a">Content A</ds-step-panel>
  <ds-step-panel for="b">Content B</ds-step-panel>
  <ds-step-panel for="c">Content C</ds-step-panel>
</ds-steps>`,
  ),
})
Vertical.storyName = '🧩 Vertical'

export const Navigation = Story({
  ...withRender(
    () => `
<ds-steps label="Checkout steps">
  <ds-step name="first" label="Cart"><a href="#first" aria-current="step">Cart</a></ds-step>
  <ds-step name="second" label="Shipping"><a href="#second">Shipping</a></ds-step>
  <ds-step name="third" label="Payment"><a href="#third">Payment</a></ds-step>
</ds-steps>`,
  ),
})
Navigation.storyName = '🧩 Navigation'

export const NavigationVertical = Story({
  args: { vertical: true },
  ...withRender(
    () => `
<ds-steps label="Checkout steps" vertical>
  <ds-step name="first" label="Cart"><a href="#first" aria-current="step">Cart</a></ds-step>
  <ds-step name="second" label="Shipping"><a href="#second">Shipping</a></ds-step>
  <ds-step name="third" label="Payment"><a href="#third">Payment</a></ds-step>
</ds-steps>`,
  ),
})
NavigationVertical.storyName = '🧩 Navigation Vertical'

export const ColorVariants = Story({
  ...withRender(
    () => `
<ds-steps color="purple">
  <ds-step name="a" label="Cart" done></ds-step>
  <ds-step name="b" label="Shipping"></ds-step>
  <ds-step name="c" label="Payment" disabled></ds-step>
  <ds-step-panel for="a">Content A</ds-step-panel>
  <ds-step-panel for="b">Content B</ds-step-panel>
  <ds-step-panel for="c">Content C</ds-step-panel>
</ds-steps>`,
  ),
})
ColorVariants.storyName = '🧩 Color Variants'
