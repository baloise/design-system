import docs from './bal-navbar.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import {
  BalNavbar,
  BalText,
  BalIcon,
  BalButton,
  BalNavbarBrand,
  BalNavbarMenu,
  BalNavbarMenuEnd,
  BalNavbarMenuStart,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalNavbar,
  status: 'stable',
  subcomponents: { BalNavbarBrand, BalNavbarMenu, BalNavbarMenuEnd, BalNavbarMenuStart },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components, BalText, BalIcon, BalButton },
  setup: () => ({ args }),
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand>
    <bal-icon name="github" color="white" size="medium"></bal-icon>
    <bal-text headline inline color="white" style="margin-left: 15px"><strong>App</strong> Title</bal-text>
  </bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      <a class="navbar-item"><bal-text headline inline bold color="white">Home</bal-text></a>
      <a class="navbar-item"><bal-text headline inline bold color="white">About</bal-text></a>
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-button inverted>Logout</bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
