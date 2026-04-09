import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  createCssMappings,
  cssClasses,
  props,
  StoryFactory,
  withComponentControls,
  withContent,
  withDefaultContent,
  withRender,
} from '../../utils'

type Args = JSX.BalBadge & { content: string }

const tag = 'ds-badge'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Data Display/Badge',
  args: {
    ...withDefaultContent('42'),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ content, ...args }) => `<ds-badge ${props(args)}>
  ${content}
</ds-badge>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const WithIcon = Story({
  args: {
    color: 'success',
    icon: 'check',
    content: '',
  },
})

export const Colors = Story({
  ...withRender(
    () => `<div class="stack">
  <ds-badge color="red">R</ds-badge>
  <ds-badge color="green">G</ds-badge>
  <ds-badge color="yellow">Y</ds-badge>
  <ds-badge color="purple">P</ds-badge>
  <ds-badge color="grey">G</ds-badge>
  <ds-badge color="success">S</ds-badge>
  <ds-badge color="warning">W</ds-badge>
  <ds-badge color="danger">D</ds-badge>
</div>`,
  ),
})

export const Sizes = Story({
  ...withRender(
    () => `<div class="stack">
  <ds-badge size="sm">S</ds-badge>
  <ds-badge size="md">M</ds-badge>
  <ds-badge size="lg">L</ds-badge>
</div>`,
  ),
})

export const CardBadge = Story({
  args: {
    color: 'danger',
    position: 'card',
  },
  ...withRender(
    ({ ...args }) => `
<article class="card" aria-labelledby="card-title-1">
  <ds-badge color="green" icon="check"></ds-badge>
  <header class="card-header">
    <h3 class="title" id="card-title-1">Header</h3>
  </header>
  <div class="card-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua.
  </div>
</article>`,
  ),
})

export const ButtonBadge = Story({
  args: {
    color: 'danger',
    position: 'button',
  },
  ...withRender(
    ({ ...args }) => `
<button class="button">
  <ds-badge>42</ds-badge>
  Button
</button>`,
  ),
})

export const TabsBadge = Story({
  args: {
    color: 'danger',
    position: 'tabs',
  },
  ...withRender(
    () => `<ds-tabs  interface="tabs" value="tab-b">
  <ds-tab-item value="tab-a" label="Tab A">Content of Tab A</ds-tab-item>
  <ds-tab-item value="tab-b" label="Tab B" bubble>Content of Tab B</ds-tab-item>
</ds-tabs>`,
  ),
})

export const ListBadges = Story({
  ...withRender(
    () => `<ds-list border>
  <ds-list-item clickable>
    <ds-list-item-icon>
      <ds-badge color="green" size="large" icon="check"></ds-badge>
    </ds-list-item-icon>
    <ds-list-item-content>
      <ds-list-item-title>Clickable item</ds-list-item-title>
      <ds-list-item-subtitle>Secondary text</ds-list-item-subtitle>
    </ds-list-item-content>
    <ds-list-item-icon right>
      <ds-icon name="nav-go-right" size="x-small"></ds-icon>
    </ds-list-item-icon>
  </ds-list-item>
  <ds-list-item clickable>
    <ds-list-item-icon>
      <ds-badge color="purple" size="large">2</ds-badge>
    </ds-list-item-icon>
    <ds-list-item-content>
      <ds-list-item-title>Clickable item</ds-list-item-title>
      <ds-list-item-subtitle>Secondary text</ds-list-item-subtitle>
    </ds-list-item-content>
    <ds-list-item-icon right>
      <ds-icon name="nav-go-right" size="x-small"></ds-icon>
    </ds-list-item-icon>
  </ds-list-item>
  <ds-list-item disabled>
    <ds-list-item-icon>
      <ds-badge color="grey" size="large">3</ds-badge>
    </ds-list-item-icon>
    <ds-list-item-content>
      <ds-list-item-title>Clickable item</ds-list-item-title>
      <ds-list-item-subtitle>Secondary text</ds-list-item-subtitle>
    </ds-list-item-content>
    <ds-list-item-icon right>
      <ds-icon name="nav-go-right" size="x-small"></ds-icon>
    </ds-list-item-icon>
  </ds-list-item>
  <ds-list-item disabled>
    <ds-list-item-icon>
      <ds-badge color="grey" size="large" icon="document"></ds-badge>
    </ds-list-item-icon>
    <ds-list-item-content>
      <ds-list-item-title>Clickable item</ds-list-item-title>
      <ds-list-item-subtitle>Secondary text</ds-list-item-subtitle>
    </ds-list-item-content>
    <ds-list-item-icon right>
      <ds-icon name="nav-go-right" size="x-small"></ds-icon>
    </ds-list-item-icon>
  </ds-list-item>
</ds-list>`,
  ),
})
