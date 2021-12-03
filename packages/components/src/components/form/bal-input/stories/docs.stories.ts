import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../../stories/utils'
import { BalInput } from '../../../../../.storybook/vue/components'

export default {
  title: 'Components/Form/Input',
  component: BalInput,
  argTypes: {
    ...stencilArgType('bal-input'),
  },
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
