import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'

export default {
  title: 'Foundation/Border & Radius/Code',
  parameters: {
    viewMode: 'docs',
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="has-border-primary p-normal"></div>`,
})
Basic.args = {}
Basic.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="has-border-primary"></div>`,
      components: [],
    }),
    Basic.args,
    {},
  ),
  controls: { exclude: [] },
}

export const BorderColors = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="has-border-primary p-x-small mb-x-small">Primary</div>
<div class="has-border-grey p-x-small mb-x-small">Grey</div>
<div class="has-border-grey-dark p-x-small mb-x-small">Grey Dark</div>
<div class="has-border-success p-x-small mb-x-small">Success</div>
<div class="has-border-danger p-x-small mb-x-small">Danger</div>
<div class="has-border-warning p-x-small mb-x-small">Warning</div>
`,
})
BorderColors.args = {}
BorderColors.parameters = {
  ...sourceCode(
    () => ({
      template: `
      <div class="has-border-primary">Primary</div>
      <div class="has-border-grey">Grey</div>
      <div class="has-border-grey-dark">Grey Dark</div>
      <div class="has-border-success">Success</div>
      <div class="has-border-danger">Danger</div>
      <div class="has-border-warning">Warning</div>`,
      components: [],
    }),
    BorderColors.args,
    {},
  ),
  controls: { exclude: [] },
}

export const BorderRadius = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="has-border-primary p-x-small mb-x-small has-radius-none">None</div>
<div class="has-border-primary p-x-small mb-x-small has-radius-normal">Normal</div>
<div class="has-border-primary p-x-small mb-x-small has-radius-large">Large</div>
<div class="has-border-primary p-x-small mb-x-small has-radius-rounded">Rounded</div>
`,
})
BorderRadius.args = {}
BorderRadius.parameters = {
  ...sourceCode(
    () => ({
      template: `
<div class="has-border-primary has-radius-none">None</div>
<div class="has-border-primary has-radius-normal">Normal</div>
<div class="has-border-primary has-radius-large">Large</div>
<div class="has-border-primary has-radius-rounded">Rounded</div>`,
      components: [],
    }),
    BorderColors.args,
    {},
  ),
  controls: { exclude: [] },
}
