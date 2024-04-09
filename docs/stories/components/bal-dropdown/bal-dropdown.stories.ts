import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalDropdown & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/DropDown',
  argTypes: {
    ...withComponentControls({ tag: 'bal-dropdown' }),
  },
  args: {
    placeholder: 'Pick a color',
  },
  ...withRender(
    ({ ...args }) => `<bal-dropdown ${props(args)}>
  <bal-option value="green" label="Green">Green</bal-option>
  <bal-option value="purple" label="Purple">Purple</bal-option>
  <bal-option value="yellow" label="Yellow">Yellow</bal-option>
  <bal-option value="red" label="Red">Red</bal-option>
</bal-dropdown>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const FieldControl = Story({
  args: {
    value: 'purple',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Color</bal-field-label>
    <bal-field-control>
      <bal-dropdown ${props(args)}>
        <bal-option value="green" label="Green">Green</bal-option>
        <bal-option value="purple" label="Purple">Purple</bal-option>
        <bal-option value="yellow" label="Yellow">Yellow</bal-option>
        <bal-option value="red" label="Red">Red</bal-option>
      </bal-dropdown>
    </bal-field-control>
    <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const Multiple = Story({
  args: {
    value: ['green', 'red'],
    multiple: true,
  },
})

export const MultipleWithChips = Story({
  args: {
    value: ['green', 'red'],
    multiple: true,
    chips: true,
  },
})

export const Clearable = Story({
  args: {
    value: ['yellow'],
    clearable: true,
  },
})

export const Loading = Story({
  args: {
    loading: true,
  },
})

export const Invalid = Story({
  args: {
    invalid: true,
  },
})

export const Disabled = Story({
  args: {
    disabled: true,
  },
})

export const FormReset = Story({
  args: {
    value: 'purple',
  },
  ...withRender(
    ({ ...args }) => `<form action="https://www.w3schools.com/action_page.php" target="_blank">
  <bal-form-grid>
    <bal-form-col>
      <bal-field required>
        <bal-field-control>
          <bal-dropdown ${props(args)}>
            <bal-option value="green" label="Green">Green</bal-option>
            <bal-option value="purple" label="Purple">Purple</bal-option>
            <bal-option value="yellow" label="Yellow">Yellow</bal-option>
            <bal-option value="red" label="Red">Red</bal-option>
          </bal-dropdown>
        </bal-field-control>
      </bal-field>
    </bal-form-col>
  </bal-form-grid>
  <bal-button-group>
    <bal-button element-type="submit" color="primary">Submit</bal-button>
    <bal-button data-testid="button-reset" element-type="reset" color="link">Reset</bal-button>
  </bal-button-group>
</form>`,
  ),
})

export const Autocomplete = Story({
  args: {
    name: 'country',
    autocomplete: 'country',
  },
  ...withRender(
    ({ ...args }) => `<form action="https://www.w3schools.com/action_page.php" target="_blank">
  <bal-form-grid>
    <bal-form-col>
      <bal-field>
        <bal-field-label>First Name</bal-field-label>
        <bal-field-control>
          <bal-input name="firstName" autocomplete="given-name"></bal-input>
        </bal-field-control>
      </bal-field>
    </bal-form-col>
    <bal-form-col>
      <bal-field>
        <bal-field-label>Last Name</bal-field-label>
        <bal-field-control>
          <bal-input name="lastName" autocomplete="family-name"></bal-input>
        </bal-field-control>
      </bal-field>
    </bal-form-col>
    <bal-form-col>
      <bal-field>
        <bal-field-label>Country</bal-field-label>
        <bal-field-control>
          <bal-dropdown ${props(args)}>
            <bal-option value="CH" label="Switzerland">Switzerland</bal-option>
            <bal-option value="DE" label="Germany">Germany</bal-option>
            <bal-option value="IT" label="Italy">Italy</bal-option>
          </bal-dropdown>
        </bal-field-control>
      </bal-field>
    </bal-form-col>
  </bal-form-grid>
  <input type="reset" value="Reset" />
  <input type="submit" value="Submit" />
</form>`,
  ),
})
