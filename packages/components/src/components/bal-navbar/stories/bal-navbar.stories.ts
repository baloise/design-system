import { ref, watchEffect } from 'vue'
import docs from './bal-navbar.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import {
  BalNavbar,
  BalText,
  BalButton,
  BalButtonGroup,
  BalNavbarBrand,
  BalNavbarMenu,
  BalNavbarMenuEnd,
  BalNavbarMenuStart,
  BalLogo,
  BalPopover,
  BalPopoverContent,
  BalList,
  BalListItem,
  BalListItemContent,
  BalListItemTitle,
  BalTabs,
  BalTabItem,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalNavbar,
  status: 'stable',
  subcomponents: { BalNavbarBrand, BalNavbarMenu, BalNavbarMenuEnd, BalNavbarMenuStart },
  docs,
  args: {
    expanded: false,
  },
})

export default component.story

const excludedControls = ['noBurger', 'light']

export const Basic = args => ({
  components: { ...component.components, BalLogo, BalText, BalButton },
  setup: () => ({ args }),
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand simple>
    <bal-logo brand="group" color="white"></bal-logo>
    <bal-text><strong>App</strong> Title</bal-text>
  </bal-navbar-brand>
</bal-navbar>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const WithTabs = args => ({
  components: { ...component.components, BalLogo, BalTabs, BalTabItem },
  setup: () => ({ args }),
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand>
    <bal-logo brand="group" :color="args.light ? 'blue' : 'white'"></bal-logo>
  </bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      <bal-tabs interface="navbar">
        <bal-tab-item label="Home" value="home"></bal-tab-item>
        <bal-tab-item label="About" value="about"></bal-tab-item>
        <bal-tab-item label="Third" value="third"></bal-tab-item>
      </bal-tabs>
    </bal-navbar-menu-start>
  </bal-navbar-menu>
</bal-navbar>`,
})
WithTabs.args = {}
WithTabs.parameters = { ...component.sourceCode(WithTabs), controls: { exclude: excludedControls } }

export const WithButton = args => ({
  components: { ...component.components, BalLogo, BalButton, BalButtonGroup },
  setup: () => ({ args }),
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand>
    <bal-logo brand="group" :color="args.light ? 'blue' : 'white'"></bal-logo>
  </bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-end>
      <bal-button-group>
        <bal-button outlined inverted square color="info" icon="account"></bal-button>
        <bal-button inverted>Action</bal-button>
      </bal-button-group>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
WithButton.args = {}
WithButton.parameters = { ...component.sourceCode(WithButton), controls: { exclude: excludedControls } }

export const WithPopover = args => ({
  components: {
    ...component.components,
    BalList,
    BalListItem,
    BalListItemContent,
    BalListItemTitle,
    BalButton,
    BalButtonGroup,
    BalLogo,
    BalPopover,
    BalPopoverContent,
  },
  setup: () => {
    const isActive = ref(true)

    const toggle = () => {
      isActive.value = !isActive.value
    }

    watchEffect(() => {
      isActive.value = args.value
    })

    return {
      args,
      isActive,
      toggle,
    }
  },
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand>
    <bal-logo brand="group" :color="args.light ? 'blue' : 'white'"></bal-logo>
  </bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-end>
      <bal-button-group>
        <bal-popover v-model="isActive">
          <bal-button bal-popover-trigger @click="toggle()" inverted square color="info">
              DE
          </bal-button>
          <bal-popover-content class="p-2">
            <bal-list>
              <bal-list-item clickable>
                <bal-list-item-content>
                  <bal-list-item-title>English</bal-list-item-title>
                </bal-list-item-content>
              </bal-list-item>
              <bal-list-item clickable>
                <bal-list-item-content>
                  <bal-list-item-title>Français</bal-list-item-title>
                </bal-list-item-content>
              </bal-list-item>
              <bal-list-item clickable>
                <bal-list-item-content>
                  <bal-list-item-title>Italiano</bal-list-item-title>
                </bal-list-item-content>
              </bal-list-item>
            </bal-list>
          </bal-popover-content>
        </bal-popover>
      </bal-button-group>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
WithButton.args = {}
WithButton.parameters = { ...component.sourceCode(WithButton), controls: { exclude: excludedControls } }

export const NavbarCombi = args => ({
  components: {
    ...component.components,
    BalList,
    BalListItem,
    BalListItemContent,
    BalListItemTitle,
    BalButton,
    BalButtonGroup,
    BalLogo,
    BalPopover,
    BalPopoverContent,
  },
  setup: () => {
    const isActive = ref(true)

    const toggle = () => {
      isActive.value = !isActive.value
    }

    watchEffect(() => {
      isActive.value = args.value
    })

    return {
      args,
      isActive,
      toggle,
    }
  },
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand>
    <bal-logo brand="group" :color="args.light ? 'blue' : 'white'"></bal-logo>
  </bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      <bal-tabs interface="navbar">
        <bal-tab-item label="Home" value="home"></bal-tab-item>
        <bal-tab-item label="About" value="about"></bal-tab-item>
        <bal-tab-item label="Third" value="third"></bal-tab-item>
      </bal-tabs>
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-button-group>
        <bal-popover v-model="isActive">
          <bal-button bal-popover-trigger @click="toggle()" color="info" outlined inverted square >
              DE
          </bal-button>
          <bal-popover-content class="p-2">
            <bal-list>
              <bal-list-item clickable>
                <bal-list-item-content>
                  <bal-list-item-title>English</bal-list-item-title>
                </bal-list-item-content>
              </bal-list-item>
              <bal-list-item clickable>
                <bal-list-item-content>
                  <bal-list-item-title>Français</bal-list-item-title>
                </bal-list-item-content>
              </bal-list-item>
              <bal-list-item clickable>
                <bal-list-item-content>
                  <bal-list-item-title>Italiano</bal-list-item-title>
                </bal-list-item-content>
              </bal-list-item>
            </bal-list>
          </bal-popover-content>
        </bal-popover>
        <bal-button inverted>Action</bal-button>
      </bal-button-group>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
WithButton.args = {}
WithButton.parameters = { ...component.sourceCode(WithButton), controls: { exclude: excludedControls } }
