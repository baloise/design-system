import {
  BrandIconInvestSaveChfRed,
  BrandIconPiggyBankPurple,
  BrandIconSafeSavingChildTangerine,
} from '@baloise/ds-assets/dist'
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsStack

const meta: Meta<Args> = {
  title: 'Components/Stack/Variants',
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

export const BasicHtml = Story({
  ...withRender(
    () => `
<div class="stack">
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="bg-purple-3 h-2rem w-full"></div>
</div>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Basic = Story({
  ...withRender(
    () => `
<ds-stack>
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="bg-purple-3 h-2rem w-full"></div>
</ds-stack>`,
  ),
})
Basic.storyName = '🧩 Basic'

export const Nested = Story({
  ...withRender(
    () => `
<ds-stack>
  <div class="bg-purple-3 h-2rem w-full"></div>
  <ds-stack space="xs">
    <div class="bg-yellow-3 h-2rem w-full"></div>
    <ds-stack space="lg" direction="row">
      <div class="bg-red-3 h-2rem w-full"></div>
      <div class="bg-red-3 h-2rem w-full"></div>
      <div class="bg-red-3 h-2rem w-full"></div>
    </ds-stack>
    <div class="bg-yellow-3 h-2rem w-full"></div>
    <div class="bg-yellow-3 h-2rem w-full"></div>
  </ds-stack>
  <div class="bg-purple-3 h-2rem w-full"></div>
</ds-stack>`,
  ),
})
Nested.storyName = '🧩 Nested'

export const NestedHtml = Story({
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
NestedHtml.storyName = '🌍 Nested'

export const Item = Story({
  ...withRender(
    () => `
<ds-stack direction="row" class="bg-purple-light p-base radius">
  <ds-icon name="date" size="md"></ds-icon>
  <ds-content>
    <ds-label>My Item</ds-label>
    <ds-text>Item is used to easaly group components and not be concered about the correct spacing.</ds-text>
  </ds-content>
  <ds-button>Button</ds-button>
</ds-stack>`,
  ),
})
Item.storyName = '🧩 Item'

export const ItemHtml = Story({
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
ItemHtml.storyName = '🌍 Item'

export const Direction = Story({
  ...withRender(
    () => `
<ds-stack space="lg">
  <ds-stack direction="row">
    <div class="bg-red-3 p-base w-full">Row</div>
    <div class="bg-red-3 p-base w-full">Row</div>
    <div class="bg-red-3 p-base w-full">Row</div>
  </ds-stack>
  <div class="bg-yellow-3 p-base w-full">Column</div>
  <div class="bg-yellow-3 p-base w-full">Column</div>
</ds-stack>`,
  ),
})
Direction.storyName = '🧩 Direction'

export const DirectionHtml = Story({
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
DirectionHtml.storyName = '🌍 Direction'

export const Alignment = Story({
  ...withRender(
    () => `
<ds-stack align="center" class="bg-red-light p-base radius">
  <ds-icon name="date" size="md"></ds-icon>
  <ds-content class="align-top-center">
    <ds-label>My Item</ds-label>
    <ds-text>Item is used to easaly group components and not be concered about the correct spacing.</ds-text>
  </ds-content>
  <ds-button>Button</ds-button>
</ds-stack>`,
  ),
})
Alignment.storyName = '🧩 Alignment'

export const AlignmentHtml = Story({
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
AlignmentHtml.storyName = '🌍 Alignment'

const spaceBoxWC = (size: string) => `
<ds-stack direction="row" space="${size}" class="bg-red-2">
  <ds-content class="bg-green-2">
    <ds-label>${size}</ds-label>
  </ds-content>
  <ds-content class="bg-green-2">
    <ds-label>${size}</ds-label>
  </ds-content>
  <ds-content class="bg-green-2">
    <ds-label>${size}</ds-label>
  </ds-content>
</ds-stack>
`

export const Space = Story({
  ...withRender(
    () => `<ds-stack>
  ${spaceBoxWC('2xs')}
  ${spaceBoxWC('xs')}
  ${spaceBoxWC('sm')}
  ${spaceBoxWC('base')}
  ${spaceBoxWC('md')}
  ${spaceBoxWC('lg')}
  ${spaceBoxWC('xl')}
  ${spaceBoxWC('2xl')}
</ds-stack>`,
  ),
})
Space.storyName = '🧩 Space'

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
export const SpaceHtml = Story({
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
SpaceHtml.storyName = '🌍 Space'

export const Padding = Story({
  ...withRender(
    () => `<div>
  <ds-stack py="md" class="bg-red-2">
    <ds-content class="bg-green-2">
      <ds-label>Padding Horizontal Medium</ds-label>
    </ds-content>
  </ds-stack>
  <br/>
  <ds-stack px="md" class="bg-red-2">
    <ds-content class="bg-green-2">
      <ds-label>Padding Vertical Medium</ds-label>
    </ds-content>
  </ds-stack>
</div>`,
  ),
})
Padding.storyName = '🧩 Padding'

export const PaddingHtml = Story({
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
PaddingHtml.storyName = '🌍 Padding'

export const TeaserCards = Story({
  ...withRender(
    () => `<div class="grid">
  <div class="col is-one-third">
    <article class="card is-purple-light is-fullheight">
      <div class="card-content">
        <ds-stack align="center" space="lg">
          <ds-icon svg='${BrandIconPiggyBankPurple}' color="auto" size="2xl"></ds-icon>
          <ds-content class="align-top-center">
            <h3 class="title is-centered">Teaser Card</h3>
            The item component can easily be combined with the card component to achieve a nice
            teaser layout.
          </ds-content>
          <ds-button>Button</ds-button>
        </ds-stack>
      </div>
    </article>
  </div>
  <div class="col is-one-third">
    <article class="card is-yellow-light is-fullheight">
      <div class="card-content">
        <ds-stack align="center" space="lg">
          <ds-icon svg='${BrandIconSafeSavingChildTangerine}' color="auto" size="2xl"></ds-icon>
          <ds-content class="align-top-center">
            <h3 class="title is-centered">Auto Height</h3>
            The height of the cards adjust to the longest in the row.
          </ds-content>
          <ds-button>Button</ds-button>
        </ds-stack>
      </div>
    </article>
  </div>
  <div class="col is-one-third">
    <article class="card is-red-light is-fullheight">
      <div class="card-content">
        <ds-stack align="center" space="lg">
          <ds-icon svg='${BrandIconInvestSaveChfRed}' color="auto" size="2xl"></ds-icon>
          <ds-content class="align-top-center">
            <h3 class="title is-centered">Item Component</h3>
            Item is used to easaly group components and not be concered about the correct spacing.
          </ds-content>
          <ds-button>Button</ds-button>
        </ds-stack>
      </div>
    </article>
  </div>
</div>`,
  ),
})
TeaserCards.storyName = '🧩 Teaser Cards'

export const TeaserCardsHtml = Story({
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
TeaserCardsHtml.storyName = '🌍 Teaser Cards'

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
StackedTabs.storyName = '🧩 Stacked Tabs'
