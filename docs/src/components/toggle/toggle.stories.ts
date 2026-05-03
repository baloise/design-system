import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX.DsToggle & { content: string }

const tag = 'ds-toggle'

const meta: Meta<Args> = {
  title: 'Components/Forms/Toggle',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(({ content, ...args }) => `<ds-toggle ${props(args)}>${content}</ds-toggle>`),
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
<ds-toggle name="basic" value="1">Unchecked</ds-toggle>
<ds-toggle name="basic" value="2" checked>Checked</ds-toggle>`,
  ),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    () => `
<label class="toggle">
  <input type="checkbox" />
  Unchecked
</label>
<label class="toggle">
  <input type="checkbox" checked />
  Checked
</label>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Disabled = Story({
  ...withRender(
    () => `
<ds-toggle name="disabled" value="1" disabled>Unchecked</ds-toggle>
<ds-toggle name="disabled" value="2" disabled checked>Checked</ds-toggle>`,
  ),
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  ...withRender(
    () => `
<label class="toggle is-disabled">
  <input type="checkbox" disabled />
  Unchecked
</label>
<label class="toggle is-disabled">
  <input type="checkbox" checked disabled />
  Checked
</label>`,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  ...withRender(
    () => `
<ds-toggle name="invalid" value="1" invalid>Unchecked</ds-toggle>
<ds-toggle name="invalid" value="2" invalid checked>Checked</ds-toggle>`,
  ),
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  ...withRender(
    () => `
<label class="toggle is-invalid">
  <input type="checkbox" aria-invalid="true" />
  Unchecked
</label>
<label class="toggle is-invalid">
  <input type="checkbox" checked aria-invalid="true" />
  Checked
</label>`,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'

export const Field = Story({
  ...withRender(
    () => `
<fieldset class="field">
  <legend class="label">Label</legend>
  <ds-toggle name="agreement" value="accepted" aria-describedby="toggle-help">Accept terms and conditions</ds-toggle>
  <p class="help" id="toggle-help">Required to proceed</p>
</fieldset>`,
  ),
})
Field.storyName = '🧩 Field'

export const FieldHtml = Story({
  ...withRender(
    () => `
<fieldset class="field">
  <legend class="label">Label</legend>
  <label class="toggle">
    <input type="checkbox" aria-describedby="toggle-help" />
    Accept terms and conditions
  </label>
  <p class="help" id="toggle-help">Required to proceed</p>
</fieldset>`,
  ),
})
FieldHtml.storyName = '🌍 Field'

export const Form = Story({
  ...withRender(
    () => `
<form>
  <ds-toggle name="terms" value="accepted">Accept terms and conditions</ds-toggle>
  <br /><br />
  <ds-button element-type="submit" color="primary">Submit</ds-button>
  <ds-button element-type="reset" color="link">Reset</ds-button>
</form>`,
  ),
})
Form.storyName = '🧩 Form'

export const FormHtml = Story({
  ...withRender(
    () => `
<form>
  <label class="toggle">
    <input type="checkbox" name="terms" value="accepted" />
    Accept terms and conditions
  </label>
  <br /><br />
  <button type="submit" class="button is-primary">Submit</button>
  <button type="reset" class="button is-link">Reset</button>
</form>`,
  ),
})
FormHtml.storyName = '🌍 Form'
