import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsInputStepper

const tag = 'ds-input-stepper'

const meta: Meta<Args> = {
  title: 'Components/InputStepper/Variants',
  args: {
    label: 'Quantity',
    value: 5,
    min: 0,
    max: 10,
    step: 1,
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-input-stepper ${props(args)}></ds-input-stepper>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const Invalid = Story({
  args: {
    label: 'Quantity',
    value: 5,
    invalid: true,
    invalidText: 'Value out of range',
  },
})
Invalid.storyName = '🧩 Invalid'

export const Disabled = Story({
  args: {
    label: 'Quantity',
    value: 5,
    disabled: true,
  },
})
Disabled.storyName = '🧩 Disabled'

export const Readonly = Story({
  args: {
    label: 'Quantity',
    value: 5,
    readonly: true,
  },
})
Readonly.storyName = '🧩 Readonly'

export const DecimalStep = Story({
  ...withRender(
    () => `
<ds-input-stepper label="Percentage" min="0" max="1" step="0.1" value="0.5" description="0.0–1.0 in steps of 0.1"></ds-input-stepper>
<ds-input-stepper label="Price" min="0" max="100" step="0.01" value="9.99" description="Currency in cents"></ds-input-stepper>
`,
  ),
})
DecimalStep.storyName = '🧩 Decimal Step'

export const MinMax = Story({
  args: {
    label: 'Temperature',
    min: -20,
    max: 40,
    value: 20,
    description: '-20°C to 40°C',
  },
})
MinMax.storyName = '🧩 Min / Max'

export const WithDescription = Story({
  args: {
    label: 'Adults',
    description: 'Maximum 9 per booking',
    value: 1,
    min: 1,
    max: 9,
  },
})
WithDescription.storyName = '🧩 With Description'
