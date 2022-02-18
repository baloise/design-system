import docs from './bal-input-stepper.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalInputStepper } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Input Stepper',
  component: BalInputStepper,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-input-stepper v-bind="args"></bal-input-stepper>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
