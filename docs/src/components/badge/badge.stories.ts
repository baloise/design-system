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
  title: 'Components/Badge/Variants',
  args: {
    ...withDefaultContent('42'),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(({ content, ...args }) => `<ds-badge ${props(args)}>${content}</ds-badge>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const WithIcon = Story({
  args: {
    color: 'success',
    icon: 'check',
    content: '',
  },
})
WithIcon.storyName = '🧩 With Icon'

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
Colors.storyName = '🧩 Colors'

export const Sizes = Story({
  ...withRender(
    () => `<div class="stack">
  <ds-badge size="sm">S</ds-badge>
  <ds-badge size="md">M</ds-badge>
  <ds-badge size="lg">L</ds-badge>
</div>`,
  ),
})
Sizes.storyName = '🧩 Sizes'

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
CardBadge.storyName = '🧩 Card Badge'

export const ButtonBadge = Story({
  args: {
    color: 'danger',
    position: 'button',
  },
  ...withRender(
    ({ ...args }) => `
<button class="button">
  <ds-badge pulse>99+</ds-badge>
  Button
</button>`,
  ),
})
ButtonBadge.storyName = '🧩 Button Badge'

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
TabsBadge.storyName = '🧩 Tabs Badge'

export const ListBadges = Story({
  ...withRender(
    () => `
<ds-list>
  <ds-item variant="link" href="www.helvetia.com" target="_blank">
    <ds-badge color="green" size="lg" slot="icon">
      <ds-icon name="check"></ds-icon>
    </ds-badge>
    <div slot="content">
      <h5>Item 1</h5>
      <span>This is a description for item</span>
    </div>
  </ds-item>

  <ds-item label="Item 2" description="This is a description for item">
    <ds-badge color="purple" size="lg" slot="icon">2</ds-badge>
  </ds-item>

  <ds-item label="Item 3" description="This is a description for item">
    <ds-badge color="purple" size="lg" slot="icon">
      <ds-icon name="document"></ds-icon>
    </ds-badge>
  </ds-item>

  <ds-item label="Item 4" description="This is a description for item" disabled>
    <ds-badge color="purple" size="lg" slot="icon">4</ds-badge>
  </ds-item>
</ds-list>`,
  ),
})
ListBadges.storyName = '🧩 List Badges'
