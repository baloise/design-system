import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsContent & { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Content/Variants',
  args: {
    slot: 'Content helps to align text nodes inside a section.',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-content' }),
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-content ${props(args)}>
  <ds-label>The Content Component</ds-label>
  <ds-text>${slot}</ds-text>
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

export const BasicHtml = Story({
  ...withRender(
    () => `<div class="stack-content">
  <label class="label">The Content Component</label>
  <span>Content helps to align text nodes inside a section.</span>
</div>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

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

export const AlignmentHtml = Story({
  ...withRender(
    () => `<div class="stack-content align-center">
  <label class="label">The Content Component</label>
  <span>Content helps to align text nodes inside a section.</span>
</div>`,
  ),
})
AlignmentHtml.storyName = '🌍 Alignment'

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

export const LayoutHtml = Story({
  ...withRender(
    () => `<div class="stack-content as-row has-space-base">
  <label class="label">The Content Component</label>
  <span>Content helps to align text nodes inside a section.</span>
</div>`,
  ),
})
LayoutHtml.storyName = '🌍 Layout'

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

export const SpaceHtml = Story({
  ...withRender(
    () => `<div>
  <div class="stack-content bg-red-2">
    <label class="label bg-green-2">Default Space</label>
    <span class="bg-green-2">Content helps to align text nodes inside a section.</span>
  </div>
  <div class="stack-content has-space-xs bg-red-2 mt-medium">
    <label class="label bg-green-2">X Small Space</label>
    <span class="bg-green-2">Content helps to align text nodes inside a section.</span>
  </div>
  <div class="stack-content has-space-sm bg-red-2 mt-medium">
    <label class="label bg-green-2">Small Space</label>
    <span class="bg-green-2">Content helps to align text nodes inside a section.</span>
  </div>
  <div class="stack-content has-space-base bg-red-2 mt-medium">
    <label class="label bg-green-2">Normal Space</label>
    <span class="bg-green-2">Content helps to align text nodes inside a section.</span>
  </div>
</div>`,
  ),
})
SpaceHtml.storyName = '🌍 Space'
