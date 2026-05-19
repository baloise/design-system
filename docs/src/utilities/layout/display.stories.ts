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
    () => `<div class="flex gap-normal">
  <div class="hidden bg-green p-normal radius">1</div>
  <div class="bg-green p-normal radius">2</div>
  <div class="bg-green p-normal radius">3</div>
</div>`,
  ),
})
export const Block = Story({
  ...withRender(
    () => `<div class="block bg-green text-align-center p-normal radius mb-normal">1</div>
<div class="block bg-green text-align-center p-normal radius mb-normal">2</div>
<div class="block bg-green text-align-center p-normal radius mb-normal">3</div>`,
  ),
})
export const Inline = Story({
  ...withRender(
    () => `<div class="inline bg-green text-align-center p-normal radius mx-normal">1</div>
<div class="inline bg-green text-align-center p-normal radius">2</div>
<div class="inline bg-green text-align-center p-normal radius mx-normal">3</div>`,
  ),
})
export const InlineBlock = Story({
  ...withRender(
    () => `<div class="inline-block bg-green text-align-center p-normal radius">1</div>
<div class="inline-block bg-green text-align-center p-normal radius mx-normal">2</div>
<div class="inline-block bg-green text-align-center p-normal radius">3</div>`,
  ),
})
export const Flex = Story({
  ...withRender(
    () => `<div class="flex gap-normal">
    <div class="flex-1 bg-green text-align-center p-normal radius">1</div>
    <div class="flex-1 bg-green text-align-center p-normal radius">2</div>
    <div class="flex-1 bg-green text-align-center p-normal radius">3</div>
</div>`,
  ),
})
export const InlineFlex = Story({
  ...withRender(
    () => `<div class="inline-flex gap-normal">
    <div class="flex-1 bg-green text-align-center p-normal radius">1</div>
    <div class="flex-1 bg-green text-align-center p-normal radius">2</div>
    <div class="flex-1 bg-green text-align-center p-normal radius">3</div>
</div>`,
  ),
})
export const Responsive = Story({
  ...withRender(
    () => `<div class="bg-yellow-2 p-small mb-small mobile:hidden">hidden-mobile</div>
<div class="bg-yellow-3 p-small mb-small tablet:hidden">hidden-tablet</div>
<div class="bg-yellow-4 p-small mb-small touch:hidden">hidden-touch</div>
<div class="bg-red-2 p-small mb-small desktop:hidden">hidden-desktop</div>
<div class="bg-red-3 p-small mb-small high-definition:hidden">hidden-high-definition</div>
<div class="bg-red-4 p-small mb-small widescreen:hidden">hidden-widescreen</div>
<div class="bg-red-5 p-small mb-small fullhd:hidden">hidden-fullhd</div>
<hr>
<div class="bg-purple-2 p-small mb-small tablet-only:hidden">hidden-tablet-only</div>
<div class="bg-purple-3 p-small mb-small desktop-only:hidden">hidden-desktop-only</div>
<div class="bg-purple-4 p-small mb-small high-definition-only:hidden">high-definition-only</div>
<div class="bg-purple-5 p-small mb-small widescreen-only:hidden">hidden-widescreen-only</div>`,
  ),
})
