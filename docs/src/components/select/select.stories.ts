import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsSelect & { slot: string }

const tag = 'ds-select'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Select/Variants',
  args: {
    label: 'Label',
    description: 'Select an option',
    slot: ``,
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ slot, ...args }) => `
    <ds-select ${props(args)}>${slot}</ds-select>

    <script>
      Array.from(document.getElementsByTagName('ds-select')).forEach(select => {
        select.options = [
          { value:"", label:"-- Choose an option --"},
          { value:"opt1", label:"Option 1"},
          { value:"opt2", label:"Option 2"},
          { value:"opt3", label:"Option 3"},
        ]
      })
    </script>
  `,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

// ============================================================================
// Basic
// ============================================================================

export const Basic = Story({
  args: {
    label: 'Label 1',
    required: false,
  },
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  args: {
    label: 'Label 1',
    required: false,
  },
  ...withRender(
    ({ slot, ...args }) => `
      <div class="field">
        <label class="label" for="select-basic">Label 1</label>
        <div class="control">
          <select class="select" id="select-basic" ${cssClasses(css, args)}>
            <option value="">-- Choose an option --</option>
            <option value="opt1">Option 1</option>
            <option value="opt2">Option 2</option>
            <option value="opt3">Option 3</option>
          </select>
        </div>
        <span class="help">Select an option</span>
      </div>
    `,
  ),
})
BasicHtml.storyName = '🌍 Basic'

// ============================================================================
// Disabled
// ============================================================================

export const Disabled = Story({
  args: {
    label: 'Label',
    description: 'Disabled select',
    value: 'opt1',
    disabled: true,
  },
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  args: {
    label: 'Label',
    description: 'Disabled select',
    disabled: true,
  },
  ...withRender(
    ({}) => `
      <div class="field is-disabled">
        <label class="label" for="select-disabled">Label</label>
        <div class="control">
        <select class="select" id="select-disabled" disabled>
          <option value="">-- Choose an option --</option>
          <option value="opt1" selected>Option 1</option>
          <option value="opt2">Option 2</option>
          <option value="opt3">Option 3</option>
        </select>
        </div>
        <span class="help">Disabled select</span>
      </div>
    `,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

// ============================================================================
// Invalid
// ============================================================================

export const Invalid = Story({
  args: {
    label: 'Label',
    description: 'Please select an option',
    invalid: true,
    value: 'opt2',
    invalidText: 'Validation Error',
  },
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  args: {
    label: 'Label',
    description: 'Please select an option',
    invalid: true,
    invalidText: 'Validation Error',
  },
  ...withRender(
    ({}) => `
      <div class="field is-danger">
        <label class="label" for="select-invalid">Label</label>
        <div class="control">
          <select class="select" id="select-invalid">
            <option value="">Choose an option</option>
            <option value="opt1">Option 1</option>
            <option value="opt2" selected>Option 2</option>
            <option value="opt3">Option 3</option>
          </select>
        </div>
        <span class="help">Validation Error</span>
      </div>
    `,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'
