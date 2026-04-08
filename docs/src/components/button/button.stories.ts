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

type Args = JSX.BalButton & { content: string }

const tag = 'ds-button'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Containment/Button',
  args: {
    ...withDefaultContent('Button'),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ content, ...args }) => `
<button ${cssClasses(
      {
        ...css('color', (color: string) => `is-${color}`),
        size: args.size === 'small' ? 'is-small' : '',
        disabled: 'is-disabled',
        expanded: 'is-fullwidth',
        inverted: 'is-inverted',
        dashed: 'is-dashed',
        square: 'is-square',
        loading: 'is-loading',
        rounded: 'is-rounded',
      },
      args,
      'button',
    )}>${content}</button>
`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const WebComponentBasic = Story({
  ...withRender(({ content, ...args }) => `<ds-button ${props(args)}>${content}</ds-button>`),
})

export const WebComponentGroup = Story({
  ...withRender(
    ({ content, ...args }) => `
 <ds-button-group>
  <ds-button ${props(args)}>${content}</ds-button>
  <ds-button ${props(args)}>${content}</ds-button>
 </ds-button-group>  
  `,
  ),
})

export const Variants = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-secondary">Secondary</button>
  <button class="button is-tertiary">Tertiary</button>
</div>
<div class="buttons mt-normal">
  <button class="button is-tertiary-purple">Tertiary Purple</button>
  <button class="button is-tertiary-red">Tertiary Red</button>
  <button class="button is-tertiary-yellow">Tertiary Yellow</button>
  <button class="button is-tertiary-green">Tertiary Green</button>
</div>
<div class="buttons mt-normal">
  <button class="button is-link">Link</button>
</div>`,
  ),
})

export const Sizes = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-sm">Small</button>
  <button class="button">Normal</button>
  <button class="button is-lg">Large</button>
  <button class="button is-xl">X-Large</button>
</div>`,
  ),
})

export const Inverted = Story({
  ...withRender(
    () => `<div class="stack bg-primary p-normal">
  <div class="buttons">
    <button class="button is-inverted is-primary">Primary</button>
    <button class="button is-inverted is-secondary">Secondary</button>
  </div>
  <div class="buttons">
    <button class="button is-inverted is-link">Link</button>
  </div>
</div>`,
  ),
})

export const WithIcon = Story({
  ...withRender(
    () => `
<button class="button is-primary">
  <ds-icon name="plus"></ds-icon>
  Button
</button>`,
  ),
})

export const States = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-loading">
    <ds-spinner></ds-spinner>
    loading...
  </button>
  <button class="button is-loading" disabled>
    <ds-spinner variation="circle"></ds-spinner>
    loading...
  </button>
  <button class="button" disabled>Disabled</button>
</div>`,
  ),
})

export const Dashed = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-tertiary-purple is-large is-dashed">
    <ds-icon name="plus" class="is-circle"></ds-icon>
    Purple
  </button>
  <button class="button is-tertiary-red is-large is-dashed">
    <ds-icon name="plus" class="is-circle"></ds-icon>
    Red
  </button>
  <button class="button is-tertiary-yellow is-large is-dashed">
    <ds-icon name="plus" class="is-circle"></ds-icon>
    Yellow
  </button>
  <button class="button is-tertiary-green is-large is-dashed">
    <ds-icon name="plus" class="is-circle"></ds-icon>
    Green
  </button>
</div>`,
  ),
})

export const AlertButtons = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-info">Info</button>
  <button class="button is-success">Success</button>
  <button class="button is-warning">Warning</button>
  <button class="button is-danger">Danger</button>
</div>`,
  ),
})

export const SquareButtons = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-square">
    <ds-icon name="plus"></ds-icon>
  </button>
  <button class="button is-square is-secondary">
    <ds-icon name="plus"></ds-icon>
  </button>
  <button class="button is-circle is-tertiary-purple">
    <ds-icon name="plus"></ds-icon>
  </button>
</div>`,
  ),
})

export const NoWrap = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button has-no-wrap is-tertiary-purple">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis vulputate lorem.
  </button>
</div>`,
  ),
})

/**
 * GROUPS
 * ------------------------------------------------------
 */

export const ButtonGroup = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button">Left</button>
  <button class="button">Middle</button>
  <button class="button">Right</button>
</div>`,
  ),
})

export const ButtonGroupAlignment = Story({
  ...withRender(
    () => `<div class="stack">
  <div class="buttons">
    <button class="button">Left</button>
    <button class="button">Middle</button>
    <button class="button">Right</button>
  </div>
  <div class="buttons is-centered">
    <button class="button">Left</button>
    <button class="button">Middle</button>
    <button class="button">Right</button>
  </div>
  <div class="buttons is-right">
    <button class="button">Left</button>
    <button class="button">Middle</button>
    <button class="button">Right</button>
  </div>
</div>`,
  ),
})

export const ButtonGroupAsRow = Story({
  ...withRender(
    () => `<div class="stack">
  <div class="buttons as-row">
    <button class="button is-scondary">
      <ds-icon name="caret-left"></ds-icon>
      Back
    </button>
    <button class="button">Next</button>
  </div>
  <div class="buttons as-row">
    <button class="button is-square">
      <ds-icon name="caret-left"></ds-icon>
    </button>
    <button class="button">Next</button>
  </div>
</div>`,
  ),
})

export const ButtonGroupAsCol = Story({
  ...withRender(
    () => `<div class="stack">
  <div class="buttons as-col is-left">
    <button class="button">Left</button>
    <button class="button">Middle</button>
    <button class="button">Right</button>
  </div>
  <div class="buttons as-col is-centered">
    <button class="button">Left</button>
    <button class="button">Middle</button>
    <button class="button">Right</button>
  </div>
  <div class="buttons as-col is-right">
    <button class="button">Left</button>
    <button class="button">Middle</button>
    <button class="button">Right</button>
  </div>
</div>`,
  ),
})

/**
 * LINKS
 * ------------------------------------------------------
 */

export const Link = Story({
  ...withRender(
    () => `<div class="stack">
  <a class="link"> Link</a>
  <div class="bg-primary p-normal">
    <a class="link is-inverted"> Inverted Link</a>
  </div>
  </div>`,
  ),
})

export const LinkButton = Story({
  ...withRender(
    () => `
<a class="button is-link">
  <ds-icon name="plus"></ds-icon>
  Link
</a>`,
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
