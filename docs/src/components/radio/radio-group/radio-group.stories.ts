import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { BrandIconCarGreen } from '@baloise/ds-assets/dist'
import { lorem1, props, StoryFactory, withComponentControls, withRender } from '../../../utils'

type Args = JSX.DsRadioGroup

const meta: Meta<Args> = {
  title: 'Components/Forms/Radio/Variants',
  args: {
    value: 'Strawberry',
    label: 'Fruits',
    description: 'Choose your favorite fruit',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-checkbox-group' }),
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-radio-group ${props(args)}>
    <ds-radio value="Apple">Apple</ds-radio>
    <ds-radio value="Strawberry">Strawberry</ds-radio>
    <ds-radio value="Banana">Banana</ds-radio>
  </ds-radio-group>`,
  ),
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
    ({ label, description }) => `
<fieldset class="field">
  <legend class="label">${label}</legend>
  <div class="radio-group">
    <label class="radio">
      <input type="radio" name="basic" value="Apple" aria-describedby="rb-help"/>
      Apple
    </label>
    <label class="radio">
      <input type="radio" name="basic" value="Strawberry" checked aria-describedby="rb-help" />
      Strawberry
    </label>
    <label class="radio">
      <input type="radio" name="basic" value="Banana" aria-describedby="rb-help"/>
      Banana
    </label>
  </div>
  <p class="help" id="rb-help">${description}</p>
</fieldset>  `,
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
    ({ label, description }) => `
<fieldset class="field is-disabled">
  <legend class="label">${label}</legend>
  <div class="radio-group">
    <label class="radio is-disabled">
      <input disabled type="radio" name="basic" value="Apple" aria-describedby="rb-help"/>
      Apple
    </label>
    <label class="radio is-disabled">
      <input disabled type="radio" name="basic" value="Strawberry" checked aria-describedby="rb-help" />
      Strawberry
    </label>
    <label class="radio is-disabled">
      <input disabled type="radio" name="basic" value="Banana" aria-describedby="rb-help"/>
      Banana
    </label>
  </div>
  <p class="help" id="rb-help">${description}</p>
</fieldset>  `,
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
    ({ label, description }) => `
<fieldset class="field is-invalid">
  <legend class="label">${label}</legend>
  <div class="radio-group">
    <label class="radio is-invalid">
      <input type="radio" name="basic" aria-invalid="true" value="Apple" aria-describedby="rb-help"/>
      Apple
    </label>
    <label class="radio is-invalid">
      <input type="radio" name="basic" aria-invalid="true" value="Strawberry" checked aria-describedby="rb-help" />
      Strawberry
    </label>
    <label class="radio is-invalid">
      <input type="radio" name="basic" aria-invalid="true" value="Banana" aria-describedby="rb-help"/>
      Banana
    </label>
  </div>
  <p class="help" id="rb-help">${description}</p>
</fieldset>  `,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'

export const FieldVertical = Story({
  args: { vertical: true },
})
FieldVertical.storyName = '🧩 Field Vertical'

export const FieldVerticalHtml = Story({
  ...withRender(
    ({ label, description }) => `
<fieldset class="field">
  <legend class="label">${label}</legend>
  <div class="radio-group is-vertical">
    <label class="radio">
      <input type="radio" name="basic" value="Apple" aria-describedby="rb-help"/>
      Apple
    </label>
    <label class="radio">
      <input type="radio" name="basic" value="Strawberry" checked aria-describedby="rb-help" />
      Strawberry
    </label>
    <label class="radio">
      <input type="radio" name="basic" value="Banana" aria-describedby="rb-help"/>
      Banana
    </label>
  </div>
  <p class="help" id="rb-help">${description}</p>
</fieldset>`,
  ),
})
FieldVerticalHtml.storyName = '🌍 Field Vertical'

export const TileBasic = Story({
  args: {
    tile: true,
  },
})
TileBasic.storyName = '🧩 Tile Basic'

export const TileColumns = Story({
  args: {
    tile: true,
    tileColor: 'purple',
    cols: 3,
    colsTablet: 2,
  },
})
TileColumns.storyName = '🧩 Tile Columns'

export const TileStack = Story({
  args: {
    label: 'Label',
    description: 'Description',
    value: 2,
    tile: true,
    tileColor: 'green',
    name: 'tile-stack',
  },
  ...withRender(
    ({ ...args }) => `
<ds-radio-group ${props(args)}>
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
  args: {
    label: 'Label',
    description: 'Description',
    value: 2,
    tile: true,
    tileColor: 'green',
    name: 'tile-stack-centered',
    cols: 2,
    labelPosition: 'top',
  },
  ...withRender(
    ({ ...args }) => `
<ds-radio-group ${props(args)}>
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
