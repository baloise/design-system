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

const tag = 'bal-badge'
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
    ({ content, ...args }) => `<bal-badge ${props(args)}>
  ${content}
</bal-badge>`,
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
  <bal-badge color="red">R</bal-badge>
  <bal-badge color="green">G</bal-badge>
  <bal-badge color="yellow">Y</bal-badge>
  <bal-badge color="purple">P</bal-badge>
  <bal-badge color="grey">G</bal-badge>
  <bal-badge color="success">S</bal-badge>
  <bal-badge color="warning">W</bal-badge>
  <bal-badge color="danger">D</bal-badge>
</div>`,
  ),
})

export const Sizes = Story({
  ...withRender(
    () => `<div class="stack">
  <bal-badge size="sm">S</bal-badge>
  <bal-badge size="md">M</bal-badge>
  <bal-badge size="lg">L</bal-badge>
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
  <bal-badge color="green" icon="check"></bal-badge>
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
  <bal-badge>42</bal-badge>
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
    () => `<bal-tabs  interface="tabs" value="tab-b">
  <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B" bubble>Content of Tab B</bal-tab-item>
</bal-tabs>`,
  ),
})

export const ListBadges = Story({
  ...withRender(
    () => `<bal-list border>
  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-badge color="green" size="large" icon="check"></bal-badge>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Clickable item</bal-list-item-title>
      <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="nav-go-right" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-badge color="purple" size="large">2</bal-badge>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Clickable item</bal-list-item-title>
      <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="nav-go-right" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
  <bal-list-item disabled>
    <bal-list-item-icon>
      <bal-badge color="grey" size="large">3</bal-badge>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Clickable item</bal-list-item-title>
      <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="nav-go-right" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
  <bal-list-item disabled>
    <bal-list-item-icon>
      <bal-badge color="grey" size="large" icon="document"></bal-badge>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Clickable item</bal-list-item-title>
      <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="nav-go-right" size="x-small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
</bal-list>`,
  ),
})
