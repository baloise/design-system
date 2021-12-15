import docs from './bal-spinner.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalSpinner } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalSpinner,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-spinner v-bind="args"></bal-spinner>`,
})

export const Basic = Template.bind({})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
