import type { JSX } from '@baloise/design-system-components'
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

export const Levels = Story({
  ...withRender(
    () => `<div class="columns">
  <div class="column is-half has-background-yellow-1">
    <bal-heading level="h1">Heading 1</bal-heading>
    <bal-heading level="h2">Heading 2</bal-heading>
    <bal-heading level="h3">Heading 3</bal-heading>
    <bal-heading level="h4">Heading 4</bal-heading>
    <bal-heading level="h5">Heading 5</bal-heading>
  </div>
  <div class="column is-half has-background-yellow-2">
    <h1 class="title text-xxx-large">Heading 1</h1>
    <h2 class="title text-xx-large">Heading 2</h2>
    <h3 class="title text-x-large">Heading 3</h3>
    <h4 class="title text-large">Heading 4</h4>
    <h5 class="title text-normal">Heading 5</h5>
  </div>
</div>`,
  ),
})

export const Colors = Story({
  ...withRender(
    () => `<div>
    <bal-heading level="h4" space="none">Default / Primary</bal-heading>
    <bal-heading color="success" level="h4" space="none">Success</bal-heading>
    <bal-heading color="warning" level="h4" space="none">Warning</bal-heading>
    <bal-heading color="danger" level="h4" space="none">Danger</bal-heading>
  </div>`,
  ),
})

export const Spacing = Story({
  ...withRender(
    () => `<div>
    <div class="has-background-blue-1 is-flex mb-small">
      <bal-heading level="h4" space="all">All</bal-heading>
    </div>
    <div class="has-background-blue-1 is-flex mb-small">
      <bal-heading level="h4" space="none">None</bal-heading>
    </div>
    <div class="has-background-blue-1 is-flex mb-small">
      <bal-heading level="h4" space="top">Top</bal-heading>
    </div>
    <div class="has-background-blue-1 is-flex mb-small">
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

export const CSSUtilities = Story({
  ...withRender(
    () => `<div>
    <h1 class="title text-xxx-large">Heading 1</h1>
    <h2 class="title text-xx-large">Heading 2</h2>
    <h3 class="title text-x-large">Heading 3</h3>
    <h4 class="title text-large">Heading 4</h4>
    <h5 class="title text-normal">Heading 5</h5>
  </div>`,
  ),
})
