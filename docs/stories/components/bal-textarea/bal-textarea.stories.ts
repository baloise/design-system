import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalTextarea & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/Textarea',
  args: {
    ...withDefaultContent(),
    content: undefined,
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-textarea' }),
  },
  ...withRender(({ ...args }) => `<bal-textarea ${props(args)}></bal-textarea>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    placeholder: 'Enter a comment',
  },
})

export const FieldControl = Story({
  args: {
    placeholder: 'Enter a comment',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
      <bal-textarea ${props(args)}></bal-textarea>
  </bal-field-control>
  <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const InvalidTextarea = Story({
  args: {
    invalid: true,
    value: 'Value',
  },
  ...withRender(
    ({ ...args }) => `<bal-field invalid="true">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-textarea ${props(args)}></bal-textarea>
    </bal-field-control>
    <bal-field-message color="danger">Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const NativeTextarea = Story({
  args: {
    placeholder: 'Text input',
  },
  ...withRender(
    ({ ...args }) => `<div class="field">
  <label class="label">Name</label>
  <div class="control">
    <textarea class="textarea" ${props(args)}></textarea>
  </div>
  <p class="help">This username is available</p>
</div>
<div class="field">
  <label class="label is-disabled">Name</label>
  <div class="control">
    <textarea class="textarea is-disabled" disabled="true" type="text" ${props(args)} /></textarea>
  </div>
  <p class="help is-disabled">This username is available</p>
</div>
<div class="field">
  <label class="label is-success">Name</label>
  <div class="control">
    <textarea class="textarea is-success" type="text" ${props(args)} /></textarea>
  </div>
  <p class="help is-success">This username is available</p>
</div>
<div class="field">
  <label class="label is-danger">Name</label>
  <div class="control">
    <textarea class="textarea is-danger" type="text" ${props(args)} /></textarea>
  </div>
  <p class="help is-danger">This username is available</p>
</div>`,
  ),
})
