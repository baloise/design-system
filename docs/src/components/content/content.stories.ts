import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.BalContent & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Content',
  argTypes: {
    ...withComponentControls({ tag: 'ds-content' }),
  },
  ...withRender(
    () => `<ds-content>
  <ds-label>The Content Component</ds-label>
  <ds-text>Content helps to align text nodes inside a section.</ds-text>
</ds-content>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const Alignment = Story({
  ...withRender(
    ({ ...args }) => `<ds-content ${props(args)}>
  <ds-label>The Content Component</ds-label>
  <ds-text>Content helps to align text nodes inside a section.</ds-text>
</ds-content>`,
  ),
  args: {
    align: 'center',
  },
})
Alignment.storyName = '🧩 Alignment'

export const Layout = Story({
  ...withRender(
    ({ ...args }) => `<ds-content ${props(args)}>
  <ds-label>The Content Component</ds-label>
  <ds-text>Content helps to align text nodes inside a section.</ds-text>
</ds-content>`,
  ),
  args: {
    layout: 'horizontal',
    space: 'normal',
  },
})
Layout.storyName = '🧩 Layout'

export const Space = Story({
  ...withRender(
    () => `<div>
  <ds-content class="bg-red-2">
    <ds-label class="bg-green-2">Default Space</ds-label>
    <ds-text class="bg-green-2">Content helps to align text nodes inside a section.</ds-text>
  </ds-content>
  <ds-content space="x-small" class="bg-red-2 mt-medium">
    <ds-label class="bg-green-2">X Small Space</ds-label>
    <ds-text class="bg-green-2">Content helps to align text nodes inside a section.</ds-text>
  </ds-content>
  <ds-content space="small" class="bg-red-2 mt-medium">
    <ds-label class="bg-green-2">Small Space</ds-label>
    <ds-text class="bg-green-2">Content helps to align text nodes inside a section.</ds-text>
  </ds-content>
  <ds-content space="normal" class="bg-red-2 mt-medium">
    <ds-label class="bg-green-2">Normal Space</ds-label>
    <ds-text class="bg-green-2">Content helps to align text nodes inside a section.</ds-text>
  </ds-content>
</div>`,
  ),
})
Space.storyName = '🧩 Space'
