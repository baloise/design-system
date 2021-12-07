import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../stories/utils'
import { BalSheet, BalButton } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Sheet',
  component: BalSheet,
  argTypes: {
    ...stencilArgType('bal-sheet'),
  },
  parameters: {
    docs: {
      page: docs,
    },
    layout: 'fullscreen',
  },
}

export const Basic = args => ({
  components: { BalSheet, BalButton },
  setup: () => ({ args }),
  template: `<div>
  <div class="container">
    <bal-card>
      <bal-card-title>BaloiseCombi</bal-card-title>
      <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>
      <bal-card-content> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </bal-card-content>
      <bal-card-actions>
        <bal-button>Main Action</bal-button>
        <bal-button color="info" outlined>Secondary Action</bal-button>
      </bal-card-actions>
    </bal-card>
  </div>
  <bal-sheet v-bind="args">
    <div class="is-hidden-desktop">
      <bal-button expanded>Continue with 1'234 CHF</bal-button>
      <bal-button expanded color="link" class="mt-2">Back</bal-button>
    </div>
    <div class="is-hidden-touch">
      <div class="columns">
        <div class="column is-3 is-flex is-align-items-center">
          <h2 class="title is-size-2 m-0">1'234 CHF</h2>
        </div>
        <div class="column is-flex is-align-items-center">
          <p class="m-0 has-text-blue-light-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="column is-2 is-flex is-align-items-center">
          <bal-button expanded color="link">Back</bal-button>
        </div>
        <div class="column is-2 is-flex is-align-items-center">
          <bal-button expanded>Next</bal-button>
        </div>
      </div>
    </div>
  </bal-sheet>
</div>`,
})
Basic.args = {}
