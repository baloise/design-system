import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsNumberInput

const tag = 'ds-number-input'

const meta: Meta<Args> = {
  title: 'Components/Form/Number Input',
  args: {},
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

export const Basic = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="Description" placeholder="0"></ds-number-input>
<ds-number-input label="Label" description="Description" placeholder="0" required="false"></ds-number-input>
`,
  ),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    () => `
<div class="field">
  <label class="label">Label</label>
  <div class="control">
    <input class="input" type="text" placeholder="0" />
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Disabled = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="Description" placeholder="0" disabled></ds-number-input>
<ds-number-input label="Label" description="Description" value="1234" disabled></ds-number-input>
`,
  ),
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  ...withRender(
    () => `
<div class="field is-disabled">
  <label class="label">Label</label>
  <div class="control">
    <input class="input" type="text" placeholder="0" disabled />
  </div>
  <p class="help">Description</p>
</div>
<div class="field is-disabled">
  <label class="label">Label</label>
  <div class="control">
    <input class="input" type="text" value="1 234" disabled />
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="Description" invalid-text="Validation Error" invalid></ds-number-input>
<ds-number-input label="Label" description="Description" value="1234" invalid-text="Validation Error" invalid></ds-number-input>
`,
  ),
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  ...withRender(
    () => `
<div class="field is-danger">
  <label class="label">Label</label>
  <div class="control">
    <input class="input" type="text" />
  </div>
  <p class="help">Validation Error</p>
</div>
`,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'

export const Valid = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="Description" color="success"></ds-number-input>
<ds-number-input label="Label" description="Description" value="1234" color="success"></ds-number-input>
`,
  ),
})
Valid.storyName = '🧩 Valid'

export const ValidHtml = Story({
  ...withRender(
    () => `
<div class="field is-success">
  <label class="label">Label</label>
  <div class="control">
    <input class="input" type="text" value="1 234" />
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
ValidHtml.storyName = '🌍 Valid'

export const Warning = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="Description" color="warning"></ds-number-input>
<ds-number-input label="Label" description="Description" value="1234" color="warning"></ds-number-input>
`,
  ),
})
Warning.storyName = '🧩 Warning'

export const WarningHtml = Story({
  ...withRender(
    () => `
<div class="field is-warning">
  <label class="label">Label</label>
  <div class="control">
    <input class="input" type="text" value="1 234" />
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
WarningHtml.storyName = '🌍 Warning'

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
