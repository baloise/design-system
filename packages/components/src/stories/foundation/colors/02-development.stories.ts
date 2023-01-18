import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'

export default {
  title: 'Foundation/Colors/Code',
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
  template: `<div class="has-background-grey-1 has-border-grey-dark p-normal">
    <span class="has-text-grey">My Colored Text</span>
  </div>`,
})
Basic.args = {}
Basic.parameters = {
  ...sourceCode(Basic, Basic.args, {}),
  controls: { exclude: [] },
}

export const BackgroundColor = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="has-background-green p-normal">Green background</div>`,
})
BackgroundColor.args = {}
BackgroundColor.parameters = {
  ...sourceCode(BackgroundColor, BackgroundColor.args, {}),
  controls: { exclude: [] },
}

export { TextColors } from '../typography/02-development.stories'

export { BorderColors } from '../border-radius/02-development.stories'
