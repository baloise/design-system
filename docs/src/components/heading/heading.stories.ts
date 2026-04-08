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

type Args = JSX.BalHeading & { content: string }

const tag = 'ds-heading'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Typography/Heading',
  args: {
    ...withDefaultContent('Heading'),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ content, ...args }) => `
<h1 ${cssClasses(
      {
        ...css('color', (color: string) => `is-${color}`),
        ...css('level', (level: string) => `is-${level.startsWith('h') ? `is-${level.substring(1)}` : `is-${level}`}`),
        ...css(
          'visualLevel',
          (level: string) => `is-${level.startsWith('h') ? `is-${level.substring(1)}` : `is-${level}`}`,
        ),
        subtitle: 'subtitle',
        noWrap: 'has-no-wrap',
        shadow: 'has-shadow',
      },
      args,
      'title',
    )}>${content}</h1>
<p class="subtitle is-xx-large">Subtitle</p>
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
  args: {
    level: 'h1',
    subtitle: false,
    space: 'bottom',
    inverted: false,
  },
  ...withRender(({ content, ...args }) => `<ds-heading ${props(args)}>${content}</ds-heading>`),
})

export const Levels = Story({
  ...withRender(
    () => `
<h1 class="title">Heading 1</h1>
<h2 class="title">Heading 2</h2>
<h3 class="title">Heading 3</h3>
<h4 class="title">Heading 4</h4>
<h5 class="title">Heading 5</h5>`,
  ),
})

export const Sizes = Story({
  ...withRender(
    () => `
<h1 class="title is-1">Size 1 (3xl)</h1>
<h1 class="title is-2xl">Size 2 (2xl)</h1>
<h1 class="title is-level-3">Size 3 (xl)</h3>
<h1 class="title is-level-4">Size 4 (lg)</h4>
<h1 class="title is-level-5">Size 5 (base)</h5>`,
  ),
})

export const Colors = Story({
  ...withRender(
    () => `
<h4 class="title">Default / Primary</h4>
<h4 class="title is-success">Success</h4>
<h4 class="title is-warning">Warning</h4>
<h4 class="title is-danger">Danger</h4>`,
  ),
})

export const NoWrap = Story({
  ...withRender(
    () => `
<h4 class="title has-no-wrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>`,
  ),
})

export const Spacing = Story({
  ...withRender(
    () => `<div>
    <div class="bg-primary-1 flex mb-small">
      <h4 class="title has-space-all">All</h4>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <h4 class="title has-space-none">None</h4>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <h4 class="title has-space-top">Top</h4>
    </div>
    <div class="bg-primary-1 flex mb-small">
      <h4 class="title has-space-bottom">Bottom</h4>
    </div>
  </div>`,
  ),
})

export const AutoLevel = Story({
  ...withRender(({ content, ...args }) => `<ds-heading auto-level="h5" ${props(args)}>${content}</ds-heading>`),
  args: {
    content:
      'This heading is actual a H1 level, but since it requires more than one line we shrink it until it matches or is the same level as the auto-level.',
    level: 'h1',
    subtitle: false,
    space: 'bottom',
    inverted: false,
  },
})
