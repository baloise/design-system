import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

type Args = Record<string, never>

const meta: Meta<Args> = {
  title: 'Components/Grid/Variants',
  args: {},
  argTypes: {},
  ...withRender(
    () => `
<div class="ds-grid gap-sm">
  <div class="ds-col bg-purple-2">Col 1</div>
  <div class="ds-col bg-purple-3">Col 2</div>
  <div class="ds-col bg-purple-4">Col 3</div>
</div>
`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = 'Basic'

export const ColumnSizes = Story({
  ...withRender(
    () => `
<div class="ds-grid gap-sm my-sm">
  <div class="ds-col is-half bg-purple-2">is-half</div>
  <div class="ds-col bg-purple-1">auto</div>
  <div class="ds-col bg-purple-1">auto</div>
</div>
<div class="ds-grid gap-sm my-sm"">
  <div class="ds-col is-one-third bg-purple-2">is-one-third</div>
  <div class="ds-col is-two-thirds bg-purple-1">is-two-thirds</div>
</div>
<div class="ds-grid gap-sm my-sm"">
  <div class="ds-col is-one-quarter bg-purple-2">is-one-quarter</div>
  <div class="ds-col is-three-quarters bg-purple-1">is-three-quarters</div>
</div>
`,
  ),
})
ColumnSizes.storyName = 'Column Sizes'

export const Multiline = Story({
  ...withRender(
    () => `
<div class="ds-grid is-multiline gap-sm">
  <div class="ds-col is-half"><div class="bg-purple-2 p-sm">1</div></div>
  <div class="ds-col is-half"><div class="bg-purple-3 p-sm">2</div></div>
  <div class="ds-col is-half"><div class="bg-purple-4 p-sm">3</div></div>
  <div class="ds-col is-half"><div class="bg-purple-5 p-sm">4</div></div>
</div>
`,
  ),
})
Multiline.storyName = 'Multiline'

export const Gapless = Story({
  ...withRender(
    () => `
<div class="ds-grid is-gapless gap-sm">
  <div class="ds-col bg-purple-2">Col 1</div>
  <div class="ds-col bg-purple-3">Col 2</div>
  <div class="ds-col bg-purple-4">Col 3</div>
</div>
`,
  ),
})
Gapless.storyName = 'Gapless'

export const Mobile = Story({
  ...withRender(
    () => `
<div class="ds-grid is-mobile gap-sm">
  <div class="ds-col is-half bg-purple-2">Half on mobile</div>
  <div class="ds-col bg-purple-3">Auto</div>
</div>
`,
  ),
})
Mobile.storyName = 'Mobile'
