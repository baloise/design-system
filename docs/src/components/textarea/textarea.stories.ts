import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsTextarea

const tag = 'ds-textarea'

const meta: Meta<Args> = {
  title: 'Components/Form/Textarea',
  args: {},
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-textarea ${props(args)}></ds-textarea>`),
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
<ds-textarea label="Label" description="Description" placeholder="Enter text here"></ds-textarea>
<ds-textarea label="Label" description="Description" placeholder="Enter text here" required="false"></ds-textarea>
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
    <textarea class="textarea" placeholder="Enter text here"></textarea>
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
<ds-textarea label="Label" description="Description" placeholder="Placeholder" disabled></ds-textarea>
<ds-textarea label="Label" description="Description" value="Value" disabled></ds-textarea>
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
    <textarea class="textarea" placeholder="Placeholder" disabled></textarea>
  </div>
  <p class="help">Description</p>
</div>
<div class="field is-disabled">
  <label class="label">Label</label>
  <div class="control">
    <textarea class="textarea" disabled>Value</textarea>
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
<ds-textarea label="Label" description="Description" invalid-text="Validation Error" invalid></ds-textarea>
<ds-textarea label="Label" description="Description" value="Value" invalid-text="Validation Error" invalid></ds-textarea>
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
    <textarea class="textarea"></textarea>
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
<ds-textarea label="Label" description="Description" color="success"></ds-textarea>
<ds-textarea label="Label" description="Description" value="Value" color="success"></ds-textarea>
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
    <textarea class="textarea">Value</textarea>
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
<ds-textarea label="Label" description="Description" color="warning"></ds-textarea>
<ds-textarea label="Label" description="Description" value="Value" color="warning"></ds-textarea>
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
    <textarea class="textarea">Value</textarea>
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
WarningHtml.storyName = '🌍 Warning'

export const Rows = Story({
  ...withRender(
    () => `
<ds-textarea label="Label" description="6 rows" rows="6"></ds-textarea>
<ds-textarea label="Label" description="2 rows" rows="2" value="Short text"></ds-textarea>
`,
  ),
})
Rows.storyName = '🧩 Rows'
