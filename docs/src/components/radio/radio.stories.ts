import { BrandIconCarGreen } from '@baloise/ds-assets/dist'
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsRadio & { slot: string }

const tag = 'ds-radio'

const meta: Meta<Args> = {
  title: 'Components/Forms/Radio/Item',
  tags: ['!dev'],
  args: {
    slot: 'Hello World',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ slot, ...args }) => `
<ds-radio-group name="playground">
  <ds-radio ${props(args)}>${slot}</ds-radio>
</ds-radio-group>`,
  ),
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
<ds-radio-group name="basic" value="2">
  <ds-radio value="1">Option 1</ds-radio>
  <ds-radio value="2">Option 2</ds-radio>
  <ds-radio value="3">Option 3</ds-radio>
</ds-radio-group>`,
  ),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    () => `
<div class="radio-group">
  <label class="radio">
    <input type="radio" name="basic" value="1" />
    Option 1
  </label>
  <label class="radio">
    <input type="radio" name="basic" value="2" checked />
    Option 2
  </label>
  <label class="radio">
    <input type="radio" name="basic" value="3" />
    Option 3
  </label>
</div>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Disabled = Story({
  ...withRender(
    () => `
<ds-radio-group name="disabled" value="2" disabled label="Disabled" description="description">
  <ds-radio value="1">Option 1</ds-radio>
  <ds-radio value="2">Option 2</ds-radio>
  <ds-radio value="3">Option 3</ds-radio>
</ds-radio-group>`,
  ),
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  ...withRender(
    () => `
<div class="radio-group">
  <label class="radio is-disabled">
    <input type="radio" name="disabled" value="1" disabled />
    Option 1
  </label>
  <label class="radio is-disabled">
    <input type="radio" name="disabled" value="2" checked disabled />
    Option 2
  </label>
  <label class="radio is-disabled">
    <input type="radio" name="disabled" value="3" disabled />
    Option 3
  </label>
</div>`,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  ...withRender(
    () => `
<ds-radio-group name="invalid" invalid>
  <ds-radio value="1">Option 1</ds-radio>
  <ds-radio value="2">Option 2</ds-radio>
  <ds-radio value="3">Option 3</ds-radio>
</ds-radio-group>`,
  ),
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  ...withRender(
    () => `
<div class="radio-group">
  <label class="radio is-invalid">
    <input type="radio" name="invalid" value="1" aria-invalid="true" />
    Option 1
  </label>
  <label class="radio is-invalid">
    <input type="radio" name="invalid" value="2" checked aria-invalid="true" />
    Option 2
  </label>
  <label class="radio is-invalid">
    <input type="radio" name="invalid" value="3" aria-invalid="true" />
    Option 3
  </label>
</div>`,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'

export const Field = Story({
  ...withRender(
    () => `
<ds-radio-group name="field" label="Label" description="This username is available">
  <ds-radio value="1">Option 1</ds-radio>
  <ds-radio value="2">Option 2</ds-radio>
</ds-radio-group>`,
  ),
})
Field.storyName = '🧩 Field'

export const FieldHtml = Story({
  ...withRender(
    () => `
<fieldset class="field">
  <legend class="label">Label</legend>
  <div class="radio-group">
    <label class="radio">
      <input type="radio" name="field" value="1" aria-describedby="rb-help" />
      Option 1
    </label>
    <label class="radio">
      <input type="radio" name="field" value="2" aria-describedby="rb-help" />
      Option 2
    </label>
  </div>
  <p class="help" id="rb-help">This username is available</p>
</fieldset>`,
  ),
})
FieldHtml.storyName = '🌍 Field'

export const FieldVertical = Story({
  ...withRender(
    () => `
<ds-radio-group vertical name="heroes" label="Label" description="Choose one">
  <ds-radio value="steve-rogers">Steve Rogers</ds-radio>
  <ds-radio value="tony-stark">Tony Stark</ds-radio>
  <ds-radio value="black-widow">Black Widow</ds-radio>
</ds-radio-group>`,
  ),
})
FieldVertical.storyName = '🧩 Field Vertical'

export const FieldVerticalHtml = Story({
  ...withRender(
    () => `
<fieldset class="field">
  <legend class="label">Label</legend>
  <div class="radio-group is-vertical">
    <label class="radio">
      <input type="radio" name="heroes" value="steve-rogers" />
      Steve Rogers
    </label>
    <label class="radio">
      <input type="radio" name="heroes" value="tony-stark" />
      Tony Stark
    </label>
    <label class="radio">
      <input type="radio" name="heroes" value="black-widow" />
      Black Widow
    </label>
  </div>
  <p class="help">Choose one</p>
</fieldset>`,
  ),
})
FieldVerticalHtml.storyName = '🌍 Field Vertical'

export const Form = Story({
  ...withRender(
    () => `
<form>
  <ds-radio-group name="heroes" label="Choose a hero" description="Select your favourite" value="tony-stark">
    <ds-radio value="steve-rogers">Steve Rogers</ds-radio>
    <ds-radio value="tony-stark">Tony Stark</ds-radio>
    <ds-radio value="black-widow">Black Widow</ds-radio>
  </ds-radio-group>
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
  <label class="radio">
    <input type="radio" name="heroes" value="steve-rogers" />
    Steve Rogers
  </label>
  <label class="radio">
    <input type="radio" name="heroes" value="tony-stark" checked />
    Tony Stark
  </label>
  <label class="radio">
    <input type="radio" name="heroes" value="black-widow" />
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
<ds-radio-group name="tile-basic" label="Label" description="Description" tile value="2">
  <ds-radio value="1">Value 1</ds-radio>
  <ds-radio value="2">Value 2</ds-radio>
  <ds-radio value="3">Value 3</ds-radio>
</ds-radio-group>`,
  ),
})
TileBasic.storyName = '🧩 Tile Basic'

export const TileColumns = Story({
  ...withRender(
    () => `
<ds-radio-group name="tile-columns" label="Label" description="Description" tile tile-color="purple" cols="3" cols-tablet="2" value="2">
  <ds-radio value="1">Value 1</ds-radio>
  <ds-radio value="2">Value 2</ds-radio>
  <ds-radio value="3">Value 3</ds-radio>
</ds-radio-group>`,
  ),
})
TileColumns.storyName = '🧩 Tile Columns'

export const TileStack = Story({
  ...withRender(
    () => `
<ds-radio-group name="tile-stack" label="Label" description="Description" tile tile-color="green" value="2">
  <ds-radio value="1" label-position="left">
    <ds-stack direction="row">
      <ds-icon svg='${BrandIconCarGreen}' size="xl" color="auto"></ds-icon>
      <ds-content>
        <ds-label size="lg">Option 1</ds-label>
        <span>Description</span>
      </ds-content>
    </ds-stack>
  </ds-radio>
  <ds-radio value="2">
    <ds-stack direction="row">
      <ds-icon svg='${BrandIconCarGreen}' size="xl" color="auto"></ds-icon>
      <ds-content>
        <ds-label size="lg">Option 2</ds-label>
        <span>Description</span>
      </ds-content>
    </ds-stack>
  </ds-radio>
</ds-radio-group>`,
  ),
})
TileStack.storyName = '🧩 Tile Stack'

export const TileStackCentered = Story({
  ...withRender(
    () => `
<ds-radio-group label-position="top" name="tile-stack-centered" label="Label" description="Description" tile tile-color="green" value="2" cols="2">
  <ds-radio value="1">
    <ds-stack layout="vertical" align="center">
      <ds-icon svg='${BrandIconCarGreen}' size="2xl" color="auto"></ds-icon>
      <ds-content align="center">
        <ds-label size="xl">Option 1</ds-label>
      </ds-content>
    </ds-stack>
  </ds-radio>
  <ds-radio value="2">
    <ds-stack layout="vertical" align="center">
      <ds-icon svg='${BrandIconCarGreen}' size="2xl" color="auto"></ds-icon>
      <ds-content align="center">
        <ds-label size="xl">Option 2</ds-label>
      </ds-content>
    </ds-stack>
  </ds-radio>
</ds-radio-group>`,
  ),
})
TileStackCentered.storyName = '🧩 Tile Stack Centered'
