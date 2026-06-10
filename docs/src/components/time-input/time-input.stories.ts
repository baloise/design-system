import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

type Args = {
  label: string
  description: string
  disabled?: boolean
  invalid?: boolean
}

const meta: Meta<Args> = {
  title: 'Components/Time Input/Variants',
  args: {
    label: 'Select a time',
    description: 'Select the desired time',
  },
  ...withRender(
    ({ label, description, disabled, invalid }) => `
      <div class="field${disabled ? ' is-disabled' : ''}${invalid ? ' is-danger' : ''}">
        <label class="label" for="time-input-1">${label}</label>
        <div class="control">
          <input
            type="time"
            id="time-input-1"
            class="time-input"
            ${disabled ? 'disabled' : ''}
            ${invalid ? 'aria-invalid="true"' : ''}
            aria-describedby="time-input-help"
          />
        </div>
        <p id="time-input-help" class="help">${description}</p>
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
  args: {
    label: 'Select a time',
    description: 'This field is disabled',
    disabled: true,
  },
})
Disabled.storyName = '🌍 Disabled'

// ============================================================================
// Invalid
// ============================================================================

export const Invalid = Story({
  args: {
    label: 'Select a time',
    description: 'Please select a valid time',
    invalid: true,
  },
})
Invalid.storyName = '🌍 Invalid'
