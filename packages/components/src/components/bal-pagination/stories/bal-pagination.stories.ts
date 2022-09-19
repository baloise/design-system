import docs from './bal-pagination.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalPagination } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalPagination,
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

export const SmallPagination = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-pagination v-bind="args"></bal-pagination>`,
})
SmallPagination.args = {
  interface: 'small',
  totalPages: 10,
  disabled: false,
}
SmallPagination.parameters = { ...component.sourceCode(SmallPagination) }

export const SmallPaginationWithDots = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-pagination v-bind="args"></bal-pagination>`,
})
SmallPaginationWithDots.args = {
  interface: 'small',
  totalPages: 3,
  disabled: false,
}
SmallPaginationWithDots.parameters = { ...component.sourceCode(SmallPaginationWithDots) }
