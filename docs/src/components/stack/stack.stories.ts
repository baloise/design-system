import {
  BrandIconInvestSaveChfRed,
  BrandIconPiggyBankPurple,
  BrandIconSafeSavingChildTangerine,
} from '@baloise/ds-assets/dist'
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.BalStack & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Stack',
  argTypes: {
    ...withComponentControls({ tag: 'ds-stack' }),
  },
  ...withRender(
    () => `<ds-stack>
  <ds-icon name="date" size="md"></ds-icon>
  <ds-content>
    <ds-label>My Item</ds-label>
    <ds-text>Item is used to easaly group components and not be concered about the correct spacing.</ds-text>
  </ds-content>
  <ds-button>Button</ds-button>
</ds-stack>`,
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
  <div class="stack has-space-xs">
    <div class="bg-yellow-3 h-2rem w-full"></div>
    <div class="stack has-space-lg as-row">
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
<div class="stack as-row bg-purple-light p-base radius">
  <ds-icon name="date" size="md"></ds-icon>
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
<div class="stack has-space-lg">
  <div class="stack as-row">
    <div class="bg-red-3 p-base w-full">Row</div>
    <div class="bg-red-3 p-base w-full">Row</div>
    <div class="bg-red-3 p-base w-full">Row</div>
  </div>
  <div class="bg-yellow-3 p-base w-full">Column</div>
  <div class="bg-yellow-3 p-base w-full">Column</div>
</div>`,
  ),
})

export const Alignment = Story({
  ...withRender(
    () => `
<div class="stack as-col align-center bg-red-light p-base radius">
  <ds-icon name="date" size="md"></ds-icon>
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
  ${spaceBox('2xs')}
  ${spaceBox('xs')}
  ${spaceBox('sm')}
  ${spaceBox('base')}
  ${spaceBox('md')}
  ${spaceBox('lg')}
  ${spaceBox('xl')}
  ${spaceBox('2xl')}
</div>`,
  ),
})

export const Padding = Story({
  ...withRender(
    () => `<div>
  <div class="stack py-md bg-red-2">
    <div class="stack-content bg-green-2">
      <label class="label">Padding Horizontal Medium</label>
    </div>
  </div>
  <br/>
  <div class="stack px-md bg-red-2">
    <div class="stack-content bg-green-2">
      <label class="label">Padding Vertical Medium</label>
    </div>
  </div>
</div>`,
  ),
})

export const TeaserCards = Story({
  ...withRender(
    ({ ...args }) => `<div class="grid">
  <div class="col is-one-third">
    <article class="card is-purple-light is-fullheight">
      <div class="card-content">
        <div class="stack align-center has-space-lg">
          <ds-icon svg='${BrandIconPiggyBankPurple}' color="auto" size="2xl"></ds-icon>
          <div class="stack-content align-top-center">
            <h3 class="title is-centered">Teaser Card</h3>
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
        <div class="stack align-center has-space-lg">
          <ds-icon svg='${BrandIconSafeSavingChildTangerine}' color="auto" size="2xl"></ds-icon>
          <div class="stack-content align-top-center">
            <h3 class="title is-centered">Auto Height</h3>
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
        <div class="stack align-center has-space-lg">
          <ds-icon svg='${BrandIconInvestSaveChfRed}' color="auto" size="2xl"></ds-icon>
          <div class="stack-content align-top-center">
            <h3 class="title is-centered">Item Component</h3>
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
    space: 'base',
  },
  ...withRender(
    ({ ...args }) => `<ds-stack ${props(args)}>
  <ds-tabs value="tab-a">
    <ds-tab-item value="tab-a" label="Tab A Tab A Tab A"></ds-tab-item>
    <ds-tab-item value="tab-b" label="Tab B Tab B Tab B"></ds-tab-item>
    <ds-tab-item value="tab-c" label="Tab C Tab C Tab C"></ds-tab-item>
    <ds-tab-item value="tab-d" label="Tab D Tab D Tab D"></ds-tab-item>
    <ds-tab-item value="tab-e" label="Tab E Tab E Tab E Tab E Tab E Tab E"></ds-tab-item>
    <ds-tab-item value="tab-f" label="Tab F Tab F Tab F Tab F Tab F Tab F"></ds-tab-item>
    <ds-tab-item value="tab-g" label="Tab G Tab G Tab G Tab G Tab G Tab G"></ds-tab-item>
  </ds-tabs>
  <ds-button no-wrap>Click me!</ds-button>
</ds-stack>`,
  ),
})
