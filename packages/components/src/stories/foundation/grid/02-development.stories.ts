import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'

export default {
  title: 'Foundation/Grid/Development',
  parameters: {
    viewMode: 'docs',
    docs: {
      page: docs,
    },
  },
}

export const BreakpointsCSSUtility = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="has-background-yellow-1 p-small mb-small is-hidden-mobile">is-hidden-mobile</div>
<div class="has-background-yellow-2 p-small mb-small is-hidden-tablet">is-hidden-tablet</div>
<div class="has-background-yellow-3 p-small mb-small is-hidden-touch">is-hidden-touch</div>
<div class="has-background-red-1 p-small mb-small is-hidden-desktop">is-hidden-desktop</div>
<div class="has-background-red-2 p-small mb-small is-hidden-high-definition">is-hidden-high-definition</div>
<div class="has-background-red-3 p-small mb-small is-hidden-widescreen">is-hidden-widescreen</div>
<div class="has-background-red-4 p-small mb-small is-hidden-fullhd">is-hidden-fullhd</div>
<hr>
<div class="has-background-purple-1 p-small mb-small is-hidden-tablet-only">is-hidden-tablet-only</div>
<div class="has-background-purple-2 p-small mb-small is-hidden-desktop-only">is-hidden-desktop-only</div>
<div class="has-background-purple-3 p-small mb-small is-hidden-high-definition-only">is-high-definition-tablet-only</div>
<div class="has-background-purple-4 p-small mb-small is-hidden-widescreen-only">is-hidden-widescreen-only</div>
`,
})
BreakpointsCSSUtility.args = {}
BreakpointsCSSUtility.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="is-hidden-mobile">is-hidden-mobile</div>
      <div class="is-hidden-tablet">is-hidden-tablet</div>
      <div class="is-hidden-touch">is-hidden-touch</div>
      <div class="is-hidden-desktop">is-hidden-desktop</div>
      <div class="is-hidden-high-definition">is-hidden-high-definition</div>
      <div class="is-hidden-widescreen">is-hidden-widescreen</div>
      <div class="is-hidden-fullhd">is-hidden-fullhd</div>
      <hr>
      <div class="is-hidden-tablet-only">is-hidden-tablet-only</div>
      <div class="is-hidden-desktop-only">is-hidden-desktop-only</div>
      <div class="is-hidden-high-definition-only">is-high-definition-tablet-only</div>
      <div class="is-hidden-widescreen-only">is-hidden-widescreen-only</div>`,
      components: [],
    }),
    BreakpointsCSSUtility.args,
    {},
  ),
  controls: { exclude: [] },
  layout: 'fullscreen',
}

export const ContainerCSSUtility = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="has-background-black">
  <div class="container has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container default</h2>
    </div>
  </div>
  <div class="container is-detail-page has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container detail-page</h2>
    </div>
  </div>
  <div class="container is-compact has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container compact</h2>
    </div>
  </div>
  <div class="container is-blog-page has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container blog-page</h2>
    </div>
  </div>
  <div class="container is-fluid has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container fluid</h2>
    </div>
  </div>
</div>`,
})
ContainerCSSUtility.args = {}
ContainerCSSUtility.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="container">container default</div>
      <div class="container is-detail-page">container detail-page</div>
      <div class="container is-compact">container compact</div>
      <div class="container is-blog-page">container blog-page</div>
      <div class="container is-fluid">container fluid</div>`,
      components: [],
    }),
    ContainerCSSUtility.args,
    {},
  ),
  controls: { exclude: [] },
  layout: 'fullscreen',
}

export const Grid = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns">
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">First column</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">Second column</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">Third column</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">Fourth column</div>
    </div>
  </div>`,
})
Grid.args = {}
Grid.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="columns">
      <div class="column">First column</div>
      <div class="column">Second column</div>
      <div class="column">Third column</div>
      <div class="column">Fourth column</div>
    </div>`,
      components: [],
    }),
    Grid.args,
    {},
  ),
  controls: { exclude: [] },
}

export const GridColumnSize = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-multiline">
    <div class="column is-full">
      <div class="has-background-green-2 p-small has-radius-normal">Full column</div>
    </div>

    <div class="column is-half">
      <div class="has-background-green-2 p-small has-radius-normal">Half column</div>
    </div>
    <div class="column is-half">
      <div class="has-background-green-2 p-small has-radius-normal">Half column</div>
    </div>

    <div class="column is-one-third">
      <div class="has-background-green-2 p-small has-radius-normal">1 Third column</div>
    </div>
    <div class="column is-two-thirds">
      <div class="has-background-green-2 p-small has-radius-normal">2 Third column</div>
    </div>

    <div class="column is-one-quarter">
      <div class="has-background-green-2 p-small has-radius-normal">1 quarter column</div>
    </div>
    <div class="column is-three-quarters">
      <div class="has-background-green-2 p-small has-radius-normal">3 quarter columns</div>
    </div>

    <div class="column is-one-fifth">
      <div class="has-background-green-2 p-small has-radius-normal">1 fifth column</div>
    </div>
    <div class="column is-four-fifths">
      <div class="has-background-green-2 p-small has-radius-normal">4 fifth columns</div>
    </div>

    <div class="column is-12">
      <div class="has-background-red-2 p-small has-radius-normal">12</div>
    </div>

    <div class="column is-11">
      <div class="has-background-red-2 p-small has-radius-normal">11</div>
    </div>
    <div class="column is-1">
      <div class="has-background-grey-2 p-small has-radius-normal">1</div>
    </div>

    <div class="column is-10">
      <div class="has-background-red-2 p-small has-radius-normal">10</div>
    </div>
    <div class="column is-2">
      <div class="has-background-grey-2 p-small has-radius-normal">2</div>
    </div>

    <div class="column is-9">
      <div class="has-background-red-2 p-small has-radius-normal">9</div>
    </div>
    <div class="column is-3">
      <div class="has-background-grey-2 p-small has-radius-normal">3</div>
    </div>

    <div class="column is-8">
      <div class="has-background-red-2 p-small has-radius-normal">8</div>
    </div>
    <div class="column is-4">
      <div class="has-background-grey-2 p-small has-radius-normal">4</div>
    </div>

    <div class="column is-7">
      <div class="has-background-red-2 p-small has-radius-normal">7</div>
    </div>
    <div class="column is-5">
      <div class="has-background-grey-2 p-small has-radius-normal">5</div>
    </div>

    <div class="column is-6">
      <div class="has-background-red-2 p-small has-radius-normal">6</div>
    </div>
    <div class="column is-6">
      <div class="has-background-grey-2 p-small has-radius-normal">6</div>
    </div>

  </div>`,
})
GridColumnSize.args = {}
GridColumnSize.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="columns is-multiline">
      <div class="column is-full">Full column</div>
      <div class="column is-half">Half column</div>
      <div class="column is-half">Half column</div>
      <div class="column is-one-third">1 Third column</div>
      <div class="column is-two-thirds">2 Thirds column</div>
      <div class="column is-one-quarter">1 quarter column</div>
      <div class="column is-three-quarters">3 quarters columns</div>
      <div class="column is-one-fifth">1 fifth column</div>
      <div class="column is-four-fifths">4 fifth columns</div>

      <div class="column is-12">12</div>
      <div class="column is-11">11</div>
      <div class="column is-1">1</div>
      <div class="column is-10">10</div>
      <div class="column is-2">2</div>
      <div class="column is-9">9</div>
      <div class="column is-3">3</div>
      <div class="column is-8">8</div>
      <div class="column is-4">4</div>
      <div class="column is-7">7</div>
      <div class="column is-5">5</div>
      <div class="column is-6">6</div>
      <div class="column is-6">6</div>
    </div>`,
      components: [],
    }),
    GridColumnSize.args,
    {},
  ),
  controls: { exclude: [] },
}

export const GridRows = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-multiline">
  <div class="column is-full">
    <div class="has-background-yellow-2 p-small has-radius-normal">First row</div>
  </div>

  <div class="column is-full">
    <div class="has-background-yellow-3 p-small has-radius-normal">Second row</div>
  </div>

</div>`,
})
GridRows.args = {}
GridRows.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="columns is-multiline">
      <div class="column is-full">First row</div>
      <div class="column is-full">Second row</div>
    </div>`,
      components: [],
    }),
    GridRows.args,
    {},
  ),
  controls: { exclude: [] },
}

export const GridNested = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns">
  <div class="column is-half">
    <div class="has-background-purple-1 p-small has-radius-normal">Half</div>
  </div>
  <div class="column is-half">
    <div class="columns">
      <div class="column is-half">
        <div class="has-background-purple-2 p-small has-radius-normal">Half</div>
      </div>
      <div class="column is-half">
        <div class="has-background-purple-2 p-small has-radius-normal">Half</div>
      </div>
    </div>
  </div>
</div>`,
})
GridNested.args = {}
GridNested.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="columns">
      <div class="column is-half">Half</div>
      <div class="column is-half">
        <div class="columns">
          <div class="column is-half">Half</div>
          <div class="column is-half">Half</div>
        </div>
      </div>
    </div>`,
      components: [],
    }),
    GridNested.args,
    {},
  ),
  controls: { exclude: [] },
}

export const GridSpace = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-gapless">
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">First column</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">Second column</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">Third column</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">Fourth column</div>
    </div>
  </div>`,
})
GridSpace.args = {}
GridSpace.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="columns is-gapless">
      <div class="column">First column</div>
      <div class="column">Second column</div>
      <div class="column">Third column</div>
      <div class="column">Fourth column</div>
    </div>`,
      components: [],
    }),
    GridSpace.args,
    {},
  ),
  controls: { exclude: [] },
}

export const GridBreakpoint = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-mobile">
    <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
      <div class="has-background-green-2 p-small has-radius-normal">
        is-three-quarters-mobile<br>
        is-two-thirds-tablet<br>
        is-half-desktop<br>
        is-one-third-widescreen<br>
        is-one-quarter-fullhd
      </div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">auto</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">auto</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">auto</div>
    </div>
  </div>`,
})
GridBreakpoint.args = {}
GridBreakpoint.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="columns is-mobile">
      <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          is-three-quarters-mobile<br>
          is-two-thirds-tablet<br>
          is-half-desktop<br>
          is-one-third-widescreen<br>
          is-one-quarter-fullhd
      </div>
      <div class="column">auto</div>
      <div class="column">auto</div>
      <div class="column">auto</div>
    </div>`,
      components: [],
    }),
    GridBreakpoint.args,
    {},
  ),
  controls: { exclude: [] },
}

export const GridVerticalAlignment = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <div class="has-background-green-2 p-small has-radius-normal">First column</div>
    </div>
    <div class="column">
      <div class="has-background-green-2 p-small has-radius-normal">Second column with some random large text to make a good case here. Unfortunately, we need more content to make it visible that the first column is now vertically centered.</div>
    </div>
  </div>`,
})
GridVerticalAlignment.args = {}
GridVerticalAlignment.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="columns is-vcentered">
      <div class="column is-two-thirds">First column</div>
      <div class="column">Second column with some random large text to make a good case here. Unfortunately, we need more content to make it visible that the first column is now vertically centered.</div>
    </div>`,
      components: [],
    }),
    GridVerticalAlignment.args,
    {},
  ),
  controls: { exclude: [] },
}

export const GridHorizontalAlignment = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-centered">
    <div class="column is-one-third">
      <div class="has-background-green-2 p-small has-radius-normal">My centered column</div>
    </div>
  </div>`,
})
GridHorizontalAlignment.args = {}
GridHorizontalAlignment.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="columns is-centered">
      <div class="column is-one-third">My centered column</div>
    </div>`,
      components: [],
    }),
    GridHorizontalAlignment.args,
    {},
  ),
  controls: { exclude: [] },
}

export const GridStretch = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-multiline">
    <div class="column is-two-thirds">
      <div class="has-background-green-2 p-small has-radius-normal is-fullheight">Stretches to the full height of the row</div>
    </div>
    <div class="column is-one-third">
      <div class="has-background-green-2 p-small has-radius-normal is-fullheight">Second column with some random large text to make a good case here. Unfortunately, we need more content to make it visible that the first column is now vertically centered.</div>
    </div>
    <div class="column is-half">
      <div class="has-background-green-2 p-small has-radius-normal is-fullheight">Second column with some random large text to make a good case here. Unfortunately, we need more content to make it visible that the first column is now vertically centered.</div>
    </div>
    <div class="column is-half">
      <div class="has-background-green-2 p-small has-radius-normal is-fullheight">Stretches to the full height of the row</div>
    </div>
  </div>`,
})
GridStretch.args = {}
GridStretch.parameters = {
  ...sourceCode(GridStretch, GridStretch.args, {}),
  controls: { exclude: [] },
}
