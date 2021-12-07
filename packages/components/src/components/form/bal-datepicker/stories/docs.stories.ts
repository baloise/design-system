import docs from './readme.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalDatepicker } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Datepicker',
  component: BalDatepicker,
  docs,
})

export default component.story

const Template = args => ({
  components: { BalDatepicker },
  setup: () => ({ args }),
  template: `<bal-datepicker v-bind="args"></bal-datepicker>`,
})

export const Basic = Template.bind({})
Basic.args = {
  placeholder: 'Pick a date',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const ManualInput = Template.bind({})
ManualInput.args = {
  placeholder: 'Type a date',
  triggerIcon: true,
}
ManualInput.parameters = { ...component.sourceCode(ManualInput) }

export const MinAndMax = Template.bind({})
MinAndMax.args = {
  placeholder: 'Type a date',
  defaultDate: '2022-01-06',
  min: '2022-01-06',
  max: '2022-01-12',
}
MinAndMax.parameters = { controls: { include: ['min', 'max', 'minYearProp', 'maxYearProp', 'defaultDate', 'placeholder'] } }
MinAndMax.parameters = { ...component.sourceCode(MinAndMax) }
