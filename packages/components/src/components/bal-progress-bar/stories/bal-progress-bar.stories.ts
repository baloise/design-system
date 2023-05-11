import docs from './bal-progress-bar.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalProgressBar } from '../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Progress Bar',
  component: BalProgressBar,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-progress-bar v-bind="args"></bal-progress-bar>`,
})
Basic.args = {
  value: 50,
  background: 'grey',
}
Basic.parameters = { ...component.sourceCode(Basic) }
