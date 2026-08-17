import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsBrandIcon

const meta: Meta<Args> = {
  title: 'Components/BrandIcon/Variants',
  argTypes: {
    ...withComponentControls({ tag: 'ds-brand-icon' }),
  },
  ...withRender(args => `<ds-brand-icon ${props(args)}></ds-brand-icon>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    src: '/assets/images/brand-icons/car-purple.svg',
  },
})
Basic.storyName = '🧩 Basic'

export const States = Story({
  ...withRender(
    () =>
      `<div class="stack">
      <div class="stack as-row">
        <ds-brand-icon color="green" src="/assets/images/brand-icons/car-green.svg"></ds-brand-icon>
        <ds-brand-icon color="green" src="/assets/images/brand-icons/car-green.svg" invalid></ds-brand-icon>
        <ds-brand-icon color="green" src="/assets/images/brand-icons/car-green.svg" disabled></ds-brand-icon>
      </div>
      <div class="stack as-row">
        <ds-brand-icon tile color="green" src="/assets/images/brand-icons/car-green.svg"></ds-brand-icon>
        <ds-brand-icon tile color="green" src="/assets/images/brand-icons/car-green.svg" invalid></ds-brand-icon>
        <ds-brand-icon tile color="green" src="/assets/images/brand-icons/car-green.svg" disabled></ds-brand-icon>
      </div>
    </div>`,
  ),
})
States.storyName = '🧩 States'

export const Sizes = Story({
  ...withRender(
    () =>
      `<div class="stack as-row">
      <ds-brand-icon src="/assets/images/brand-icons/car-green.svg" size="sm"></ds-brand-icon>
      <ds-brand-icon src="/assets/images/brand-icons/car-green.svg"></ds-brand-icon>
      <ds-brand-icon src="/assets/images/brand-icons/car-green.svg" size="lg"></ds-brand-icon>
    </div>`,
  ),
})
Sizes.storyName = '🧩 Sizes'

export const Tile = Story({
  ...withRender(
    () =>
      `<div class="stack">
      <div class="stack as-row">
        <ds-brand-icon tile src="/assets/images/brand-icons/car-purple.svg" color="purple" size="sm"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-green.svg" color="green" size="sm"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-red.svg" color="red" size="sm"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-tangerine.svg" color="yellow" size="sm"></ds-brand-icon>
      </div>
      <div class="stack as-row">
        <ds-brand-icon tile src="/assets/images/brand-icons/car-purple.svg" color="purple"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-green.svg" color="green"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-red.svg" color="red"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-tangerine.svg" color="yellow"></ds-brand-icon>
      </div>
      <div class="stack as-row">
        <ds-brand-icon tile src="/assets/images/brand-icons/car-purple.svg" color="purple" size="lg"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-green.svg" color="green" size="lg"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-red.svg" color="red" size="lg"></ds-brand-icon>
        <ds-brand-icon tile src="/assets/images/brand-icons/car-tangerine.svg" color="yellow" size="lg"></ds-brand-icon>
      </div>
    </div>`,
  ),
})
Tile.storyName = '🧩 Tile'
