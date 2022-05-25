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
  status: 'beta',
  subcomponents: { BalNavbarBrand, BalNavbarMenu, BalNavbarMenuEnd, BalNavbarMenuStart },
  docs,
  args: {
    expanded: false,
  },
})

export default component.story

const excludedControls = ['noBurger', 'light']

export const Basic = args => ({
  components: {
    ...component.components,
    BalLogo,
    BalText,
    BalButton,
    BalPopover,
    BalPopoverContent,
    BalList,
    BalListItem,
    BalListItemContent,
    BalListItemTitle,
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
  <bal-navbar-brand>App Header</bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      START
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-popover v-model="isActive">
        <bal-button bal-popover-trigger color="light" icon="web" size="small" @click="toggle()">
            DE
        </bal-button>
        <bal-popover-content class="p-2">
          <bal-list border>
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
      <bal-button color="light" icon="call" size="small">0800 123 12 12</bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
Basic.args = {
  interface: 'app',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

// no burger and no start
export const Simple = args => ({
  components: { ...component.components, BalLogo, BalText, BalButton },
  setup: () => ({ args }),
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand>Simple Header</bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-button class="is-hidden-mobile" color="light" icon="web" size="small">DE</bal-button>
      <bal-button class="is-hidden-tablet" color="light" icon="web" size="small" square></bal-button>
      <bal-button class="is-hidden-mobile" color="light" icon="call" size="small">0800 123 12 12</bal-button>
      <bal-button class="is-hidden-tablet" color="light" icon="call" size="small" square></bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
Simple.args = {
  interface: 'simple',
}
Simple.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const Meta = args => ({
  components: { ...component.components, BalLogo, BalText, BalButton },
  setup: () => ({ args }),
  template: `<bal-navbar v-bind="args">
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      <bal-tabs interface="meta" inverted>
        <bal-tab-item value="tab-a" label="Tab A"></bal-tab-item>
        <bal-tab-item value="tab-b" label="Tab B"></bal-tab-item>
        <bal-tab-item value="tab-c" label="Tab C"></bal-tab-item>
      </bal-tabs>
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-button square color="light" icon="location" size="small"></bal-button>
      <bal-button square color="light" icon="search" size="small"></bal-button>
      <bal-button square color="light" icon="account" size="small"></bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
Meta.args = {
  interface: 'meta',
}
Meta.parameters = {
  ...component.sourceCode(Meta),
  controls: { exclude: excludedControls },
}

export const Stage = args => ({
  components: { ...component.components, BalLogo, BalButton },
  setup: () => ({ args }),
  template: `
<bal-navbar interface="meta">
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      <bal-tabs interface="meta" inverted>
        <bal-tab-item value="tab-a" label="Tab A"></bal-tab-item>
        <bal-tab-item value="tab-b" label="Tab B"></bal-tab-item>
        <bal-tab-item value="tab-c" label="Tab C"></bal-tab-item>
      </bal-tabs>
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-button square color="light" icon="location" size="small"></bal-button>
      <bal-button square color="light" icon="search" size="small"></bal-button>
      <bal-button square color="light" icon="account" size="small"></bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>
<div class="has-background-green pb-8">
  <bal-navbar v-bind="args">
    <bal-navbar-brand></bal-navbar-brand>
    <bal-navbar-menu>
      <bal-navbar-menu-start>
        <bal-tabs interface="navbar">
          <bal-tab-item value="tab-a" label="Tab A"></bal-tab-item>
          <bal-tab-item value="tab-b" label="Tab B"></bal-tab-item>
          <bal-tab-item value="tab-c" label="Tab C"></bal-tab-item>
        </bal-tabs>
      </bal-navbar-menu-start>
      <bal-navbar-menu-end>
        <bal-button icon="account" color="info">Action</bal-button>
      </bal-navbar-menu-end>
    </bal-navbar-menu>
  </bal-navbar>
  <main class="container mt-5">
    <h1 class="title is-1">Heading</h1>
  </main>
</div>
`,
})
Stage.args = {
  interface: 'stage',
}
Stage.parameters = {
  ...component.sourceCode(Stage),
  controls: { exclude: excludedControls },
}

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
    BalTabs,
    BalTabItem,
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
  <bal-navbar-brand></bal-navbar-brand>
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
NavbarCombi.args = {}
NavbarCombi.parameters = {
  ...component.sourceCode(NavbarCombi),
  controls: { exclude: excludedControls },
}
