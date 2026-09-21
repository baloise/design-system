import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Layout/Display',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Hidden = Story({
  ...withRender(
    () => `<div class="flex gap-base">
  <div class="hidden bg-red p-base radius">1</div>
  <div class="bg-red p-base radius">2</div>
  <div class="bg-red p-base radius">3</div>
</div>`,
  ),
})
export const Block = Story({
  ...withRender(
    () => `<div class="block bg-red text-align-center p-base radius mb-base">1</div>
<div class="block bg-red text-align-center p-base radius mb-base">2</div>
<div class="block bg-red text-align-center p-base radius mb-base">3</div>`,
  ),
})
export const Inline = Story({
  ...withRender(
    () => `<div class="inline bg-red text-align-center p-base radius mx-base">1</div>
<div class="inline bg-red text-align-center p-base radius">2</div>
<div class="inline bg-red text-align-center p-base radius mx-base">3</div>`,
  ),
})
export const InlineBlock = Story({
  ...withRender(
    () => `<div class="inline-block bg-red text-align-center p-base radius">1</div>
<div class="inline-block bg-red text-align-center p-base radius mx-base">2</div>
<div class="inline-block bg-red text-align-center p-base radius">3</div>`,
  ),
})
export const Flex = Story({
  ...withRender(
    () => `<div class="flex gap-base">
    <div class="flex-1 bg-red text-align-center p-base radius">1</div>
    <div class="flex-1 bg-red text-align-center p-base radius">2</div>
    <div class="flex-1 bg-red text-align-center p-base radius">3</div>
</div>`,
  ),
})
export const InlineFlex = Story({
  ...withRender(
    () => `<div class="inline-flex gap-base">
    <div class="flex-1 bg-red text-align-center p-base radius">1</div>
    <div class="flex-1 bg-red text-align-center p-base radius">2</div>
    <div class="flex-1 bg-red text-align-center p-base radius">3</div>
</div>`,
  ),
})
export const Responsive = Story({
  ...withRender(
    () => `<div class="bg-yellow-2 p-sm mb-sm mobile:hidden">hidden-mobile</div>
<div class="bg-yellow-3 p-sm mb-sm tablet:hidden">hidden-tablet</div>
<div class="bg-yellow-4 p-sm mb-sm touch:hidden">hidden-touch</div>
<div class="bg-red-2 p-sm mb-sm desktop:hidden">hidden-desktop</div>
<div class="bg-red-3 p-sm mb-sm high-definition:hidden">hidden-high-definition</div>
<div class="bg-red-4 p-sm mb-sm widescreen:hidden">hidden-widescreen</div>
<div class="bg-red-5 p-sm mb-sm fullhd:hidden">hidden-fullhd</div>
<hr>
<div class="bg-purple-2 p-sm mb-sm tablet-only:hidden">hidden-tablet-only</div>
<div class="bg-purple-3 p-sm mb-sm desktop-only:hidden">hidden-desktop-only</div>
<div class="bg-purple-4 p-sm mb-sm high-definition-only:hidden">high-definition-only</div>
<div class="bg-purple-5 p-sm mb-sm widescreen-only:hidden">hidden-widescreen-only</div>`,
  ),
})
