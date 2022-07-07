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
  template: `<bal-navigation v-bind="args" meta-value="private" main-value="0">
  <bal-navigation-levels> <!-- hidden in the dom but can be grabbed by the mutation observer -->
    <bal-navigation-level-meta value="private" label="Private" link="http://" linkLabel="Zur Privatkundenübersicht">
      <bal-navigation-level-main label="Versichern" link="http://" linkLabel="Alle Versicherungslösungen">
        <bal-navigation-level-block label="Wohnen & Recht" link="http://">
          <bal-navigation-level-block-item label="Haushaltsversicherung" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block color="grey" label="Services">
          <bal-navigation-level-block-item label="Beratung vereinbaren" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main label="Versichern 2" link="http://" linkLabel="Alle Versicherungslösungen">
        <bal-navigation-level-block label="Wohnen & Recht" link="http://">
          <bal-navigation-level-block-item label="Haushaltsversicherung" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block color="grey" label="Services">
          <bal-navigation-level-block-item label="Beratung vereinbaren" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
    <bal-navigation-level-meta label="Unternehmen" link="http://" linkLabel="Zur Unternehmensübersicht">
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
