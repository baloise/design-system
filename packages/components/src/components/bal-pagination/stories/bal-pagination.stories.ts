import docs from './bal-pagination.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalPagination } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalPagination,
  status: 'stable',
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-pagination v-bind="args"></bal-pagination>`,
})
Basic.args = {
  value: 2,
  pageRange: 3,
  totalPages: 20,
  disabled: false,
}
Basic.parameters = { ...component.sourceCode(Basic) }
