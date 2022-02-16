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

export const CardBadge = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-card>
  <bal-badge v-bind="args">42</bal-badge>
  <bal-card-title>Title</bal-card-title>
  <bal-card-content>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </bal-card-content>
</bal-card>`,
})
CardBadge.args = {
  color: 'danger',
  size: '',
  position: 'card',
}
CardBadge.parameters = { ...component.sourceCode(CardBadge) }

export const ButtonBadge = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-button>
  <bal-badge v-bind="args">42</bal-badge>
  Button
</bal-button>`,
})
ButtonBadge.args = {
  color: 'danger',
  size: '',
  position: 'button',
}
ButtonBadge.parameters = { ...component.sourceCode(ButtonBadge) }

export const TabsBadge = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tabs  interface="tabs" value="tab-b">
  <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B" bubble>Content of Tab B</bal-tab-item>
</bal-tabs>`,
})
TabsBadge.args = {
  color: 'danger',
  size: '',
  position: 'tabs',
}
TabsBadge.parameters = { ...component.sourceCode(TabsBadge) }
