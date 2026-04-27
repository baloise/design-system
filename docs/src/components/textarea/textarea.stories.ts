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
  <label class="label" for="textarea-basic">Label</label>
  <div class="control">
    <textarea id="textarea-basic" class="textarea" placeholder="Enter text here" aria-describedby="help-basic"></textarea>
  </div>
  <p id="help-basic" class="help">Description</p>
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
  <label class="label" for="textarea-disabled-1">Label</label>
  <div class="control">
    <textarea id="textarea-disabled-1" class="textarea" placeholder="Placeholder" disabled aria-describedby="help-disabled-1"></textarea>
  </div>
  <p id="help-disabled-1" class="help">Description</p>
</div>
<div class="field is-disabled">
  <label class="label" for="textarea-disabled-2">Label</label>
  <div class="control">
    <textarea id="textarea-disabled-2" class="textarea" disabled aria-describedby="help-disabled-2">Value</textarea>
  </div>
  <p id="help-disabled-2" class="help">Description</p>
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
  <label class="label" for="textarea-invalid">Label</label>
  <div class="control">
    <textarea id="textarea-invalid" class="textarea" aria-invalid="true" aria-describedby="help-invalid"></textarea>
  </div>
  <p id="help-invalid" class="help">Validation Error</p>
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
  <label class="label" for="textarea-valid">Label</label>
  <div class="control">
    <textarea id="textarea-valid" class="textarea" aria-describedby="help-valid">Value</textarea>
  </div>
  <p id="help-valid" class="help">Description</p>
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
  <label class="label" for="textarea-warning">Label</label>
  <div class="control">
    <textarea id="textarea-warning" class="textarea" aria-describedby="help-warning">Value</textarea>
  </div>
  <p id="help-warning" class="help">Description</p>
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
