import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'

export default {
  title: 'Foundation/Elevation/Code',
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
<div class="has-shadow-normal p-small mb-large">Shadow</div>
<div class="has-shadow-large p-small">Large shadow</div>`,
})
Shadow.args = {}
Shadow.parameters = {
  ...sourceCode(
    () => ({
      template: `
      <div class="has-shadow-normal">Shadow</div>
      <div class="has-shadow-large">Large shadow</div>`,
      components: [],
    }),
    Shadow.args,
    {},
  ),
  controls: { exclude: [] },
}
