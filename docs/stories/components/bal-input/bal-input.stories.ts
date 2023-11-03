import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalInput & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/Input',
  args: {
    ...withDefaultContent(''),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-input' }),
  },
  ...withRender(({ content, ...args }) => `<bal-input ${props(args)}>${content}</bal-input>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    placeholder: 'Enter a text',
    disabled: false,
    readonly: false,
    invalid: false,
    type: 'text',
  },
})

export const TextInput = Story({
  ...withRender(
    () => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
      <bal-input placeholder="Enter a text" type="text"></bal-input>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const InvalidInput = Story({
  ...withRender(
    () => `<bal-field invalid="true">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-input invalid="true" placeholder="Enter a text" type="text" value="Value"></bal-input>
    </bal-field-control>
    <bal-field-message invalid="true">Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const ContractNumberInput = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-input mask="contract-number" placeholder="Enter only numbers which will be formatted" type="text"></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const ClaimNumberInput = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-input mask="claim-number" placeholder="Enter only numbers which will be formatted" type="text"></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const OfferNumberInput = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-input mask="offer-number" placeholder="Enter only numbers which will be formatted" type="text"></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const PostalCodeInput = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-input allowed-key-press="[0-9]" max-length="4" pattern="[0-9]{4}" placeholder="Enter a text" type="text" value="4000"></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const SimplePhoneNumberInput = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-input allowed-key-press="[0-9]" placeholder="Enter a text" type="tel" value="0041665554433"></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const NativeInput = Story({
  ...withRender(
    () => `<div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input" />
  </div>
  <p class="help">This username is available</p>
</div>
<div class="field">
  <label class="label is-disabled">Name</label>
  <div class="control">
    <input class="input is-disabled" disabled="true" type="text" placeholder="Text input" />
  </div>
  <p class="help is-disabled">This username is available</p>
</div>
<div class="field">
  <label class="label is-success">Name</label>
  <div class="control">
    <input class="input is-success" type="text" placeholder="Text input" />
  </div>
  <p class="help is-success">This username is available</p>
</div>
<div class="field">
  <label class="label is-danger">Name</label>
  <div class="control">
    <input class="input is-danger" type="text" placeholder="Text input" />
  </div>
  <p class="help is-danger">This username is available</p>
</div>`,
  ),
})

export const InputDate = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label for="bday">Birthday</bal-field-label>
    <bal-field-control>
        <bal-input-date name="bday" autocomplete="bday"></bal-input-date>
    </bal-field-control>
</bal-field>`,
  ),
})
