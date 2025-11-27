import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX.BalHeading & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Typography/Heading',
  args: {
    ...withDefaultContent('Heading'),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-heading' }),
  },
  ...withRender(({ content, ...args }) => `<bal-heading ${props(args)}>${content}</bal-heading>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    () => `
<!-- HTML and CSS -->
<h1 class="heading">Heading</h1>
<p class="heading is-subtitle is-xx-large">Subtitle</p>

<!-- Web Components -->
<bal-heading level="h1">Heading</bal-heading>
<bal-heading level="xx-large" subtitle>Subtitle</bal-heading>
`,
  ),
})

export const Levels = Story({
  ...withRender(
    () => `
<h1 class="heading">Heading 1</h1>
<h2 class="heading">Heading 2</h2>
<h3 class="heading">Heading 3</h3>
<h4 class="heading">Heading 4</h4>
<h5 class="heading">Heading 5</h5>`,
  ),
})

export const Sizes = Story({
  ...withRender(
    () => `
<h1 class="heading is-size-1">Heading 1</h1>
<h1 class="heading is-size-2">Heading 2</h1>
<h1 class="heading is-size-3">Heading 3</h3>
<h1 class="heading is-size-4">Heading 4</h4>
<h1 class="heading is-size-5">Heading 5</h5>`,
  ),
})

export const Colors = Story({
  ...withRender(
    () => `
<h4 class="heading">Default / Primary</h4>
<h4 class="heading is-success">Success</h4>
<h4 class="heading is-warning">Warning</h4>
<h4 class="heading is-danger">Danger</h4>`,
  ),
})

export const NoWrap = Story({
  ...withRender(
    () => `
<h4 class="heading has-no-wrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>`,
  ),
})

export const Spacing = Story({
  ...withRender(
    () => `<div>
    <div class="bg-primary-1 flex mb-small">
      <h4 class="heading has-space-all">All</h4>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <h4 class="heading has-space-none">None</h4>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <h4 class="heading has-space-top">Top</h4>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <h4 class="heading has-space-bottom">Bottom</h4>
    </div>
  </div>`,
  ),
})

export const Title = Story({
  args: {
    level: 'h1',
    subtitle: false,
    space: 'bottom',
    inverted: false,
  },
})

export const Subtitle = Story({
  args: {
    content: 'Subtitle',
    level: 'h3',
    subtitle: true,
    space: 'bottom',
    inverted: false,
  },
})

export const AutoLevel = Story({
  ...withRender(({ content, ...args }) => `<bal-heading auto-level="h5" ${props(args)}>${content}</bal-heading>`),
  args: {
    content:
      'This heading is actual a H1 level, but since it requires more than one line we shrink it until it matches or is the same level as the auto-level.',
    level: 'h1',
    subtitle: false,
    space: 'bottom',
    inverted: false,
  },
})
