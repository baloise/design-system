import docs from './readme.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import {
  BalApp,
  BalCard,
  BalFooter,
  BalButton,
  BalCardActions,
  BalCardTitle,
  BalCardSubtitle,
  BalCardContent,
  BalNavbar,
  BalNavbarBrand,
  BalText,
  BalIcon,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalApp,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

export const Basic = args => ({
  components: {
    BalApp,
    BalCard,
    BalFooter,
    BalButton,
    BalCardActions,
    BalCardTitle,
    BalCardSubtitle,
    BalCardContent,
    BalNavbar,
    BalNavbarBrand,
    BalText,
    BalIcon,
  },
  setup: () => ({ args }),
  template: `<bal-app v-bind="args">
  <header class="has-background-white">
    <bal-navbar no-burger>
      <bal-navbar-brand>
        <bal-icon name="logo" inverted size="large"></bal-icon>
        <bal-text style="margin-left: 15px">Portal</bal-text>
      </bal-navbar-brand>
    </bal-navbar>
  </header>
  <main>
    <div class="container">
      <bal-card class="has-margin-top">
        <bal-card-title>BaloiseCombi</bal-card-title>
        <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>

        <bal-card-content>{{ args.content }}</bal-card-content>

        <bal-card-actions>
          <bal-button>Action</bal-button>
          <bal-button>Action 2</bal-button>
        </bal-card-actions>
      </bal-card>
    </div>
  </main>

  <bal-footer has-track-line hide-links>
    <div class="container">
      <span style="margin-right: 16px">Baloise Group</span>
      <span style="margin-right: 16px">Legal notice</span>
      <span style="margin-right: 16px">Cookie policy</span>
      <span>Data protection</span>
    </div>
  </bal-footer>
  </bal-app>`,
})
Basic.args = {
  background: true,
  hasStickyFooter: true,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}
Basic.parameters = { ...component.sourceCode(Basic) }
