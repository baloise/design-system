import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Sizing/Width',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Basic = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center">
  <div class="radius bg-green-2 w-12rem p-small m-small">
    <div class="w-full radius bg-green-4 p-small flex align-items-center justify-content-center">w-full</div>
  </div>
  <div class="radius bg-green-2 w-12rem p-small m-small">
    <div class="w-auto radius bg-green-4 p-small flex align-items-center justify-content-center">w-auto</div>
  </div>
  <div class="radius bg-green-2 w-12rem p-small m-small">
    <div class="w-min radius bg-green-4 p-small flex align-items-center justify-content-center">w-min</div>
  </div>
  <div class="radius bg-green-2 w-12rem p-small m-small">
    <div class="w-max radius bg-green-4 p-small flex align-items-center justify-content-center">w-max</div>
  </div>
</div>`,
  ),
})
export const FixedWidth = Story({
  ...withRender(
    () => `<div class="w-26rem">
  <div class="w-6rem radius bg-green-4 p-small m-small flex align-items-center justify-content-center">w-6rem</div>
  <div class="w-12rem radius bg-green-4 p-small m-small flex align-items-center justify-content-center">w-12rem</div>
  <div class="w-24rem radius bg-green-4 p-small m-small flex align-items-center justify-content-center">w-24rem</div>
</div>`,
  ),
})
export const FluidWidth = Story({
  ...withRender(
    () => `<div class="flex radius bg-green-2 p-small m-small">
  <div class="w-2 bg-green-4 font-bold p-x-small flex align-items-center justify-content-center">w-2</div>
  <div class="w-10 bg-green-6 text-white font-bold p-small flex align-items-center justify-content-center">w-10</div>
</div>
<div class="flex radius bg-green-2 p-small m-small">
  <div class="w-4 bg-green-4 font-bold p-small flex align-items-center justify-content-center">w-4</div>
  <div class="w-8 bg-green-6 text-white font-bold p-small flex align-items-center justify-content-center">w-8</div>
</div>
<div class="flex radius bg-green-2 p-small m-small">
  <div class="w-5 bg-green-4 font-bold p-small flex align-items-center justify-content-center">w-5</div>
  <div class="w-7 bg-green-6 text-white font-bold p-small flex align-items-center justify-content-center">w-7</div>
</div>
<div class="flex radius bg-green-2 p-small m-small">
  <div class="w-6 bg-green-4 font-bold p-small flex align-items-center justify-content-center">w-6</div>
  <div class="w-6 bg-green-6 text-white font-bold p-small flex align-items-center justify-content-center">w-6</div>
</div>
<div class="flex radius bg-green-2 p-small m-small">
  <div class="w-9 bg-green-4 font-bold p-small flex align-items-center justify-content-center">w-9</div>
  <div class="w-3 bg-green-6 text-white font-bold p-small flex align-items-center justify-content-center">w-3</div>
</div>
<div class="flex radius bg-green-2 p-small m-small">
  <div class="w-12 bg-green-4 font-bold p-small flex align-items-center justify-content-center">w-12</div>
</div>`,
  ),
})
export const Responsive = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center">
  <div class="radius bg-green-2 w-20rem p-small m-small">
    <div class="w-min tablet:w-full radius bg-green-4 p-small flex align-items-center justify-content-center">w-min on small screen</div>
  </div>
</div>`,
  ),
})
