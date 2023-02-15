import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'

export default {
  title: 'Foundation/Brand & Assets/Development',
  parameters: {
    viewMode: 'docs',
    docs: {
      page: docs,
    },
  },
}

export const Logo = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<bal-logo></bal-logo>`,
})
Logo.args = {}
Logo.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-logo></bal-logo>`,
      components: [],
    }),
    Logo.args,
    {},
  ),
  controls: { exclude: [] },
}

export const Shape = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<bal-shape></bal-shape>`,
})
Shape.args = {}
Shape.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-shape></bal-shape>`,
      components: [],
    }),
    Shape.args,
    {},
  ),
  controls: { exclude: [] },
}
