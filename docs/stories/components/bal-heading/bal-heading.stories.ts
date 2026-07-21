import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

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
<h1 class="title text-xxx-large mb-none">Heading</h1>
<h2 class="subtitle text-xx-large">Subtitle</h2>`,
  ),
})

export const Levels = Story({
  ...withRender(
    () => `
<h1 class="title text-xxx-large">Heading 1</h1>
<h2 class="title text-xx-large">Heading 2</h2>
<h3 class="title text-x-large">Heading 3</h3>
<h4 class="title text-large">Heading 4</h4>
<h5 class="title text-normal">Heading 5</h5>`,
  ),
})

export const Colors = Story({
  ...withRender(
    () => `
<h4 class="title text-large">Default / Primary</h4>
<h4 class="title text-large text-success">Success</h4>
<h4 class="title text-large text-warning">Warning</h4>
<h4 class="title text-large text-danger">Danger</h4>`,
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

export const Spacing = Story({
  ...withRender(
    () => `<div>
    <div class="bg-blue-1 flex mb-small">
      <bal-heading level="h4" space="all">All</bal-heading>
    </div>
    <div class="bg-blue-1 flex mb-small">
      <bal-heading level="h4" space="none">None</bal-heading>
    </div>
    <div class="bg-blue-1 flex mb-small">
      <bal-heading level="h4" space="top">Top</bal-heading>
    </div>
    <div class="bg-blue-1 flex mb-small">
      <bal-heading level="h4" space="bottom">Bottom</bal-heading>
    </div>
  </div>`,
  ),
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
