import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Grid/Grid System',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Basic = Story({
  ...withRender(
    () => `<div class="grid">
    <div class="col">
      <div class="bg-green p-sm radius">First column</div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">Second column</div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">Third column</div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">Fourth column</div>
    </div>
  </div>`,
  ),
})
export const ColumnSizes = Story({
  ...withRender(
    () => `<div class="grid is-multiline">
    <div class="col is-full">
      <div class="bg-green p-sm radius">Full column</div>
    </div>

    <div class="col is-half">
      <div class="bg-green p-sm radius">Half column</div>
    </div>
    <div class="col is-half">
      <div class="bg-green p-sm radius">Half column</div>
    </div>

    <div class="col is-one-third">
      <div class="bg-green p-sm radius">1 Third column</div>
    </div>
    <div class="col is-two-thirds">
      <div class="bg-green p-sm radius">2 Third column</div>
    </div>

    <div class="col is-one-quarter">
      <div class="bg-green p-sm radius">1 quarter column</div>
    </div>
    <div class="col is-three-quarters">
      <div class="bg-green p-sm radius">3 quarter grid</div>
    </div>

    <div class="col is-one-fifth">
      <div class="bg-green p-sm radius">1 fifth column</div>
    </div>
    <div class="col is-four-fifths">
      <div class="bg-green p-sm radius">4 fifth grid</div>
    </div>

    <div class="col is-12">
      <div class="bg-red-3 p-sm radius">12</div>
    </div>

    <div class="col is-11">
      <div class="bg-red-3 p-sm radius">11</div>
    </div>
    <div class="col is-1">
      <div class="bg-grey-3 p-sm radius">1</div>
    </div>

    <div class="col is-10">
      <div class="bg-red-3 p-sm radius">10</div>
    </div>
    <div class="col is-2">
      <div class="bg-grey-3 p-sm radius">2</div>
    </div>

    <div class="col is-9">
      <div class="bg-red-3 p-sm radius">9</div>
    </div>
    <div class="col is-3">
      <div class="bg-grey-3 p-sm radius">3</div>
    </div>

    <div class="col is-8">
      <div class="bg-red-3 p-sm radius">8</div>
    </div>
    <div class="col is-4">
      <div class="bg-grey-3 p-sm radius">4</div>
    </div>

    <div class="col is-7">
      <div class="bg-red-3 p-sm radius">7</div>
    </div>
    <div class="col is-5">
      <div class="bg-grey-3 p-sm radius">5</div>
    </div>

    <div class="col is-6">
      <div class="bg-red-3 p-sm radius">6</div>
    </div>
    <div class="col is-6">
      <div class="bg-grey-3 p-sm radius">6</div>
    </div>

  </div>`,
  ),
})
export const Rows = Story({
  ...withRender(
    () => `<div class="grid is-multiline">
  <div class="col is-full">
    <div class="bg-green p-sm radius">First row</div>
  </div>
  <div class="col is-full">
    <div class="bg-red-3 p-sm radius">Second row</div>
  </div>
</div>`,
  ),
})
export const Nested = Story({
  ...withRender(
    () => `<div class="grid">
  <div class="col is-half">
    <div class="bg-green p-sm radius">Half</div>
  </div>
  <div class="col is-half">
    <div class="grid">
      <div class="col is-half">
        <div class="bg-red-3 p-sm radius">Half</div>
      </div>
      <div class="col is-half">
        <div class="bg-red-3 p-sm radius">Half</div>
      </div>
    </div>
  </div>
</div>`,
  ),
})
export const Space = Story({
  ...withRender(
    () => `<div class="grid is-gapless">
    <div class="col">
      <div class="bg-green p-sm radius">First column</div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">Second column</div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">Third column</div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">Fourth column</div>
    </div>
  </div>`,
  ),
})
export const VerticalAlignment = Story({
  ...withRender(
    () => `<div class="grid is-vcentered">
    <div class="col is-two-thirds">
      <div class="bg-green-2 p-sm radius">First column</div>
    </div>
    <div class="col">
      <div class="bg-green-2 p-sm radius">Second column with some random large text to make a good case here. Unfortunately, more content is needed to make it visible that the first column is now vertically centered.</div>
    </div>
  </div>`,
  ),
})
export const HorizontalAlignment = Story({
  ...withRender(
    () => `<div class="grid is-centered">
    <div class="col is-one-third">
      <div class="bg-green-2 p-sm radius">My centered column</div>
    </div>
  </div>`,
  ),
})
export const Stretch = Story({
  ...withRender(
    () => `<div class="grid is-multiline">
    <div class="col is-two-thirds">
      <div class="bg-green-2 p-sm radius h-full">Stretches to the full height of the row</div>
    </div>
    <div class="col is-one-third">
      <div class="bg-green-2 p-sm radius h-full">Second column with some random large text to make a good case here. Unfortunately, more content is needed to make it visible that the first column is now vertically centered.</div>
    </div>
    <div class="col is-half">
      <div class="bg-green-2 p-sm radius h-full">Second column with some random large text to make a good case here. Unfortunately, more content is needed to make it visible that the first column is now vertically centered.</div>
    </div>
    <div class="col is-half">
      <div class="bg-green-2 p-sm radius h-full">Stretches to the full height of the row</div>
    </div>
  </div>`,
  ),
})
export const Responsive = Story({
  ...withRender(
    () => `<div class="grid is-mobile">
    <div class="col mobile:is-three-quarters tablet:is-two-thirds desktop:is-half widescreen:is-one-third fullhd:is-one-quarter">
      <div class="bg-green p-sm radius">
        is-three-quarters-mobile<br>
        is-two-thirds-tablet<br>
        is-half-desktop<br>
        is-one-third-widescreen<br>
        is-one-quarter-fullhd
      </div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">auto</div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">auto</div>
    </div>
    <div class="col">
      <div class="bg-green p-sm radius">auto</div>
    </div>
  </div>`,
  ),
})
