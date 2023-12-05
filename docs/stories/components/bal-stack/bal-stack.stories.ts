import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'
import { balBrandIconPiggyBankPurple } from '@baloise/design-system-brand-icons'
import { balBrandIconInvestSaveChfRed } from '@baloise/design-system-brand-icons'
import { balBrandIconSafeSavingChildTangerine } from '@baloise/design-system-brand-icons'

type Args = JSX.BalStack & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Stack',
  argTypes: {
    ...withComponentControls({ tag: 'bal-stack' }),
  },
  ...withRender(
    () => `<bal-stack>
  <bal-icon name="date" size="medium"></bal-icon>
  <bal-content>
    <bal-label>My Item</bal-label>
    <bal-text>Item is used to easaly group components and not be concered about the correct spacing.</bal-text>
  </bal-content>
  <bal-button>Button</bal-button>
</bal-stack>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Direction = Story({
  args: {
    layout: 'vertical',
  },
  ...withRender(
    ({ ...args }) => `<bal-stack ${props(args)}>
  <bal-icon name="date" size="medium"></bal-icon>
  <bal-content>
    <bal-label>My Item</bal-label>
    <bal-text>Item is used to easaly group components and not be concered about the correct spacing.</bal-text>
  </bal-content>
  <bal-button>Button</bal-button>
</bal-stack>`,
  ),
})

export const Alignment = Story({
  args: {
    layout: 'vertical',
    align: 'center',
    space: 'large',
  },
  ...withRender(
    ({ ...args }) => `<bal-stack ${props(args)}>
  <bal-icon name="date" size="medium"></bal-icon>
  <bal-content align="center">
    <bal-label>My Item</bal-label>
    <bal-text>Item is used to easaly group components and not be concered about the correct spacing.</bal-text>
  </bal-content>
  <bal-button>Button</bal-button>
</bal-stack>`,
  ),
})

export const Space = Story({
  ...withRender(
    () => `<div>
  <bal-stack class="has-background-red-2">
    <bal-content class="has-background-green-2">
      <bal-label>Space Default</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space Default</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space Default</bal-label>
    </bal-content>
  </bal-stack>
  <bal-stack space="large" class="has-background-red-2 my-large">
    <bal-content class="has-background-green-2">
      <bal-label>Space Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space Large</bal-label>
    </bal-content>
  </bal-stack>
  <bal-stack space="x-large" class="has-background-red-2 my-large">
    <bal-content class="has-background-green-2">
      <bal-label>Space X-Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space X-Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space X-Large</bal-label>
    </bal-content>
  </bal-stack>
  <bal-stack space="xx-large" class="has-background-red-2">
    <bal-content class="has-background-green-2">
      <bal-label>Space XX-Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space XX-Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space XX-Large</bal-label>
    </bal-content>
  </bal-stack>
</div>`,
  ),
})

export const Padding = Story({
  ...withRender(
    () => `<div>
  <bal-stack py="medium" class="has-background-red-2">
    <bal-content class="has-background-green-2">
      <bal-label>Padding Horizontal Medium</bal-label>
    </bal-content>
  </bal-stack>
  <br/>
  <bal-stack px="medium" class="has-background-red-2">
    <bal-content class="has-background-green-2">
      <bal-label>Padding Vertical Medium</bal-label>
    </bal-content>
  </bal-stack>
</div>`,
  ),
})

export const TeaserCards = Story({
  args: {
    layout: 'vertical',
    align: 'center',
    space: 'large',
  },
  ...withRender(
    ({ ...args }) => `<div class="columns">
  <div class="column is-one-third">
    <bal-card color="purple-light" fullheight="true">
      <bal-card-content>
        <bal-stack ${props(args)}>
          <bal-icon svg='${balBrandIconPiggyBankPurple}' color="auto" size="xx-large"></bal-icon>
          <bal-content align="center">
            <bal-heading level="x-large">Teaser Card</bal-heading>
            <bal-text>The item component can easily be combined with the card component to achieve a nice
            teaser layout.</bal-text>
          </bal-content>
          <bal-button>Button</bal-button>
        </bal-stack>
      </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card color="yellow-light" fullheight="true">
      <bal-card-content>
        <bal-stack ${props(args)}>
          <bal-icon svg='${balBrandIconSafeSavingChildTangerine}' color="auto" size="xx-large"></bal-icon>
          <bal-content align="center">
            <bal-heading level="x-large">Auto Height</bal-heading>
            <bal-text>The height of the cards adjust to the longest in the row.</bal-text>
          </bal-content>
          <bal-button>Button</bal-button>
        </bal-stack>
      </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card color="red-light" fullheight="true">
      <bal-card-content>
        <bal-stack ${props(args)}>
          <bal-icon svg='${balBrandIconInvestSaveChfRed}' color="auto" size="xx-large"></bal-icon>
          <bal-content align="center">
            <bal-heading level="x-large">Item Component</bal-heading>
            <bal-text>Item is used to easaly group components and not be concered about the correct spacing.</bal-text>
          </bal-content>
          <bal-button>Button</bal-button>
        </bal-stack>
      </bal-card-content>
    </bal-card>
  </div>
</div>`,
  ),
})

export const StackedTabs = Story({
  args: {
    align: 'center',
    space: 'normal',
  },
  ...withRender(
    ({ ...args }) => `<bal-stack ${props(args)}>
  <bal-tabs value="tab-a">
    <bal-tab-item value="tab-a" label="Tab A Tab A Tab A"></bal-tab-item>
    <bal-tab-item value="tab-b" label="Tab B Tab B Tab B"></bal-tab-item>
    <bal-tab-item value="tab-c" label="Tab C Tab C Tab C"></bal-tab-item>
    <bal-tab-item value="tab-d" label="Tab D Tab D Tab D"></bal-tab-item>
    <bal-tab-item value="tab-e" label="Tab E Tab E Tab E Tab E Tab E Tab E"></bal-tab-item>
    <bal-tab-item value="tab-f" label="Tab F Tab F Tab F Tab F Tab F Tab F"></bal-tab-item>
    <bal-tab-item value="tab-g" label="Tab G Tab G Tab G Tab G Tab G Tab G"></bal-tab-item>
  </bal-tabs>
  <bal-button no-wrap>Click me!</bal-button>
</bal-stack>`,
  ),
})
