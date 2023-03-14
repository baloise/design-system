import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'

export default {
  title: 'Foundation/Elevation/Development',
  parameters: {
    viewMode: 'docs',
    docs: {
      page: docs,
    },
  },
}

export const Shadow = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="has-shadow-normal p-small mb-large">Shadow</div>`,
})
Shadow.args = {}
Shadow.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="has-shadow-normal">Shadow</div>`,
      components: [],
    }),
    Shadow.args,
    {},
  ),
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
