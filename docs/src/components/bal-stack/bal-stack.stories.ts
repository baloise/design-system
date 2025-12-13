import {
  balBrandIconInvestSaveChfRed,
  balBrandIconPiggyBankPurple,
  balBrandIconSafeSavingChildTangerine,
} from '@baloise/ds-brand-icons/dist'
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

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

export const Basic = Story({
  ...withRender(
    () => `
<div class="stack">
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="bg-purple-3 h-2rem w-full"></div>
</div>`,
  ),
})

export const Nested = Story({
  ...withRender(
    () => `
<div class="stack">
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="stack has-space-x-small">
    <div class="bg-yellow-3 h-2rem w-full"></div>
    <div class="stack has-space-large as-row">
      <div class="bg-red-3 h-2rem w-full"></div>
      <div class="bg-red-3 h-2rem w-full"></div>
      <div class="bg-red-3 h-2rem w-full"></div>
    </div>
    <div class="bg-yellow-3 h-2rem w-full"></div>
    <div class="bg-yellow-3 h-2rem w-full"></div>
  </div>
  <div class="bg-purple-3 h-2rem w-full"></div>
</div>`,
  ),
})

export const Item = Story({
  ...withRender(
    () => `
<div class="stack as-row bg-purple-light p-normal radius-normal">
  <bal-icon name="date" size="medium"></bal-icon>
  <div class="stack-content">
    <label class="label">My Item</label>
    <span>Item is used to easaly group components and not be concered about the correct spacing.</span>
  </div>
  <button class="button">Button</button>
</div>`,
  ),
})

export const Direction = Story({
  ...withRender(
    () => `
<div class="stack has-space-large">
  <div class="stack as-row">
    <div class="bg-red-3 p-normal w-full">Row</div>
    <div class="bg-red-3 p-normal w-full">Row</div>
    <div class="bg-red-3 p-normal w-full">Row</div>
  </div>
  <div class="bg-yellow-3 p-normal w-full">Column</div>
  <div class="bg-yellow-3 p-normal w-full">Column</div>
</div>`,
  ),
})

export const Alignment = Story({
  ...withRender(
    () => `
<div class="stack as-col align-center bg-red-light p-normal radius-normal">
  <bal-icon name="date" size="medium"></bal-icon>
  <div class="stack-content align-center">
    <label class="label">My Item</label>
    <span>Item is used to easaly group components and not be concered about the correct spacing.</span>
  </div>
  <button class="button">Button</button>
</div>`,
  ),
})

const spaceBox = (size: string) => `
<div class="stack as-row bg-red-2 has-space-${size}">
  <div class="stack-content bg-green-2">
    <label class="label">${size}</label>
  </div>
  <div class="stack-content bg-green-2">
    <label class="label">${size}</label>
  </div>
  <div class="stack-content bg-green-2">
    <label class="label">${size}</label>
  </div>
</div>
`
export const Space = Story({
  ...withRender(
    () => `<div class="stack">
  ${spaceBox('xx-small')}
  ${spaceBox('x-small')}
  ${spaceBox('small')}
  ${spaceBox('normal')}
  ${spaceBox('medium')}
  ${spaceBox('large')}
  ${spaceBox('x-large')}
  ${spaceBox('xx-large')}
</div>`,
  ),
})

export const Padding = Story({
  ...withRender(
    () => `<div>
  <div class="stack py-medium bg-red-2">
    <div class="stack-content bg-green-2">
      <label class="label">Padding Horizontal Medium</label>
    </div>
  </div>
  <br/>
  <div class="stack px-medium bg-red-2">
    <div class="stack-content bg-green-2">
      <label class="label">Padding Vertical Medium</label>
    </div>
  </div>
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
    ({ ...args }) => `<div class="grid">
  <div class="col is-one-third">
    <article class="card is-purple-light is-fullheight">
      <div class="card-content">
        <div class="stack align-center has-space-large">
          <bal-icon svg='${balBrandIconPiggyBankPurple}' color="auto" size="xx-large"></bal-icon>
          <div class="stack-content align-top-center">
            <h3 class="title">Teaser Card</h3>
            The item component can easily be combined with the card component to achieve a nice
            teaser layout.
          </div>
          <button class="button">Button</button>
        </div>
      </div>
    </article>
  </div>
  <div class="col is-one-third">
    <article class="card is-yellow-light is-fullheight">
      <div class="card-content">
        <div class="stack align-center has-space-large">
          <bal-icon svg='${balBrandIconSafeSavingChildTangerine}' color="auto" size="xx-large"></bal-icon>
          <div class="stack-content align-top-center">
            <h3 class="title">Auto Height</h3>
            The height of the cards adjust to the longest in the row.
          </div>
          <button class="button">Button</button>
        </div>
      </div>
    </article>
  </div>
  <div class="col is-one-third">
      <article class="card is-red-light is-fullheight">
      <div class="card-content">
        <div class="stack align-center has-space-large">
          <bal-icon svg='${balBrandIconInvestSaveChfRed}' color="auto" size="xx-large"></bal-icon>
          <div class="stack-content align-top-center">
            <h3 class="title">Item Component</h3>
            Item is used to easaly group components and not be concered about the correct spacing.
          </div>
          <button class="button">Button</button>
        </div>
      </div>
    </article>
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
