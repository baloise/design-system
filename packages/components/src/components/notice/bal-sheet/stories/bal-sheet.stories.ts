import docs from './bal-sheet.docs.mdx'
import { BalComponentStory, withContent } from '../../../../stories/utils'
import { BalSheet, BalButton, BalCard } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Notice/Sheet',
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
  },
  setup: () => ({ args }),
  template: `<div>
  <div class="container is-compact mb-10">
    <bal-card class="p-5">
      <bal-heading title level="h4">BaloiseCombi</bal-heading>
      <bal-heading subtitle level="h5" color="info">Police number 70/2.937.458</bal-heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

      <bal-button-group position="right">
        <bal-button>Main Action</bal-button>
        <bal-button color="info" outlined>Secondary Action</bal-button>
      </bal-button-group>
    </bal-card>
  </div>
  <bal-sheet v-bind="args">
    <div class="is-hidden-tablet">
      <bal-button expanded>Continue with 1'234 CHF</bal-button>
      <bal-button expanded color="link" class="mt-2">Back</bal-button>
    </div>
    <div class="is-hidden-mobile">
      <div class="columns">
        <div class="column is-3 is-flex is-align-items-center px-2">
          <h3 class="title is-size-3 m-0">1'234 CHF</h3>
        </div>
        <div class="column is-flex is-align-items-center px-2">
          <p class="m-0 has-text-blue-light-text is-small">{{ args.content }}</p>
        </div>
        <div class="column is-2 is-flex is-align-items-center px-2">
          <bal-button expanded color="link">Back</bal-button>
        </div>
        <div class="column is-3 is-flex is-align-items-center px-2">
          <bal-button expanded>Next</bal-button>
        </div>
      </div>
    </div>
  </bal-sheet>
</div>`,
})
Basic.args = {
  content: 'Lorem ipsum dolor',
}
Basic.parameters = { ...component.sourceCode(Basic) }
