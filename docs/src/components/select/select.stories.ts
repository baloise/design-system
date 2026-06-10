import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsSelect

const tag = 'ds-select'

const meta: Meta<Args> = {
  title: 'Components/Select/Variants',
  args: {
    label: 'Label',
    description: 'Select an option',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ ...args }) => `
      <div class="field">
        <label class="label" for="select-basic">${args.label}</label>
        <div class="control">
          <select class="select" id="select-basic" aria-describedby="select-basic-help">
            <option value="">-- Choose an option --</option>
            <option value="opt1">Option 1</option>
            <option value="opt2">Option 2</option>
            <option value="opt3">Option 3</option>
          </select>
        </div>
        <span class="help" id="select-basic-help">${args.description}</span>
      </div>
  `,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

// ============================================================================
// Basic
// ============================================================================

export const Basic = Story({})
Basic.storyName = '🌍 Basic'

// ============================================================================
// Disabled
// ============================================================================

export const Disabled = Story({
  ...withRender(
    ({}) => `
      <div class="field is-disabled">
        <label class="label" for="select-disabled">Label</label>
        <div class="control">
          <select class="select" id="select-disabled" disabled aria-describedby="select-disabled-help">
            <option value="">-- Choose an option --</option>
            <option value="opt1" selected>Option 1</option>
            <option value="opt2">Option 2</option>
            <option value="opt3">Option 3</option>
          </select>
        </div>
        <span class="help" id="select-disabled-help">Disabled select</span>
      </div>
    `,
  ),
})
Disabled.storyName = '🌍 Disabled'

// ============================================================================
// Invalid
// ============================================================================

export const Invalid = Story({
  ...withRender(
    ({}) => `
      <div class="field is-danger">
        <label class="label" for="select-invalid">Label</label>
        <div class="control">
          <select class="select" id="select-invalid" aria-invalid="true" aria-describedby="select-invalid-error">
            <option value="">Choose an option</option>
            <option value="opt1">Option 1</option>
            <option value="opt2" selected>Option 2</option>
            <option value="opt3">Option 3</option>
          </select>
        </div>
        <span class="help" id="select-invalid-error">Validation Error</span>
      </div>
    `,
  ),
})
Invalid.storyName = '🌍 Invalid'
