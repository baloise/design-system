import { stencilArgType } from '../../../../stories/utils'
import { BalSelect, BalSelectOption } from '../../../../../.storybook/vue/components'
import { marvelHeros } from './examples.docs'
import docs from './readme.docs.mdx'

export default {
  title: 'Components/Form/Select',
  component: BalSelect,
  argTypes: {
    ...stencilArgType('bal-select'),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = (args, { argTypes }) => ({
  components: { BalSelect, BalSelectOption },
  props: Object.keys(argTypes),
  setup: () => ({ args }),
  template: `
  <bal-select v-bind="args">
    <bal-select-option value="v1995" label="1995">1995</bal-select-option>
    <bal-select-option value="v1996" label="1996">1996</bal-select-option>
    <bal-select-option value="v1997" label="1997">1997</bal-select-option>
    <bal-select-option value="v1998" label="1998">1998</bal-select-option>
    <bal-select-option value="v1999" label="1999">1999</bal-select-option>
    <bal-select-option value="v2000" label="2000">2000</bal-select-option>
  </bal-select>`,
})

export const Typeahead = (args, { argTypes }) => ({
  components: { BalSelect, BalSelectOption },
  props: Object.keys(argTypes),
  setup: () => ({ args }),
  template: `
  <bal-select v-bind="args">
  ${marvelHeros}
</bal-select>`,
})
Typeahead.args = {
  typeahead: true,
  expanded: true,
  placeholder: 'Try finding your hero',
  noDataLabel: 'No option available',
}

export const MultiSelect = (args, { argTypes }) => ({
  components: { BalSelect, BalSelectOption },
  props: Object.keys(argTypes),
  setup: () => ({ args }),
  template: `
  <bal-select v-bind="args">
  ${marvelHeros}
</bal-select>`,
})
MultiSelect.args = {
  multiple: true,
  placeholder: 'Try finding your hero',
}
