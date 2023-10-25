import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalButton & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Button',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-button' }),
  },
  ...withRender(({ content, ...args }) => `<bal-button ${props(args)}>${content}</bal-button>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    content: 'Primary',
    icon: 'plus',
  },
})

export const Variants = Story({
  ...withRender(
    () => `<bal-button-group direction="column" position="center">
    <bal-button>Primary</bal-button>
    <bal-button color="secondary">Secondary</bal-button>
    <bal-button color="tertiary">Tertiary</bal-button>
    <bal-button color="tertiary-purple">Tertiary Purple</bal-button>
    <bal-button color="tertiary-red">Tertiary Red</bal-button>
    <bal-button color="tertiary-yellow">Tertiary Yellow</bal-button>
    <bal-button color="tertiary-green">Tertiary Green</bal-button>
    <bal-button color="link">Link</bal-button>
  </bal-button-group>`,
  ),
})

export const States = Story({
  ...withRender(
    () => `<bal-button-group>
    <bal-button loading>Loading</bal-button>
    <bal-button disabled>Disabled</bal-button>
  </bal-button-group>`,
  ),
})

export const AlertButtons = Story({
  ...withRender(
    () => `<bal-button-group>
    <bal-button color="info-light">Info</bal-button>
    <bal-button color="success">Success</bal-button>
    <bal-button color="warning">Warning</bal-button>
    <bal-button color="danger">Danger</bal-button>
  </bal-button-group>`,
  ),
})

export const SquareButtons = Story({
  ...withRender(
    () => `<bal-button-group>
    <bal-button square="true" icon="plus"></bal-button>
    <bal-button square="true" color="info" icon="account"></bal-button>
    <bal-button square="true" color="info" outlined>42</bal-button>
  </bal-button-group>`,
  ),
})

export const ButtonGroup = Story({
  ...withRender(
    () => `<bal-button-group>
    <bal-button color="link">Left</bal-button>
    <bal-button>Aligned</bal-button>
  </bal-button-group>
  <bal-button-group position="center">
    <bal-button color="link">Center</bal-button>
    <bal-button>Aligned</bal-button>
  </bal-button-group>
  <bal-button-group position="right">
    <bal-button color="link">Right</bal-button>
    <bal-button>Aligned</bal-button>
  </bal-button-group>`,
  ),
})

export const Link = Story({
  ...withRender(() => `<bal-button color="link" icon-right="plus">Link</bal-button>`),
})

export const NativeButton = Story({
  ...withRender(
    () => `<div>
    <div class="buttons p-small">
      <button class="button is-primary">Primary</button>
      <button class="button is-secondary">Secondary</button>
      <button class="button is-tertiary">Tertiary</button>
      <button class="button is-link">Link</button>
    </div>
    <div class="buttons p-small">
      <button class="button is-tertiary-purple">Tertiary Purple</button>
      <button class="button is-tertiary-red">Tertiary Red</button>
      <button class="button is-tertiary-yellow">Tertiary Yellow</button>
      <button class="button is-tertiary-green">Tertiary Green</button>
    </div>
    <div class="buttons p-small">
      <button class="button is-success">Success</button>
      <button class="button is-warning">Warning</button>
      <button class="button is-danger">Danger</button>
      <button class="button is-disabled">Disabled</button>
    </div>
    <div class="buttons has-background-primary p-small">
      <button class="button is-inverted is-primary">Primary</button>
      <button class="button is-inverted is-secondary">Secondary</button>
      <button class="button is-inverted is-tertiary">Tertiary</button>
      <button class="button is-inverted is-link">Link</button>
    </div>
    </div>`,
  ),
})

export const NativeLink = Story({
  ...withRender(
    () => `<div class="columns m-none">
    <div class="column">
        <a class="is-link">Link</a>
    </div>
    <div class="column has-background-primary">
        <a class="is-link is-inverted">Link</a>
    </div>
  </div>`,
  ),
})
