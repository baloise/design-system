import docs from './readme.docs.mdx'
import { withContent, BalComponentStory } from '../../../stories/utils'
import { BalAccordion, BalCard, BalCardTitle, BalCardSubtitle } from '../../../../.storybook/vue/components'

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
  template: `<bal-accordion v-bind="args" class="box">
  <p class="p-4">
   {{ args.content }}
  </p>
  </bal-accordion>`,
})
Basic.args = {
  openLabel: 'Show detail',
  closeLabel: 'Show detail',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const WithIcons = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-accordion class="box" open-icon="edit" open-label="Bearbeiten" close-label="Schliessen" close-icon="close">
  <p class="p-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>`,
})
WithIcons.args = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}
WithIcons.parameters = { ...component.sourceCode(WithIcons) }

export const WithCard = args => ({
  components: { ...component.components, BalCard, BalCardTitle, BalCardSubtitle },
  setup: () => ({ args }),
  template: `<bal-card>
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>

  <bal-accordion card>
    <p class="p-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>
  </bal-card>`,
})
WithCard.args = {}
WithCard.parameters = { ...component.sourceCode(WithCard) }
