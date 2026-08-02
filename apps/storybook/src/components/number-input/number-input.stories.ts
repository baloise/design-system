import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsNumberInput

const tag = 'ds-number-input'

const meta: Meta<Args> = {
  title: 'Components/Forms/Number Input/Variants',
  args: {
    label: 'Age',
    placeholder: '42',
    description: 'Age is used to ....',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-number-input ${props(args)}></ds-number-input>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const Decimal = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="2 decimal places" decimal="2"></ds-number-input>
<ds-number-input label="Label" description="2 decimal places" decimal="2" value="1234.56"></ds-number-input>
`,
  ),
})
Decimal.storyName = '🧩 Decimal'

export const Suffix = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="With CHF suffix" suffix="CHF"></ds-number-input>
<ds-number-input label="Label" description="With CHF suffix" suffix="CHF" value="1234"></ds-number-input>
`,
  ),
})
Suffix.storyName = '🧩 Suffix'
