import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import { BalInput } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Form/Input',
  component: BalInput,
  argTypes: generateArgType('bal-input'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalInput },
  setup: () => ({ args }),
  template: `<bal-input v-bind="args"></bal-input>`,
})

export const TextInput = Template.bind({})
TextInput.args = {
  placeholder: 'Enter a text',
}

export const NumberInput = Template.bind({})
NumberInput.args = {
  placeholder: 'Enter a number',
  numberInput: true,
  suffix: 'CHF',
  decimal: '2',
}
