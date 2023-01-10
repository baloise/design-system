import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'

export default {
  title: 'Foundation/Typography/Code',
  parameters: {
    viewMode: 'docs',
    docs: {
      page: docs,
    },
  },
}

export const HeadingAndDisplay = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<h1 class="title is-size-xxx-large">My Heading One</h1>
<h1 class="subtitle is-size-xxx-large">My Thin Heading One</h1>

<hr />

<bal-heading level="h1">My Heading One</bal-heading>
<bal-heading subtitle level="h1">My Thin Heading One</bal-heading>
`,
})
HeadingAndDisplay.args = {}
HeadingAndDisplay.parameters = {
  ...sourceCode(HeadingAndDisplay, HeadingAndDisplay.args, {}),
  controls: { exclude: [] },
}

export const Text = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<p class="is-size-large">My lead text</p>
<p>My text</p>
<p class="is-bold">My bold text</p>
<p class="is-size-small">My small text</p>

<hr/>

<bal-text size="lead">My lead text</bal-text>
<bal-text>My text</bal-text>
<bal-text bold>My bold text</bal-text>
<bal-text size="small">My small text</bal-text>
`,
})
Text.args = {}
Text.parameters = {
  ...sourceCode(Text, Text.args, {}),
  controls: { exclude: [] },
}
