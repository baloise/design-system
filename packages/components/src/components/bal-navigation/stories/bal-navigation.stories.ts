import docs from './bal-navigation.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalNavigation, BalNavigationLevels, BalNavigationLevelMeta } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Navigation',
  component: BalNavigation,
  subcomponents: { BalNavigationLevels, BalNavigationLevelMeta },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-navigation v-bind="args" meta-value="meta-1" main-value="meta-1-main-2">
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
    <bal-button bal-popover-trigger color="light" inverted icon="web" square size="small">  </bal-button>
  </bal-button-group>
</bal-navigation>
<div class="container mt-6">
  <h1 class="title is-1">Heading</h1>
</div>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
