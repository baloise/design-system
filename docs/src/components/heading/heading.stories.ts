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

type Args = JSX.DsHeading & { slot: string }

const tag = 'ds-heading'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Heading/Variants',
  args: {
    slot: 'Heading',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ slot, ...args }) => `
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
    )}>${slot}</h1>
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

export const Basic = Story({
  args: {
    level: 'h1',
    subtitle: false,
    space: 'bottom',
    inverted: false,
  },
  ...withRender(({ slot, ...args }) => `<ds-heading ${props(args)}>${slot}</ds-heading>`),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({})
BasicHtml.storyName = '🌍 Basic'

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
Levels.storyName = '🌍 Levels'

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
Sizes.storyName = '🌍 Sizes'

export const Colors = Story({
  ...withRender(
    () => `
<h4 class="title">Default / Primary</h4>
<h4 class="title is-success">Success</h4>
<h4 class="title is-warning">Warning</h4>
<h4 class="title is-danger">Danger</h4>`,
  ),
})
Colors.storyName = '🌍 Colors'

export const NoWrap = Story({
  ...withRender(
    () => `
<h4 class="title has-no-wrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>`,
  ),
})
NoWrap.storyName = '🌍 No Wrap'

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
Spacing.storyName = '🌍 Spacing'

export const AutoLevel = Story({
  ...withRender(({ slot, ...args }) => `<ds-heading auto-level="h5" ${props(args)}>${slot}</ds-heading>`),
  args: {
    slot: 'This heading is actual a H1 level, but since it requires more than one line we shrink it until it matches or is the same level as the auto-level.',
    level: 'h1',
    subtitle: false,
    space: 'bottom',
    inverted: false,
  },
})
AutoLevel.storyName = '🧩 Auto Level'
