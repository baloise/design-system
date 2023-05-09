import docs from './bal-badge.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalBadge, BalIcon, BalCard, BalCardContent } from '../../../../.storybook/vue/generated/components'

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
  color: 'success',
  size: '',
  icon: 'check',
}
WithIcon.parameters = { ...component.sourceCode(WithIcon) }

export const Colors = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stack>
  <bal-badge>D</bal-badge>
  <bal-badge color="green">G</bal-badge>
  <bal-badge color="yellow">Y</bal-badge>
  <bal-badge color="purple">P</bal-badge>
  <bal-badge color="grey">G</bal-badge>
</bal-stack>`,
})
Colors.args = {}
Colors.parameters = { ...component.sourceCode(Colors) }

export const Sizes = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stack>
  <bal-badge size="small">S</bal-badge>
  <bal-badge>D</bal-badge>
  <bal-badge size="large">L</bal-badge>
</bal-stack>`,
})
Sizes.args = {}
Sizes.parameters = { ...component.sourceCode(Sizes) }

export const CardBadge = args => ({
  components: { ...component.components, BalCard, BalCardContent },
  setup: () => ({ args }),
  template: `
  <bal-card>
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

export const ListBadges = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-list border>
    <bal-list-item clickable>
      <bal-list-item-icon>
        <bal-badge color="green" size="large" icon="check">1</bal-badge>
      </bal-list-item-icon>
      <bal-list-item-content>
        <bal-list-item-title>Clickable item</bal-list-item-title>
        <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
      </bal-list-item-content>
      <bal-list-item-icon right>
        <bal-icon name="nav-go-right" size="x-small"></bal-icon>
      </bal-list-item-icon>
    </bal-list-item>
    <bal-list-item clickable>
      <bal-list-item-icon>
        <bal-badge color="purple" size="large">2</bal-badge>
      </bal-list-item-icon>
      <bal-list-item-content>
        <bal-list-item-title>Clickable item</bal-list-item-title>
        <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
      </bal-list-item-content>
      <bal-list-item-icon right>
        <bal-icon name="nav-go-right" size="x-small"></bal-icon>
      </bal-list-item-icon>
    </bal-list-item>
    <bal-list-item disabled>
      <bal-list-item-icon>
        <bal-badge color="grey" size="large">3</bal-badge>
      </bal-list-item-icon>
      <bal-list-item-content>
        <bal-list-item-title>Clickable item</bal-list-item-title>
        <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
      </bal-list-item-content>
      <bal-list-item-icon right>
        <bal-icon name="nav-go-right" size="x-small"></bal-icon>
      </bal-list-item-icon>
    </bal-list-item>
    <bal-list-item disabled>
      <bal-list-item-icon>
        <bal-badge color="grey" size="large" icon="document"></bal-badge>
      </bal-list-item-icon>
      <bal-list-item-content>
        <bal-list-item-title>Clickable item</bal-list-item-title>
        <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
      </bal-list-item-content>
      <bal-list-item-icon right>
        <bal-icon name="nav-go-right" size="x-small"></bal-icon>
      </bal-list-item-icon>
    </bal-list-item>
  </bal-list>`,
})
ListBadges.args = {}
ListBadges.parameters = { ...component.sourceCode(ListBadges) }
