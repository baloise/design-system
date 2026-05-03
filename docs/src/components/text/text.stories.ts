import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  createCssMappings,
  cssClasses,
  props,
  StoryFactory,
  withComponentControls,
  withRender,
} from '../../utils'

type Args = JSX.DsText & { slot: string }

const tag = 'ds-text'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Text/Variants',
  args: {
    slot: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ slot, ...args }) =>
      `<p ${cssClasses(
        {
          ...css('color', (color: string) => `is-${color}`),
          ...css('size', (size: string) => `is-${size}`),
          ...css('space', (space: string) => `has-space-${space}`),
          noWrap: 'has-no-wrap',
          bold: 'is-bold',
          disabled: 'is-disabled',
          inline: 'is-inline',
          heading: 'is-heading',
          invalid: 'is-danger',
          shadow: 'has-shadow',
        },
        args,
        'text',
      )}>${slot}</p>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(({ slot, ...args }) => `<ds-text ${props(args)}>${slot}</ds-text>`),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({})
BasicHtml.storyName = '🌍 Basic'

export const BoldText = Story({
  args: {
    bold: true,
  },
})
BoldText.storyName = '🌍 Bold Text'

export const DisabledText = Story({
  args: {
    bold: true,
    disabled: true,
  },
})
DisabledText.storyName = '🌍 Disabled Text'

export const NestedText = Story({
  ...withRender(
    ({ slot }) => `
<p><b>Primary paragraph</b> ${slot}</p>
<p class="text-primary-light text-small"><b>Secondary paragraph</b> used for hints</p>
`,
  ),
})
NestedText.storyName = '🌍 Nested Text'

export const Colors = Story({
  ...withRender(
    () => `
<p class="text">Base</p>
<p class="text is-primary">Primary</p>
<p class="text is-primary-hover">Primary Hover</p>
<p class="text is-primary-active">Primary Active</p>
<p class="text is-inverted-primary">Inverted Primary</p>
<p class="text is-inverted-primary-hover">Inverted Primary Hover</p>
<p class="text is-inverted-primary-active">Inverted Primary Active</p>
<p class="text is-primary-light">Primary Light</p>
<p class="text is-hint">Hint</p>
<p class="text is-grey-light">Grey Light</p>
<p class="text is-grey">Grey</p>
<p class="text is-grey-dark">Grey Dark</p>
<p class="text is-disabled">Disabled</p>
<p class="text is-inverted-disabled">Inverted Disabled</p>
<p class="text is-info">Info</p>
<p class="text is-warning">Warning</p>
<p class="text is-success">Success</p>
<p class="text is-danger">Danger</p>
<p class="text is-danger-hover">Danger Hover</p>
<p class="text is-danger-active">Danger Active</p>
`,
  ),
})
Colors.storyName = '🌍 Colors'

export const Sizes = Story({
  ...withRender(
    () => `
<p class="text is-lead">lead</p>
<p class="text is-block">block</p>
<hr class="divider has-space-xl"/>
<p class="text is-xs">x-small</p>
<p class="text is-sm">small</p>
<p class="text is-base">normal</p>
<p class="text is-md">medium</p>
<p class="text is-lg">large</p>
<p class="text is-xl">x-large</p>
<p class="text is-2xl">xx-large</p>
<p class="text is-3xl">xxx-large</p>
<p class="text is-4xl">xxxx-large</p>
<p class="text is-5xl">xxxxx-large</p>
`,
  ),
})
Sizes.storyName = '🌍 Sizes'

export const Spacing = Story({
  ...withRender(
    () => `<div>
    <div class="bg-primary-1 flex mb-small">
      <p class="text has-space-all">All</p>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <p class="text has-space-none">None</p>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <p class="text has-space-top">Top</p>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <p class="text has-space-bottom">Bottom</p>
    </div>
  </div>`,
  ),
})
Spacing.storyName = '🌍 Spacing'

export const FontFamily = Story({
  ...withRender(
    () => `
      <p class="text is-title">Title</p>
      <p class="text">Text</p>
  `,
  ),
})
FontFamily.storyName = '🌍 Font Family'

export const FontWeight = Story({
  ...withRender(
    () => `
      <p class="text is-bold">Bold Text</p>
      <p class="text is-regular">Regular Text</p>
      <p class="text is-subtitle">Light Text</p>
  `,
  ),
})
FontWeight.storyName = '🌍 Font Weight'

export const NoWrap = Story({
  args: {
    slot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    noWrap: true,
  },
})
NoWrap.storyName = '🌍 No Wrap'
