import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
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
import { isPlatform } from '../../../../dist'

const component = BalComponentStory({
  component: BalNavbar,
  status: 'stable',
  subcomponents: { BalNavbarBrand, BalNavbarMenu, BalNavbarMenuEnd, BalNavbarMenuStart },
  docs,
  args: {
    expanded: false,
    light: true,
  },
})

export default component.story

const excludedControls = []

export const Basic = args => ({
  components: {
    ...component.components,
    BalLogo,
    BalText,
    BalButton,
    BalButtonGroup,
    BalPopover,
    BalPopoverContent,
    BalList,
    BalListItem,
    BalListItemContent,
    BalListItemTitle,
    BalTabs,
    BalTabItem,
  },
  setup: () => {
    const isActive = ref(true)
    const myActiveTab = ref('tab-a')

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
      myActiveTab,
    }
  },
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand href="/">App Header</bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      <bal-tabs interface="navbar" inverted v-model="myActiveTab">
        <bal-tab-item value="tab-a" label="Tab A"></bal-tab-item>
        <bal-tab-item value="tab-b" label="Tab B"></bal-tab-item>
        <bal-tab-item value="tab-c" label="Tab C"></bal-tab-item>
      </bal-tabs>
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-button-group>
      <bal-popover v-model="isActive">
        <bal-button bal-popover-trigger color="light" inverted  icon="web" @click="toggle()">
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
      <bal-button href="tel://00800 24 800 800" color="light" inverted icon="call">00800 24 800 800</bal-button>
      </bal-button-group>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
Basic.args = {
  interface: 'app',
}
Basic.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const Simple = args => ({
  components: {
    ...component.components,
    BalLogo,
    BalText,
    BalButton,
    BalButtonGroup,
    BalPopover,
    BalPopoverContent,
    BalList,
    BalListItem,
    BalListItemContent,
    BalListItemTitle,
    BalTabs,
    BalTabItem,
  },
  setup: () => {
    const isActive = ref(true)
    const myActiveTab = ref('tab-a')
    const square = ref(isPlatform('mobile'))

    const toggle = () => {
      isActive.value = !isActive.value
    }

    watchEffect(() => {
      isActive.value = args.value
    })

    onMounted(() => window.addEventListener('resize', onResize))
    onUnmounted(() => window.removeEventListener('resize', onResize))

    function onResize() {
      square.value = isPlatform('mobile')
    }

    return {
      args,
      square,
      isActive,
      toggle,
      myActiveTab,
    }
  },
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand href="/">Simple Header</bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-end>
      <bal-popover v-model="isActive">
        <bal-button bal-popover-trigger :square="square" color="light" inverted  icon="web" @click="toggle()">
          <span class="is-hidden-mobile">DE</span>
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
      <bal-button :square="square" href="tel://00800 24 800 800" color="light" inverted icon="call">
        <span class="is-hidden-mobile">00800 24 800 800</span>
      </bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
Simple.args = {
  interface: 'simple',
}
Simple.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const Light = args => ({
  components: {
    ...component.components,
    BalLogo,
    BalText,
    BalButton,
    BalButtonGroup,
    BalPopover,
    BalPopoverContent,
    BalList,
    BalListItem,
    BalListItemContent,
    BalListItemTitle,
  },
  setup: () => {
    const isActive = ref(true)
    const square = ref(isPlatform('mobile'))

    const toggle = () => {
      isActive.value = !isActive.value
    }

    watchEffect(() => {
      isActive.value = args.value
    })

    onMounted(() => window.addEventListener('resize', onResize))
    onUnmounted(() => window.removeEventListener('resize', onResize))

    function onResize() {
      square.value = isPlatform('mobile')
    }

    return {
      args,
      square,
      isActive,
      toggle,
    }
  },
  template: `<bal-navbar v-bind="args">
  <bal-navbar-brand logo='https://via.placeholder.com/200x50'>Partner Page</bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-end>
      <bal-popover v-model="isActive">
        <bal-button bal-popover-trigger :square="square" color="light" icon="web" inverted @click="toggle()">
          <span class="is-hidden-mobile">DE</span>
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
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>`,
})
Light.args = {
  interface: 'simple',
  light: 'true',
}
Light.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}
