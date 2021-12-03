import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../stories/utils'
import { BalPagination } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Pagination',
  component: BalPagination,
  argTypes: {
    ...stencilArgType('bal-pagination'),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: { BalPagination },
  setup: () => ({ args }),
  template: `<bal-pagination v-bind="args"></bal-pagination>`,
})
Basic.args = {
  value: 2,
  pageRange: 3,
  totalPages: 20,
  disabled: false,
}
