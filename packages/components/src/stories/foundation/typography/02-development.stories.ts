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

export const TextColors = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<p>Default - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-light-blue">Light-Blue / Hover - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-blue-dark">Blue-Dark / Active - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-grey">Grey / Disabled - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-blue-light">Hint / Help - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-success">Success / Valid - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-warning">Warning - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-danger">Danger / Valid - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

<hr/>

<bal-text color="primary-light">Text with the color primary-light</bal-text>
<bal-text color="danger">Text with the color danger</bal-text>
`,
})
TextColors.args = {}
TextColors.parameters = {
  ...sourceCode(TextColors, TextColors.args, {}),
  controls: { exclude: [] },
}

export const TextFamily = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<p class="is-family-title is-bold">The font type for titles</p>
<p class="is-family-text">The font type for text blocks</p>
`,
})
TextFamily.args = {}
TextFamily.parameters = {
  ...sourceCode(TextFamily, TextFamily.args, {}),
  controls: { exclude: [] },
}

export const TextWeight = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<p class="is-family-title is-light">Light text used for subtitles only</p>
<p>Default weight same as regular</p>
<p class="is-regular">Regular weight same as default</p>
<p class="is-bold">Bold text used for headings and actions</p>
`,
})
TextWeight.args = {}
TextWeight.parameters = {
  ...sourceCode(TextWeight, TextWeight.args, {}),
  controls: { exclude: [] },
}

export const TextAlignment = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<p class="has-text-left">Text on the left side</p>
<p class="has-text-centered">Centered text</p>
<p class="has-text-right">Text on the right side</p>
<p class="has-text-justified">Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

`,
})
TextAlignment.args = {}
TextAlignment.parameters = {
  ...sourceCode(TextAlignment, TextAlignment.args, {}),
  controls: { exclude: [] },
}

export const TextTransform = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<p class="is-capitalized">capitalized text</p>
<p class="is-lowercase">Lowercase Text</p>
<p class="is-uppercase">uppercase text</p>
`,
})
TextTransform.args = {}
TextTransform.parameters = {
  ...sourceCode(TextTransform, TextTransform.args, {}),
  controls: { exclude: [] },
}

export const TextShadow = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<p class="has-text-shadow">Text with a light shadow to increase readability on images</p>
`,
})
TextShadow.args = {}
TextShadow.parameters = {
  ...sourceCode(TextShadow, TextShadow.args, {}),
  controls: { exclude: [] },
}
