import docs from './bal-sheet.docs.mdx'
import { BalComponentStory, withContent } from '../../../../stories/utils'
import {
  BalSheet,
  BalButton,
  BalCard,
  BalCardTitle,
  BalCardSubtitle,
  BalCardContent,
  BalCardActions,
} from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Notice/Sheet',
  component: BalSheet,
  status: 'stable',
  argTypes: {
    ...withContent(),
  },
  docs,
  layout: 'fullscreen',
})

export default component.story

export const Basic = args => ({
  components: {
    ...component.components,
    BalButton,
    BalCard,
    BalCardTitle,
    BalCardSubtitle,
    BalCardContent,
    BalCardActions,
  },
  setup: () => ({ args }),
  template: `<div>
  <div class="container is-compact mb-10">
    <bal-card>
      <bal-card-title>BaloiseCombi</bal-card-title>
      <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>
      <bal-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</bal-card-content>
      <bal-card-actions position="right">
        <bal-button>Main Action</bal-button>
        <bal-button color="info" outlined>Secondary Action</bal-button>
      </bal-card-actions>
    </bal-card>
  </div>
  <bal-sheet v-bind="args">
    <div class="is-hidden-tablet">
      <bal-button expanded>Continue with 1'234 CHF</bal-button>
      <bal-button expanded color="info" class="mt-2">Back</bal-button>
    </div>
    <div class="is-hidden-mobile">
      <div class="is-flex is-align-items-center fg-4">
        <h5 class="title is-size-5 m-0">1'234 CHF</h5>
        <p class="has-text-blue-light-text is-small m-0 is-flex-grow-1">{{ args.content }}</p>
        <bal-button-group>
          <bal-button color="info">Back</bal-button>
          <bal-button>Next</bal-button>
        </bal-button-group>
      </div>
    </div>
  </bal-sheet>
</div>`,
})
Basic.args = {
  content: 'Lorem ipsum dolor',
}
Basic.parameters = { ...component.sourceCode(Basic) }

// <div class="columns">
// <div class="column is-3 is-flex is-align-items-center px-2">
//   <h3 class="title is-size-3 m-0">1'234 CHF</h3>
// </div>
// <div class="column is-flex is-align-items-center px-2">
//   <p class="m-0 has-text-blue-light-text is-small">{{ args.content }}</p>
// </div>
// <div class="column is-2 is-flex is-align-items-center px-2">
//   <bal-button expanded color="link">Back</bal-button>
// </div>
// <div class="column is-3 is-flex is-align-items-center px-2">
//   <bal-button expanded>Next</bal-button>
// </div>
// </div>
