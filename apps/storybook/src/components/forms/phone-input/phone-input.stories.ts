import type { JSX } from '@helvetia-design/core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../../utils'

type Args = JSX.DsPhoneInput

const tag = 'ds-phone-input'

const meta: Meta<Args> = {
  title: 'Components/Forms/Phone Input/Variants',
  args: {
    label: 'Phone number',
    initialCountry: 'CH',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-phone-input ${props(args)}></ds-phone-input>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const Placeholder = Story({
  args: {
    placeholder: '79 501 21 22',
  },
})
Placeholder.storyName = '🧩 Placeholder'

export const RestrictedCountries = Story({
  args: {
    countries: 'CH,DE,FR,IT',
  },
})
RestrictedCountries.storyName = '🧩 Restricted Countries'

export const Invalid = Story({
  args: {
    invalid: true,
    invalidText: 'Please enter a phone number',
  },
})
Invalid.storyName = '🧩 Invalid'

export const InvalidTextSlot = Story({
  args: {
    invalid: true,
  },
  ...withRender(
    ({ ...args }) => `
<ds-phone-input ${props(args)}>
  <span slot="invalid-text">Please include the country and national number</span>
</ds-phone-input>
`,
  ),
})
InvalidTextSlot.storyName = '🧩 Invalid Text Slot'

export const WithDescription = Story({
  args: {
    description: 'Include the national number only',
  },
})
WithDescription.storyName = '🧩 With Description'

export const Disabled = Story({
  args: {
    value: '+41791234567',
    disabled: true,
  },
})
Disabled.storyName = '🧩 Disabled'

export const Readonly = Story({
  args: {
    value: '+41791234567',
    readonly: true,
  },
})
Readonly.storyName = '🧩 Readonly'

export const FormattedValue = Story({
  args: {
    value: '+41791234567',
  },
})
FormattedValue.storyName = '🧩 Formatted Value'

export const Formatting = Story({
  ...withRender(
    () => `
<ds-phone-input label="Switzerland" initial-country="CH" value="+41791234567"></ds-phone-input>
<ds-phone-input label="Germany" initial-country="DE" value="+4915123456789"></ds-phone-input>
<ds-phone-input label="France" initial-country="FR" value="+33612345678"></ds-phone-input>
<ds-phone-input label="United States" initial-country="US" value="+12025551234"></ds-phone-input>
`,
  ),
})
Formatting.storyName = '🧩 Formatting'
