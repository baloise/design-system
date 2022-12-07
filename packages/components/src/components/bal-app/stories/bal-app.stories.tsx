import docs from './bal-app.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import {
  BalApp,
  BalCard,
  BalCardTitle,
  BalCardSubtitle,
  BalCardContent,
  BalCardActions,
  BalFooter,
  BalButton,
  BalNavbar,
  BalNavbarBrand,
  BalText,
  BalIcon,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalApp,
  argTypes: {
    hasStickyFooter: {
      description: 'Sets the footer sticky to the bottom',
      table: {
        category: 'CSS Classes',
      },
      control: { type: 'boolean' },
    },
  },
  docs,
})

export default component.story

export const Basic = args => ({
  components: {
    BalApp,
    BalCard,
    BalCardTitle,
    BalCardSubtitle,
    BalCardContent,
    BalCardActions,
    BalFooter,
    BalButton,
    BalNavbar,
    BalNavbarBrand,
    BalText,
    BalIcon,
  },
  setup: () => ({ args }),
  template: `<bal-app v-bind="args" :class="{'has-sticky-footer': args.hasStickyFooter}">
  <header class="has-background-white">
    <bal-navbar>
      <bal-navbar-brand>Portal</bal-navbar-brand>
    </bal-navbar>
  </header>
  <main>
    <div class="container">
      <bal-card class="my-large">
        <bal-card-title>BaloiseCombi</bal-card-title>
        <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>

        <bal-card-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>

        <bal-card-actions position="right">
          <bal-button>Action</bal-button>
          <bal-button>Action 2</bal-button>
        </bal-card-actions>
      </bal-card>
    </div>
  </main>

  <bal-footer has-track-line></bal-footer>
  </bal-app>`,
})
Basic.args = {
  hasBackground: false,
  hasStickyFooter: false,
}
Basic.parameters = { ...component.sourceCode(Basic) }
