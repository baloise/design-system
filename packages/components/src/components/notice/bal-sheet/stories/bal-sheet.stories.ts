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
} from '../../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Layout/Sheet',
  component: BalSheet,
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
  <div class="container is-compact mb-xx-small0">
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
    <bal-stack layout="vertical" space="small" class="is-hidden-tablet">
      <bal-button expanded>Continue with 1'234 CHF</bal-button>
      <bal-button expanded color="info">Back</bal-button>
    </bal-stack>
    <bal-stack class="is-hidden-mobile">
      <bal-heading level="p" visual-level="h4">1'234 CHF</bal-heading>
      <bal-content>
        <p class="has-text-blue-light-text is-size-small m-none is-flex-grow-1">{{ args.content }}</p>
      </bal-content>
      <bal-button-group>
        <bal-button color="info">Back</bal-button>
        <bal-button>Next</bal-button>
      </bal-button-group>
    </bal-stack>
  </bal-sheet>
</div>`,
})
Basic.args = {
  content: 'Lorem ipsum dolor',
  containerSize: 'compact',
}
Basic.parameters = { ...component.sourceCode(Basic) }
