import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  createCssMappings,
  cssClasses,
  StoryFactory,
  withComponentControls,
  withContent,
  withDefaultContent,
  withRender,
} from '../../utils'

type Args = JSX.BalText & { content: string }

const tag = 'bal-text'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Typography/Text',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ content, ...args }) =>
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
      )}>${content}</p>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const BoldText = Story({
  args: {
    bold: true,
  },
})

export const DisabledText = Story({
  args: {
    bold: true,
    disabled: true,
  },
})

export const NestedText = Story({
  ...withRender(
    ({ args, content }) => `
<p><b>Primary paragraph</b> ${content}</p>
<p class="text-primary-light text-small"><b>Secondary paragraph</b> used for hints</p>
`,
  ),
})

export const Colors = Story({
  ...withRender(
    ({ args, content }) => `
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

export const Sizes = Story({
  ...withRender(
    ({ args, content }) => `
<p class="text is-lead">lead</p>
<p class="text is-block">block</p>
<hr />
<p class="text is-x-small">x-small</p>
<p class="text is-small">small</p>
<p class="text is-normal">normal</p>
<p class="text is-medium">medium</p>
<p class="text is-large">large</p>
<p class="text is-x-large">x-large</p>
<p class="text is-xx-large">xx-large</p>
<p class="text is-xxx-large">xxx-large</p>
<p class="text is-xxxx-large">xxxx-large</p>
<p class="text is-xxxxx-large">xxxxx-large</p>
`,
  ),
})

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

export const FontFamily = Story({
  ...withRender(
    () => `
      <p class="text is-title">Title</p>
      <p class="text">Text</p>
  `,
  ),
})

export const FontWeight = Story({
  ...withRender(
    () => `
      <p class="text is-bold">Bold Text</p>
      <p class="text is-regular">Regular Text</p>
      <p class="text is-title is-light">Light Text</p>
  `,
  ),
})

export const NoWrap = Story({
  args: {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    noWrap: true,
  },
})
