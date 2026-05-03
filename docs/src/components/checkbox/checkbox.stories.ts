import { BrandIconCarGreen } from '@baloise/ds-assets/dist'
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX.DsCheckbox & { content: string }

const tag = 'ds-checkbox'

const meta: Meta<Args> = {
  title: 'Components/Forms/Checkbox',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(({ content, ...args }) => `<ds-checkbox ${props(args)}>${content}</ds-checkbox>`),
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
<ds-checkbox name="basic" value="1">Unchecked</ds-checkbox>
<ds-checkbox name="basic" value="2" checked>Checked</ds-checkbox>`,
  ),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    () => `
<label class="checkbox">
  <input type="checkbox" />
  Unchecked
</label>
<label class="checkbox">
  <input type="checkbox" checked />
  Checked
</label>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Disabled = Story({
  ...withRender(
    () => `
<ds-checkbox name="disabled" value="1" disabled>Unchecked</ds-checkbox>
<ds-checkbox name="disabled" value="2" disabled checked>Checked</ds-checkbox>`,
  ),
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  ...withRender(
    () => `
<label class="checkbox is-disabled">
  <input type="checkbox" disabled />
  Unchecked
</label>
<label class="checkbox is-disabled">
  <input type="checkbox" checked disabled />
  Checked
</label>`,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  ...withRender(
    () => `
<ds-checkbox name="invalid" value="1" invalid>Unchecked</ds-checkbox>
<ds-checkbox name="invalid" value="2" invalid checked>Checked</ds-checkbox>`,
  ),
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  ...withRender(
    () => `
<label class="checkbox is-invalid">
  <input type="checkbox" aria-invalid="true" />
  Unchecked
</label>
<label class="checkbox is-invalid">
  <input type="checkbox" checked aria-invalid="true" />
  Checked
</label>`,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'

export const Field = Story({
  ...withRender(
    () => `
<ds-checkbox-group control label="Label" description="This username is available">
  <ds-checkbox name="field" value="1">Checkbox 1</ds-checkbox>
  <ds-checkbox name="field" value="2">Checkbox 2</ds-checkbox>
</ds-checkbox-group>`,
  ),
})
Field.storyName = '🧩 Field'

export const FieldHtml = Story({
  ...withRender(
    () => `
<fieldset class="field">
  <legend class="label">Label</legend>
  <div class="checkbox-group">
    <label class="checkbox">
      <input type="checkbox" aria-describedby="cb-help" value="1" name="field" />
      Checkbox 1
    </label>
    <label class="checkbox">
      <input type="checkbox" aria-describedby="cb-help" value="2" name="field" />
      Checkbox 2
    </label>
  </div>
  <p class="help" id="cb-help">This username is available</p>
</fieldset>`,
  ),
})
FieldHtml.storyName = '🌍 Field'

export const FieldVertical = Story({
  ...withRender(
    () => `
<ds-checkbox-group control vertical label="Label" description="Choose all that apply">
  <ds-checkbox value="steve-rogers">Steve Rogers</ds-checkbox>
  <ds-checkbox value="tony-stark">Tony Stark</ds-checkbox>
  <ds-checkbox value="black-widow">Black Widow</ds-checkbox>
</ds-checkbox-group>`,
  ),
})
FieldVertical.storyName = '🧩 Field Vertical'

export const FieldVerticalHtml = Story({
  ...withRender(
    () => `
<fieldset class="field">
  <legend class="label">Label</legend>
  <div class="checkbox-group is-vertical">
    <label class="checkbox">
      <input type="checkbox" name="heroes" value="steve-rogers" />
      Steve Rogers
    </label>
    <label class="checkbox">
      <input type="checkbox" name="heroes" value="tony-stark" />
      Tony Stark
    </label>
    <label class="checkbox">
      <input type="checkbox" name="heroes" value="black-widow" />
      Black Widow
    </label>
  </div>
  <p class="help">Choose all that apply</p>
</fieldset>`,
  ),
})
FieldVerticalHtml.storyName = '🌍 Field Vertical'

export const Form = Story({
  ...withRender(
    () => `
<form>
  <ds-checkbox-group control name="heroes" label="Choose heroes" description="Select your favourites" value='["tony-stark"]'>
    <ds-checkbox value="steve-rogers">Steve Rogers</ds-checkbox>
    <ds-checkbox value="tony-stark">Tony Stark</ds-checkbox>
    <ds-checkbox value="black-widow">Black Widow</ds-checkbox>
  </ds-checkbox-group>
  <br />
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
  <label class="checkbox">
    <input type="checkbox" name="heroes" value="steve-rogers" />
    Steve Rogers
  </label>
  <label class="checkbox">
    <input type="checkbox" name="heroes" value="tony-stark" checked />
    Tony Stark
  </label>
  <label class="checkbox">
    <input type="checkbox" name="heroes" value="black-widow" />
    Black Widow
  </label>
  <br /><br />
  <button type="submit" class="button is-primary">Submit</button>
  <button type="reset" class="button is-link">Reset</button>
</form>`,
  ),
})
FormHtml.storyName = '🌍 Form'

export const TileBasic = Story({
  ...withRender(
    () => `
<ds-checkbox-group control label="Label" description="Description" tile value="2">
  <ds-checkbox name="tile-basic" value="1">Value 1</ds-checkbox>
  <ds-checkbox name="tile-basic" value="2">Value 2</ds-checkbox>
  <ds-checkbox name="tile-basic" value="3">Value 3</ds-checkbox>
</ds-checkbox-group>`,
  ),
})
TileBasic.storyName = '🧩 Tile Basic'

export const TileColumns = Story({
  ...withRender(
    () => `
<ds-checkbox-group control label="Label" description="Description" tile tile-color="purple" cols="3" cols-tablet="2" value="2">
  <ds-checkbox name="tile-columns" value="1">Value 1</ds-checkbox>
  <ds-checkbox name="tile-columns" value="2">Value 2</ds-checkbox>
  <ds-checkbox name="tile-columns" value="3">Value 3</ds-checkbox>
</ds-checkbox-group>`,
  ),
})
TileColumns.storyName = '🧩 Tile Columns'

export const TileStack = Story({
  ...withRender(
    () => `
<ds-checkbox-group control label="Label" description="Description" tile tile-color="green" value="2">
  <ds-checkbox name="tile-stack" value="1" label-position="left">
    <ds-stack direction="row">
      <ds-icon svg='${BrandIconCarGreen}' size="xl" color="auto"></ds-icon>
      <ds-content>
        <ds-label size="lg">Option 1</ds-label>
        <span>Description</span>
      </ds-content>
    </ds-stack>
  </ds-checkbox>
  <ds-checkbox name="tile-stack" value="2">
    <ds-stack direction="row">
      <ds-icon svg='${BrandIconCarGreen}' size="xl" color="auto"></ds-icon>
      <ds-content>
        <ds-label size="lg">Option 2</ds-label>
        <span>Description</span>
      </ds-content>
    </ds-stack>
  </ds-checkbox>
</ds-checkbox-group>`,
  ),
})
TileStack.storyName = '🧩 Tile Stack'

export const TileStackCentered = Story({
  ...withRender(
    () => `
<ds-checkbox-group control label-position="top" label="Label" description="Description" tile tile-color="green" value="2" cols="2">
  <ds-checkbox name="tile-stack-centered" value="1">
    <ds-stack layout="vertical" align="center">
      <ds-icon svg='${BrandIconCarGreen}' size="2xl" color="auto"></ds-icon>
      <ds-content align="center">
        <ds-label size="xl">Option 1</ds-label>
      </ds-content>
    </ds-stack>
  </ds-checkbox>
  <ds-checkbox name="tile-stack-centered" value="2">
    <ds-stack layout="vertical" align="center">
      <ds-icon svg='${BrandIconCarGreen}' size="2xl" color="auto"></ds-icon>
      <ds-content align="center">
        <ds-label size="xl">Option 2</ds-label>
      </ds-content>
    </ds-stack>
  </ds-checkbox>
</ds-checkbox-group>`,
  ),
})
TileStackCentered.storyName = '🧩 Tile Stack Centered'
