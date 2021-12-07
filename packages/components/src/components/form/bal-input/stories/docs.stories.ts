import docs from './readme.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalInput } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Input',
  component: BalInput,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-input v-bind="args"></bal-input>`,
})

export const TextInput = Template.bind({})
TextInput.args = {
  placeholder: 'Enter a text',
}
TextInput.parameters = { ...component.sourceCode(TextInput) }

export const NumberInput = Template.bind({})
NumberInput.args = {
  placeholder: 'Enter a number',
  numberInput: true,
  suffix: 'CHF',
  decimal: '2',
}
NumberInput.parameters = { ...component.sourceCode(NumberInput) }
