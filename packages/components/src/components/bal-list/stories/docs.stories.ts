import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../stories/utils'
import { BalList, BalListItem, BalListItemContent, BalIcon, BalListItemIcon, BalListItemTitle, BalListItemSubtitle } from '../../../../.storybook/vue/components'

const subcomponents = { BalListItem, BalListItemContent, BalListItemIcon, BalListItemTitle, BalListItemSubtitle }
const components = { BalList, ...subcomponents }
export default {
  title: 'Components/List',
  component: BalList,
  subcomponents,
  argTypes: {
    ...stencilArgType('bal-list'),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: { ...components },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>Single-line item</bal-list-item-title>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>Two-line item</bal-list-item-title>
      <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
    </bal-list-item-content>
  </bal-list-item>
</bal-list>`,
})
Basic.args = {
  border: true,
}

export const WithIcons = args => ({
  components: { ...components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item>
  <bal-list-item-icon>
    <bal-icon name="account"></bal-icon>
  </bal-list-item-icon>
  <bal-list-item-content>
    <bal-list-item-title>Tony Stark</bal-list-item-title>
    <bal-list-item-subtitle>Stark Industries</bal-list-item-subtitle>
  </bal-list-item-content>
</bal-list-item>
<bal-list-item>
  <bal-list-item-icon>
    <bal-icon name="check"></bal-icon>
  </bal-list-item-icon>
  <bal-list-item-content>
    <bal-list-item-title class="has-text-black">Avenger</bal-list-item-title>
  </bal-list-item-content>
</bal-list-item>
<bal-list-item>
  <bal-list-item-icon>
    <bal-icon name="document"></bal-icon>
  </bal-list-item-icon>
  <bal-list-item-content>
    <bal-list-item-title>Document.pdf</bal-list-item-title>
    <bal-list-item-subtitle>20.03.1998</bal-list-item-subtitle>
  </bal-list-item-content>
  <bal-list-item-icon right>
    <bal-icon name="download"></bal-icon>
  </bal-list-item-icon>
</bal-list-item>
</bal-list>`,
})
WithIcons.args = {
  border: true,
}

export const LinkList = args => ({
  components: { ...components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item href="https://google.com" target="_blank">
  <bal-list-item-content>
    <bal-list-item-title>Link A</bal-list-item-title>
  </bal-list-item-content>
  <bal-list-item-icon right>
    <bal-icon name="nav-go-right" size="xsmall"></bal-icon>
  </bal-list-item-icon>
</bal-list-item>
<bal-list-item disabled>
  <bal-list-item-content>
    <bal-list-item-title>Disabled Link B</bal-list-item-title>
  </bal-list-item-content>
  <bal-list-item-icon right>
    <bal-icon name="nav-go-right" size="xsmall"></bal-icon>
  </bal-list-item-icon>
</bal-list-item>
</bal-list>`,
})
LinkList.args = {
  border: true,
}
