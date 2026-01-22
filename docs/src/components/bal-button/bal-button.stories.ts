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

const tag = 'bal-button'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Containment/Button 👻',
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
  ...withRender(({ content, ...args }) => `<bal-button ${props(args)}>${content}</bal-button>`),
})

export const Variants = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-secondary">Secondary</button>
  <button class="button is-tertiary">Tertiary</button>
  <button class="button is-accent">Accent</button>
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
  <button class="button is-small">Small</button>
  <button class="button">Normal</button>
  <button class="button is-large">Large</button>
</div>`,
  ),
})

export const Inverted = Story({
  ...withRender(
    () => `<div class="stack bg-primary p-normal">
  <div class="buttons">
    <button class="button is-inverted is-primary">Primary</button>
    <button class="button is-inverted is-secondary">Secondary</button>
    <button class="button is-inverted is-tertiary">Tertiary</button>
    <button class="button is-inverted is-accent">Accent</button>
  </div>
  <div class="buttons">
    <button class="button is-inverted is-tertiary-purple">Tertiary Purple</button>
    <button class="button is-inverted is-tertiary-red">Tertiary Red</button>
    <button class="button is-inverted is-tertiary-yellow">Tertiary Yellow</button>
    <button class="button is-inverted is-tertiary-green">Tertiary Green</button>
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

export const Dashed = Story({
  ...withRender(
    () => `<div class="buttons">
  <button class="button is-tertiary-purple is-large is-dashed">
    <bal-icon name="plus" class="is-circle"></bal-icon>
    Purple
  </button>
  <button class="button is-tertiary-red is-large is-dashed">
    <bal-icon name="plus" class="is-circle"></bal-icon>
    Red
  </button>
  <button class="button is-tertiary-yellow is-large is-dashed">
    <bal-icon name="plus" class="is-circle"></bal-icon>
    Yellow
  </button>
  <button class="button is-tertiary-green is-large is-dashed">
    <bal-icon name="plus" class="is-circle"></bal-icon>
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
    <bal-icon name="plus"></bal-icon>
  </button>
  <button class="button is-square is-secondary">
    <bal-icon name="account"></bal-icon>
  </button>
  <button class="button is-circle is-tertiary-purple">
    <bal-icon name="plus"></bal-icon>
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
      <bal-icon name="caret-left"></bal-icon>
      Back
    </button>
    <button class="button">Next</button>
  </div>
  <div class="buttons as-row">
    <button class="button is-square is-secondary">
      <bal-icon name="caret-left"></bal-icon>
    </button>
    <button class="button">Next</button>
  </div>
</div>`,
  ),
})

export const ButtonGroupAsCol = Story({
  ...withRender(
    () => `<div class="stack">
  <div class="buttons as-col">
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
  <bal-icon name="plus"></bal-icon>
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
