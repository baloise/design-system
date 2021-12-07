import docs from './readme.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalTextarea } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Textarea',
  component: BalTextarea,
  docs,
})

export default component.story

const Template = args => ({
  components: { BalTextarea },
  setup: () => ({ args }),
  template: `<bal-textarea v-bind="args"></bal-textarea>`,
})

export const Basic = Template.bind({})
Basic.args = {
  placeholder: 'Enter a comment',
  disabled: false,
}
Basic.parameters = { ...component.sourceCode(Basic) }
