import docs from './bal-option.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalOption } from '../../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Form/Select/Option',
  component: BalOption,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-option v-bind="args">42</bal-option>`,
})
Basic.args = {
  color: '',
  size: '',
}
Basic.parameters = { ...component.sourceCode(Basic) }
