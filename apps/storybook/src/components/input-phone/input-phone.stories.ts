import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsInputPhone

const tag = 'ds-input-phone'

const meta: Meta<Args> = {
  title: 'Components/InputPhone/Variants',
  args: {
    label: 'Phone number',
    initialCountry: 'CH',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-input-phone ${props(args)}></ds-input-phone>`),
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
    placeholder: '79 123 45 67',
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
<ds-input-phone ${props(args)}>
  <span slot="invalid-text">Please include the country and national number</span>
</ds-input-phone>
`,
  ),
})
InvalidTextSlot.storyName = '🧩 Invalid Text Slot'

export const Success = Story({
  args: {
    value: '+41791234567',
    color: 'success',
  },
})
Success.storyName = '🧩 Success'

export const Warning = Story({
  args: {
    value: '+41791234567',
    color: 'warning',
  },
})
Warning.storyName = '🧩 Warning'

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
<ds-input-phone label="Switzerland" initial-country="CH" value="+41791234567"></ds-input-phone>
<ds-input-phone label="Germany" initial-country="DE" value="+4915123456789"></ds-input-phone>
<ds-input-phone label="France" initial-country="FR" value="+33612345678"></ds-input-phone>
<ds-input-phone label="United States" initial-country="US" value="+12025551234"></ds-input-phone>
`,
  ),
})
Formatting.storyName = '🧩 Formatting'
