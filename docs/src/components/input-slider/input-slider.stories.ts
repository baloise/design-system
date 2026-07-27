import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsInputSlider

const tag = 'ds-input-slider'

const meta: Meta<Args> = {
  title: 'Components/InputSlider/Variants',
  args: {
    label: 'Volume',
    description: '0–100',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-input-slider ${props(args)}></ds-input-slider>`),
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
    label: 'Label',
    invalid: true,
    invalidText: 'Out of range',
  },
})
Invalid.storyName = '🧩 Invalid'

export const Disabled = Story({
  args: {
    label: 'Label',
    value: 50,
    disabled: true,
  },
})
Disabled.storyName = '🧩 Disabled'

export const Step = Story({
  ...withRender(
    () => `
<ds-input-slider label="Step 10" min="0" max="100" step="10"></ds-input-slider>
<ds-input-slider label="Continuous" min="0" max="1" step="any"></ds-input-slider>
`,
  ),
})
Step.storyName = '🧩 Step'

export const MinMax = Story({
  args: {
    label: 'Range -50 to 50',
    min: -50,
    max: 50,
    value: 0,
  },
})
MinMax.storyName = '🧩 Min/Max'
