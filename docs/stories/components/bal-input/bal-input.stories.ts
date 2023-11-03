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
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
      <bal-input ${props(args)}></bal-input>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Enter a text',
    type: 'text',
  },
})

export const InvalidInput = Story({
  ...withRender(
    ({ ...args }) => `<bal-field invalid="true">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-input ${props(args)} value="Value"></bal-input>
    </bal-field-control>
    <bal-field-message invalid="true">Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Enter a text',
    type: 'text',
    invalid: 'true',
  },
})

export const ContractNumberInput = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-input mask="contract-number" ${props(args)}></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Enter only numbers which will be formatted',
    type: 'text',
  },
})

export const ClaimNumberInput = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-input mask="claim-number" ${props(args)}></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Enter only numbers which will be formatted',
    type: 'text',
  },
})

export const OfferNumberInput = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-input mask="offer-number" ${props(args)}></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Enter only numbers which will be formatted',
    type: 'text',
  },
})

export const PostalCodeInput = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-input allowed-key-press="[0-9]" max-length="4" pattern="[0-9]{4}" ${props(args)}></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Enter a text"',
    type: 'text',
    value: '4000',
  },
})

export const SimplePhoneNumberInput = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-input allowed-key-press="[0-9]" ${props(args)}></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Enter a text"',
    type: 'tel',
    value: '4004166555443300',
  },
})

export const NativeInput = Story({
  ...withRender(
    ({ ...args }) => `<div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" ${props(args)} />
  </div>
  <p class="help">This username is available</p>
</div>
<div class="field">
  <label class="label is-disabled">Name</label>
  <div class="control">
    <input class="input is-disabled" disabled="true" ${props(args)} />
  </div>
  <p class="help is-disabled">This username is available</p>
</div>
<div class="field">
  <label class="label is-success">Name</label>
  <div class="control">
    <input class="input is-success" ${props(args)} />
  </div>
  <p class="help is-success">This username is available</p>
</div>
<div class="field">
  <label class="label is-danger">Name</label>
  <div class="control">
    <input class="input is-danger" ${props(args)} />
  </div>
  <p class="help is-danger">This username is available</p>
</div>`,
  ),
  args: {
    placeholder: 'Text input"',
    type: 'tel',
  },
})

export const InputDate = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label for="bday">Birthday</bal-field-label>
    <bal-field-control>
        <bal-input-date ${props(args)}></bal-input-date>
    </bal-field-control>
</bal-field>`,
  ),
  args: {
    autocomplete: 'bday',
    name: 'bday',
  },
})
