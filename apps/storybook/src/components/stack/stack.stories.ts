import {
  BrandIconInvestSaveChfRed,
  BrandIconPiggyBankPurple,
  BrandIconSafeSavingChildTangerine,
} from '@baloise/ds-assets'
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
    ({ slot, ...args }) => `<ds-stack ${props(args)}>
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
<div class="ds-stack">
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="bg-purple-3 h-2rem w-full"></div>
</div>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Basic = Story({
  ...withRender(
    ({ slot, ...args }) => `
<ds-stack ${props(args)}>
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
<div class="ds-stack">
  <div class="bg-purple-3 h-2rem w-full"></div>
  <div class="ds-stack has-space-xs">
    <div class="bg-yellow-3 h-2rem w-full"></div>
    <div class="ds-stack has-space-lg as-row">
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
<div class="ds-stack as-row bg-purple-light p-base radius">
  <ds-icon name="date" size="md"></ds-icon>
  <div class="ds-stack-content">
    <label class="ds-label">My Item</label>
    <span>Item is used to easaly group components and not be concered about the correct spacing.</span>
  </div>
  <button class="ds-button">Button</button>
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
<div class="ds-stack has-space-lg">
  <div class="ds-stack as-row">
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
  <ds-icon name="date" size="lg"></ds-icon>
  <ds-content class="align-top-center">
    <ds-heading level="h3">My Item</ds-heading>
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
<div class="ds-stack as-col align-center bg-red-light p-base radius">
  <ds-icon name="date" size="lg"></ds-icon>
  <div class="ds-stack-content align-center">
    <h3 class="ds-title">My Item</h3>
    <span>Item is used to easaly group components and not be concered about the correct spacing.</span>
  </div>
  <button class="ds-button">Button</button>
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
<div class="ds-stack as-row bg-red-2 has-space-${size}">
  <div class="ds-stack-content bg-green-2">
    <label class="ds-label">${size}</label>
  </div>
  <div class="ds-stack-content bg-green-2">
    <label class="ds-label">${size}</label>
  </div>
  <div class="ds-stack-content bg-green-2">
    <label class="ds-label">${size}</label>
  </div>
</div>
`
export const SpaceHtml = Story({
  ...withRender(
    () => `<div class="ds-stack">
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
  <div class="ds-stack py-md bg-red-2">
    <div class="ds-stack-content bg-green-2">
      <label class="ds-label">Padding Horizontal Medium</label>
    </div>
  </div>
  <br/>
  <div class="ds-stack px-md bg-red-2">
    <div class="ds-stack-content bg-green-2">
      <label class="ds-label">Padding Vertical Medium</label>
    </div>
  </div>
</div>`,
  ),
})
PaddingHtml.storyName = '🌍 Padding'
