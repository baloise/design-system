import docs from './bal-close.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalClose } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Close',
  component: BalClose,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-close v-bind="args"></bal-close>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
