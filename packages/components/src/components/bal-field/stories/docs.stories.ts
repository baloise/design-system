import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import { BalField, BalFieldControl, BalFieldHint, BalFieldLabel, BalFieldMessage } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Form/Field',
  component: BalField,
  subcomponent: { BalFieldControl, BalFieldHint, BalFieldLabel, BalFieldMessage },
  argTypes: generateArgType('bal-field'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: { BalField, BalFieldControl, BalFieldHint, BalFieldLabel, BalFieldMessage },
  setup: () => ({ args }),
  template: `<bal-field v-bind="args">
  <bal-field-label required>Firstname</bal-field-label>
  <bal-field-control>
    <bal-input id="bal-input-1" name="firstName" placeholder="Enter your firstname"></bal-input>
  </bal-field-control>
  <bal-field-message color="danger">Required Field</bal-field-message>
</bal-field>`,
})

Basic.args = { expanded: true }

export const Addon = args => ({
  components: { BalField, BalFieldControl, BalFieldHint, BalFieldLabel, BalFieldMessage },
  setup: () => ({ args }),
  template: `<bal-field v-bind="args">
  <bal-field-label required>Search</bal-field-label>
  <bal-field-control>
    <bal-input name="search" placeholder="Search..."></bal-input>
    <bal-button size="small" outlined color="info">Search</bal-button>
  </bal-field-control>
  </bal-field>`,
})
Addon.args = { expanded: true }
