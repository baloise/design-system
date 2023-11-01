import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalBadge & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Badge',
  args: {
    ...withDefaultContent('42'),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-badge' }),
  },
  ...withRender(({ content, ...args }) => `<bal-badge ${props(args)}>${content}</bal-badge>`),
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
    content: '',
    color: 'success',
    size: '',
    icon: 'check',
  },
})

export const Colors = Story({
  ...withRender(
    () => `<bal-stack>
  <bal-badge>D</bal-badge>
  <bal-badge color="green">G</bal-badge>
  <bal-badge color="yellow">Y</bal-badge>
  <bal-badge color="purple">P</bal-badge>
  <bal-badge color="grey">G</bal-badge>
</bal-stack>`,
  ),
})

export const Sizes = Story({
  ...withRender(
    () => `<bal-stack>
  <bal-badge size="small">S</bal-badge>
  <bal-badge>D</bal-badge>
  <bal-badge size="large">L</bal-badge>
</bal-stack>`,
  ),
})

export const CardBadge = Story({
  args: {
    color: 'danger',
    size: '',
    position: 'card',
  },
  ...withRender(
    ({ ...args }) => `<bal-card>
  <bal-badge ${props(args)}>42</bal-badge>
  <bal-card-title>Title</bal-card-title>
  <bal-card-content>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </bal-card-content>
</bal-card>`,
  ),
})

export const ButtonBadge = Story({
  args: {
    color: 'danger',
    size: '',
    position: 'button',
  },
  ...withRender(
    ({ ...args }) => `<bal-button>
  <bal-badge ${props(args)}>42</bal-badge>
  Button
</bal-button>`,
  ),
})

export const TabsBadge = Story({
  args: {
    color: 'danger',
    size: '',
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
      <bal-badge color="green" size="large" icon="check">1</bal-badge>
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
