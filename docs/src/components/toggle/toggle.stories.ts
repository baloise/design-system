import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsToggle & { slot: string }

const tag = 'ds-toggle'

const meta: Meta<Args> = {
  title: 'Components/Forms/Toggle/Variants',
  args: {
    slot: 'Toggle me',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ slot, ...args }) => `<ds-toggle ${props(args)}>${slot}</ds-toggle>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    () => `
<label class="toggle">
  <input type="checkbox" />
  Toggle me
</label>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Disabled = Story({
  args: {
    disabled: true,
  },
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  ...withRender(
    () => `
<label class="toggle is-disabled">
  <input type="checkbox" disabled />
  Unchecked
</label>`,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  args: {
    invalid: true,
  },
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  ...withRender(
    () => `
<label class="toggle is-invalid">
  <input type="checkbox" aria-invalid="true" />
  Unchecked
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
