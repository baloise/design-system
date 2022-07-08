import docs from './bal-navigation.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalNavigation, BalNavigationLevels, BalNavigationLevelMeta } from '../../../../.storybook/vue/components'
import { ref, watchEffect } from 'vue'

const component = BalComponentStory({
  title: 'Components/Navigation',
  component: BalNavigation,
  subcomponents: { BalNavigationLevels, BalNavigationLevelMeta },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => {
    const isActive = ref(true)
    const modal = ref()

    function openModal() {
      modal.value?.open()
    }

    const toggle = () => {
      isActive.value = !isActive.value
    }

    watchEffect(() => {
      isActive.value = args.value
    })

    return {
      args,
      isActive,
      modal,
      toggle,
      openModal,
    }
  },
  template: `<bal-navigation v-bind="args" meta-value="meta-1" main-value="meta-1-main-1">
  <bal-navigation-levels> <!-- hidden in the dom but can be grabbed by the mutation observer -->
    <bal-navigation-level-meta value="meta-1" label="Meta 1" link="http://" linkLabel="Go to Meta 1 Overview">
      <bal-navigation-level-main value="meta-1-main-1" label="Meta Main 1" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 1 Main 1 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 2" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block label="Meta 1 Main 1 Block 2" link="http://">
          <bal-navigation-level-block-item label="Item 3" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block color="grey" label="Services">
          <bal-navigation-level-block-item label="Service A" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Service B" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block label="Meta 1 Main 1 Block 2" link="http://">
          <bal-navigation-level-block-item label="Item 4" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 5" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 6" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-2" label="Meta 1 Main 2" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 1 Main 2 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
    <bal-navigation-level-meta value="meta-2" label="Meta 2" link="http://" linkLabel="Go to Meta 1 Overview">
      <bal-navigation-level-main value="meta-2-main-1" label="Meta 2 Main 1" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 2 Main 1 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 2" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
  </bal-navigation-levels>

  <bal-button-group slot="meta-actions">
    <bal-button href="tel://00800 24 800 800" square size="small" color="light" inverted icon="call"></bal-button>
    <bal-button square size="small" color="light" inverted icon="web" @click="openModal()"></bal-button>
    <bal-modal ref="modal">
      <bal-modal-header>Modal Title</bal-modal-header>
      <bal-modal-body>
        <bal-heading class="is-flex is-justify-content-center" level="h4">Sprache wählen</bal-heading>
        <bal-button class="mb-2" expanded color="light">English</bal-button>
        <bal-button class="mb-2" expanded color="light">Deutsch</bal-button>
        <bal-button class="mb-2" expanded color="light">Français</bal-button>
      </bal-modal-body>
    </bal-modal>
    <bal-button square size="small" color="light" inverted icon="location"></bal-button>
    <bal-button square size="small" color="light" inverted icon="search"></bal-button>
    <bal-popover v-model="isActive">
      <bal-button bal-popover-trigger color="light" inverted size="small" icon="account" @click="toggle()">Login</bal-button>
      <bal-popover-content class="p-2 mt-2" style="border-radius: 12px;">
        <bal-tabs slot="account" border fullwidth interface="tabs" value="tab-a">
          <bal-tab-item value="tab-a" label="myBaloise">Content of Tab A</bal-tab-item>
          <bal-tab-item value="tab-b" label="E-Banking">Content of Tab B</bal-tab-item>
        </bal-tabs>
      </bal-popover-content>
    </bal-popover>
  </bal-button-group>
</bal-navigation>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
