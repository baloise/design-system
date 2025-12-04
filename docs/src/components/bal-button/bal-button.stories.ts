import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  createCssMappings,
  props,
  StoryFactory,
  withComponentControls,
  withContent,
  withDefaultContent,
  withRender,
} from '../../utils'

type Args = JSX.BalButton & { content: string }

const tag = 'bal-button'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Containment/Button',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
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
  ...withRender(() => `<button class="button is-primary">Button</button>`),
})

export const WithIcon = Story({
  ...withRender(
    () => `<button class="button is-primary">
  <bal-icon name="plus"></bal-icon>
  Button
  </button>`,
  ),
})

export const States = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-loading">
    <bal-spinner></bal-spinner>
    loading...
  </button>
  <button class="button is-loading" disabled>
    <bal-spinner variation="circle"></bal-spinner>
    loading...
  </button>
  <button class="button" disabled>Disabled</button>
</div>`,
  ),
})

export const Variants = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-secondary">Secondary</button>
  <button class="button is-tertiary">Tertiary</button>
  <button class="button is-accent">Accent</button>
</div>
<div class="buttons">
  <button class="button is-tertiary-purple">Tertiary Purple</button>
  <button class="button is-tertiary-red">Tertiary Red</button>
  <button class="button is-tertiary-yellow">Tertiary Yellow</button>
  <button class="button is-tertiary-green">Tertiary Green</button>
</div>
<div class="buttons">
  <button class="button is-link">Link</button>
</div>`,
  ),
})

export const ButtonGroup = Story({
  ...withRender(
    () => `
<div class="buttons">
  <button class="button is-tertiary-purple">Purple</button>
  <button class="button is-tertiary-red">Red</button>
  <button class="button is-tertiary-yellow">Yellow</button>
  <button class="button is-tertiary-green">Green</button>
</div>`,
  ),
})

export const Component = Story({
  args: {
    content: 'Primary',
    icon: 'plus',
  },
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

// export const ButtonGroup = Story({
//   ...withRender(
//     () => `<bal-button-group>
//   <bal-button color="link">Left</bal-button>
//   <bal-button>Aligned</bal-button>
// </bal-button-group>
// <bal-button-group position="center">
//   <bal-button color="link">Center</bal-button>
//   <bal-button>Aligned</bal-button>
// </bal-button-group>
// <bal-button-group position="right">
//   <bal-button color="link">Right</bal-button>
//   <bal-button>Aligned</bal-button>
// </bal-button-group>`,
//   ),
// })

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
  <div class="buttons bg-primary p-small">
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
      <a class="link">Link</a>
  </div>
  <div class="column bg-primary">
      <a class="link is-inverted">Link</a>
  </div>
</div>`,
  ),
})
