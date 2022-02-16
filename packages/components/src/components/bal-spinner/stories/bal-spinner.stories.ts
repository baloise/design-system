import docs from './bal-spinner.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalSpinner, BalCard, BalCardContent } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalSpinner,
  docs,
  status: 'stable',
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-spinner v-bind="args"></bal-spinner>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const LoadingButton = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-button loading disabled>Button</bal-button>`,
})
LoadingButton.args = {}
LoadingButton.parameters = { ...component.sourceCode(LoadingButton) }

export const LoadingCard = args => ({
  components: { ...component.components, BalCard, BalCardContent },
  setup: () => ({ args }),
  template: `<bal-card>
  <bal-card-content class="is-flex is-justify-content-center">
    <bal-spinner v-bind="args" class="my-5"></bal-spinner>
    <bal-heading level="h5" space="all">Please wait...</bal-heading>
  </bal-card-content>
</bal-card>`,
})
LoadingCard.args = {}
LoadingCard.parameters = { ...component.sourceCode(LoadingCard) }
