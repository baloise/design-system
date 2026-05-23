import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { BrandIconCarGreen, BrandIconHouseholdGreen } from '@baloise/ds-assets'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsTabs

const meta: Meta<Args> = {
  title: 'Components/Tabs/Variants',
  args: {
    fullwidth: false,
    vertical: false,
    verticalColSize: 'one-third',
    label: '',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-tabs' }),
  },
  ...withRender(
    args => `
<ds-tabs ${props(args)}>
  <ds-tab name="a">Tab A</ds-tab>
  <ds-tab name="b">Tab B</ds-tab>
  <ds-tab name="c">Tab C</ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
  <ds-tab-panel for="c">Content C</ds-tab-panel>
</ds-tabs>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const Inverted = Story({
  ...withRender(
    () => `
<div class="bg-primary p-normal">
  <ds-tabs inverted>
    <ds-tab name="a">Tab A</ds-tab>
    <ds-tab name="b">Tab B</ds-tab>
    <ds-tab name="c">Tab C</ds-tab>
    <ds-tab-panel for="a">Content A</ds-tab-panel>
    <ds-tab-panel for="b">Content B</ds-tab-panel>
    <ds-tab-panel for="c">Content C</ds-tab-panel>
  </ds-tabs>
</div>`,
  ),
})
Inverted.storyName = '🧩 Inverted'

export const FullwidthIcons = Story({
  ...withRender(
    () => `
<ds-tabs fullwidth>
  <ds-tab name="a"><ds-icon name="date"></ds-icon>Tab A</ds-tab>
  <ds-tab name="b"><ds-icon name="edit"></ds-icon>Tab B</ds-tab>
  <ds-tab name="c"><ds-icon name="check"></ds-icon>Tab C</ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
  <ds-tab-panel for="c">Content C</ds-tab-panel>
</ds-tabs>`,
  ),
})
FullwidthIcons.storyName = '🧩 Fullwidth + Icons'

export const Badge = Story({
  ...withRender(
    () => `
<ds-tabs>
  <ds-tab name="a"><ds-badge size="sm">3</ds-badge>Tab A</ds-tab>
  <ds-tab name="b">Tab B<ds-badge>!</ds-badge></ds-tab>
  <ds-tab name="c">Tab C</ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
  <ds-tab-panel for="c">Content C</ds-tab-panel>
</ds-tabs>`,
  ),
})
Badge.storyName = '🧩 Badge'

export const BrandIcons = Story({
  ...withRender(
    () => `
<ds-tabs fullwidth value="b">
  <ds-tab name="a">
    <ds-icon svg='${BrandIconHouseholdGreen}' size="lg" color="auto"></ds-icon>
    <span class="stack gap-none">
      <span>Tab A</span>
      <span class="text text-sm">Subtitle</span>
    </span>
  </ds-tab>
  <ds-tab name="b">
    <ds-icon svg='${BrandIconCarGreen}' size="lg" color="auto"></ds-icon>
    <span>Tab B</span>
  </ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
</ds-tabs>`,
  ),
})
BrandIcons.storyName = '🧩 Brand Icons'

export const Vertical = Story({
  args: { vertical: true },
  ...withRender(
    () => `
<ds-tabs vertical>
  <ds-tab name="a">Tab A</ds-tab>
  <ds-tab name="b">Tab B</ds-tab>
  <ds-tab name="c">Tab C</ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
  <ds-tab-panel for="c">Content C</ds-tab-panel>
</ds-tabs>`,
  ),
})
Vertical.storyName = '🧩 Vertical'

export const VerticalCols = Story({
  args: { vertical: true, verticalColSize: 'one-quarter' },
  ...withRender(
    ({ verticalColSize }) => `
<ds-tabs vertical vertical-col-size="${verticalColSize ?? 'one-quarter'}">
  <ds-tab name="a">Tab A with a longer title to test text wrapping</ds-tab>
  <ds-tab name="b">Tab B</ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
</ds-tabs>`,
  ),
})
VerticalCols.storyName = '🧩 Vertical Cols'

export const Navigation = Story({
  ...withRender(
    () => `
<ds-tabs label="Page sections">
  <ds-tab name="first"><a href="#first" aria-current="page">First page</a></ds-tab>
  <ds-tab name="second"><a href="#second">Second page</a></ds-tab>
  <ds-tab name="third"><a href="#third">Third page</a></ds-tab>
</ds-tabs>`,
  ),
})
Navigation.storyName = '🧩 Navigation'

export const Carousel = Story({
  ...withRender(
    () => `
<div style="max-width: 400px">
  <ds-tabs>
    <ds-tab name="a">Tab Alpha</ds-tab>
    <ds-tab name="b">Tab Beta</ds-tab>
    <ds-tab name="c">Tab Gamma</ds-tab>
    <ds-tab name="d">Tab Delta</ds-tab>
    <ds-tab name="e">Tab Epsilon</ds-tab>
    <ds-tab name="f">Tab Zeta</ds-tab>
    <ds-tab name="g">Tab Eta</ds-tab>
    <ds-tab name="h">Tab Theta</ds-tab>
    <ds-tab-panel for="a">Content Alpha</ds-tab-panel>
    <ds-tab-panel for="b">Content Beta</ds-tab-panel>
    <ds-tab-panel for="c">Content Gamma</ds-tab-panel>
    <ds-tab-panel for="d">Content Delta</ds-tab-panel>
    <ds-tab-panel for="e">Content Epsilon</ds-tab-panel>
    <ds-tab-panel for="f">Content Zeta</ds-tab-panel>
    <ds-tab-panel for="g">Content Eta</ds-tab-panel>
    <ds-tab-panel for="h">Content Theta</ds-tab-panel>
  </ds-tabs>
</div>`,
  ),
})
Carousel.storyName = '🧩 Carousel'
