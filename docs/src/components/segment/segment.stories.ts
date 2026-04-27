import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX.DsSegment & { content: string }

const tag = 'ds-segment'

const meta: Meta<Args> = {
  title: 'Components/Form/Segment',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ content, ...args }) => `
<ds-segment ${props(args)}>
  <ds-segment-item value="apple" label="Apple"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry"></ds-segment-item>
</ds-segment>`,
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
<ds-segment
  name="basic"
  value="apple"
  label="Fruits"
  description="Choose your favorite fruit"
  allow-empty-selection
>
  <ds-segment-item value="apple" label="Apple"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry"></ds-segment-item>
</ds-segment>`,
  ),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    () => `
<fieldset class="field">
  <legend class="label">Fruits</legend>
  <div class="segment">
    <label>
      <input type="radio" name="basic" value="apple" checked />
      <span>Apple</span>
    </label>
    <label>
      <input type="radio" name="basic" value="strawberry" />
      <span>Strawberry</span>
    </label>
    <label>
      <input type="radio" name="basic" value="banana" />
      <span>Banana</span>
    </label>
  </div>
  <p class="help">Choose your favorite fruit</p>
</fieldset>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Vertical = Story({
  ...withRender(
    () => `
<ds-segment name="vertical" value="apple" label="Fruits" description="Choose your favorite fruit" vertical>
  <ds-segment-item value="apple" label="Apple" description="A sweet red fruit"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry" description="A small red fruit"></ds-segment-item>
</ds-segment>`,
  ),
})
Vertical.storyName = '🧩 Vertical'

export const VerticalHtml = Story({
  ...withRender(
    () => `
<fieldset class="field">
  <legend class="label">Fruits</legend>
  <div class="segment is-vertical">
    <label>
      <input type="radio" name="vertical" value="apple" checked />
      <span>Apple</span>
      <span class="description">A sweet red fruit</span>
    </label>
    <label>
      <input type="radio" name="vertical" value="strawberry" />
      <span>Strawberry</span>
      <span class="description">A small red fruit</span>
    </label>
  </div>
  <p class="help">Choose your favorite fruit</p>
</fieldset>`,
  ),
})
VerticalHtml.storyName = '🌍 Vertical'

export const Disabled = Story({
  ...withRender(
    () => `
<ds-segment name="disabled" value="apple" label="Fruits" description="Choose your favorite fruit" disabled>
  <ds-segment-item value="apple" label="Apple" description="A sweet red fruit"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry" description="A small red fruit"></ds-segment-item>
</ds-segment>`,
  ),
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  ...withRender(
    () => `
<fieldset class="field is-disabled">
  <legend class="label">Fruits</legend>
  <div class="segment is-disabled">
    <label>
      <input type="radio" name="disabled" value="apple" checked disabled />
      <span>Apple</span>
      <span class="description">A sweet red fruit</span>
    </label>
    <label>
      <input type="radio" name="disabled" value="strawberry" disabled />
      <span>Strawberry</span>
      <span class="description">A small red fruit</span>
    </label>
  </div>
  <p class="help">Choose your favorite fruit</p>
</fieldset>`,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  ...withRender(
    () => `
<ds-segment
  name="invalid"
  value="apple"
  label="Fruits"
  description="Choose your favorite fruit"
  invalid
  invalid-text="Please select a fruit"
>
  <ds-segment-item value="apple" label="Apple" description="A sweet red fruit"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry" description="A small red fruit"></ds-segment-item>
</ds-segment>`,
  ),
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  ...withRender(
    () => `
<fieldset class="field is-danger">
  <legend class="label">Fruits</legend>
  <div class="segment is-danger">
    <label>
      <input type="radio" name="invalid" value="apple" checked aria-invalid="true" />
      <span>Apple</span>
      <span class="description">A sweet red fruit</span>
    </label>
    <label>
      <input type="radio" name="invalid" value="strawberry" aria-invalid="true" />
      <span>Strawberry</span>
      <span class="description">A small red fruit</span>
    </label>
  </div>
  <p class="help">Please select a fruit</p>
</fieldset>`,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'

export const Wide = Story({
  ...withRender(
    () => `
<ds-segment wide name="wide" label="Label" description="Description" value="apple">
  <ds-segment-item value="apple" label="Apple" description="A sweet red fruit"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry" description="A small red fruit"></ds-segment-item>
</ds-segment>`,
  ),
})
Wide.storyName = '🧩 Wide'

export const Icon = Story({
  ...withRender(
    () => `
<ds-segment icon-only name="wide" label="Label" description="Description" value="apple">
  <ds-segment-item icon="document" value="apple" label="Apple"></ds-segment-item>
  <ds-segment-item icon="web" value="strawberry" label="Strawberry"></ds-segment-item>
  <ds-segment-item icon="trash" value="banana" label="Banana"></ds-segment-item>
</ds-segment>`,
  ),
})
Icon.storyName = '🧩 Icon'

export const Form = Story({
  ...withRender(
    () => `
<form>
  <ds-segment name="fruits" label="Label" description="Description" value="apple">
    <ds-segment-item value="apple" label="Apple" description="A sweet red fruit"></ds-segment-item>
    <ds-segment-item value="strawberry" label="Strawberry" description="A small red fruit"></ds-segment-item>
  </ds-segment>
  <br /><br />
  <ds-button element-type="submit" color="primary">Submit</ds-button>
  <ds-button element-type="reset" color="link">Reset</ds-button>
</form>`,
  ),
})
Form.storyName = '🧩 Form'
