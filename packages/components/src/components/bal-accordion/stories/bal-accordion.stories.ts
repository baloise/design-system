import docs from './bal-accordion.docs.mdx'
import { withContent, BalComponentStory } from '../../../stories/utils'
import {
  BalAccordion,
  BalCard,
  BalCardContent,
  BalCardTitle,
  BalCardSubtitle,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalAccordion,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-accordion v-bind="args" v-model="args.value">
  <p class="p-medium">
   {{ args.content }}
  </p>
  </bal-accordion>`,
})
Basic.args = {
  openLabel: 'Show more',
  closeLabel: 'Show less',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const WithIcons = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-accordion open-icon="edit" open-label="Bearbeiten" close-label="Schliessen" close-icon="close">
  <p class="p-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>`,
})
WithIcons.args = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}
WithIcons.parameters = { ...component.sourceCode(WithIcons) }

export const WithCard = args => ({
  components: {
    ...component.components,
    BalCard,
    BalCardContent,
    BalCardTitle,
    BalCardSubtitle,
  },
  setup: () => ({ args }),
  template: `<bal-card>
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>
  <bal-accordion card v-bind="args">
    <p class="p-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>
</bal-card>`,
})
WithCard.args = {
  openLabel: 'Show more',
  closeLabel: 'Show less',
}
WithCard.parameters = { ...component.sourceCode(WithCard) }

export const WithTabs = args => ({
  components: {
    ...component.components,
    BalCard,
    BalCardContent,
    BalCardTitle,
    BalCardSubtitle,
  },
  setup: () => ({ args }),
  template: `<bal-accordion v-bind="args">
    <bal-tabs interface="tabs" value="tab-b" class="p-normal">
      <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
      <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
      <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
    </bal-tabs>
  </bal-accordion>`,
})
WithTabs.args = {
  openLabel: 'Show more',
  closeLabel: 'Show less',
}
WithTabs.parameters = { ...component.sourceCode(WithTabs) }
