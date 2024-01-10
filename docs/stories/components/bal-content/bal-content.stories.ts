import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalContent & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Content',
  argTypes: {
    ...withComponentControls({ tag: 'bal-content' }),
  },
  ...withRender(
    () => `<bal-content>
  <bal-label>The Content Component</bal-label>
  <bal-text>Content helps to align text nodes inside a section.</bal-text>
</bal-content>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Alignment = Story({
  ...withRender(
    ({ ...args }) => `<bal-content ${props(args)}>
  <bal-label>The Content Component</bal-label>
  <bal-text>Content helps to align text nodes inside a section.</bal-text>
</bal-content>`,
  ),
  args: {
    align: 'center',
  },
})

export const Layout = Story({
  ...withRender(
    ({ ...args }) => `<bal-content ${props(args)}>
  <bal-label>The Content Component</bal-label>
  <bal-text>Content helps to align text nodes inside a section.</bal-text>
</bal-content>`,
  ),
  args: {
    layout: 'horizontal',
    space: 'normal',
  },
})

export const Space = Story({
  ...withRender(
    () => `<div>
  <bal-content class="bg-red-2">
    <bal-label class="bg-green-2">Default Space</bal-label>
    <bal-text class="bg-green-2">Content helps to align text nodes inside a section.</bal-text>
  </bal-content>
  <bal-content space="x-small" class="bg-red-2 mt-medium">
    <bal-label class="bg-green-2">X Small Space</bal-label>
    <bal-text class="bg-green-2">Content helps to align text nodes inside a section.</bal-text>
  </bal-content>
  <bal-content space="small" class="bg-red-2 mt-medium">
    <bal-label class="bg-green-2">Small Space</bal-label>
    <bal-text class="bg-green-2">Content helps to align text nodes inside a section.</bal-text>
  </bal-content>
  <bal-content space="normal" class="bg-red-2 mt-medium">
    <bal-label class="bg-green-2">Normal Space</bal-label>
    <bal-text class="bg-green-2">Content helps to align text nodes inside a section.</bal-text>
  </bal-content>
</div>`,
  ),
})
