import docs from './bal-icon.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalIcon } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalIcon,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-icon v-bind="args"></bal-icon>`,
})

export const Basic = Template.bind({})
Basic.args = {
  name: 'info-circle',
  size: 'xlarge',
  color: 'primary',
}
Basic.parameters = { ...component.sourceCode(Basic) }
