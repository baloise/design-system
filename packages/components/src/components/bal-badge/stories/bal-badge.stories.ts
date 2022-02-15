import docs from './bal-badge.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalBadge, BalIcon } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Badge',
  component: BalBadge,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-badge v-bind="args">42</bal-badge>`,
})
Basic.args = {
  color: 'danger',
  size: '',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const WithIcon = args => ({
  components: { ...component.components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-badge v-bind="args"></bal-badge>`,
})
WithIcon.args = {
  color: 'danger',
  size: '',
  icon: 'alert',
}
WithIcon.parameters = { ...component.sourceCode(WithIcon) }
