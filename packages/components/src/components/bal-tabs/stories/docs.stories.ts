import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../stories/utils'
import { BalTabs, BalTabItem } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Tabs',
  component: BalTabs,
  subcomponent: { BalTabItem },
  argTypes: {
    ...stencilArgType('bal-tabs'),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalTabs, BalTabItem },
  setup: () => ({ args }),
  template: `<bal-tabs v-bind="args">
  <bal-tab-item value="tab-a" label="Tab A" active="true">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
  <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
  <bal-tab-item disabled value="tab-d" label="Tab D">Content of Tab D</bal-tab-item>
</bal-tabs>`,
})

export const Basic = Template.bind({})
Basic.args = {
  action: true,
  expanded: false,
  clickable: true,
  rounded: false,
  actionLabel: 'Action',
  interface: 'tabs',
}

export const Round = Template.bind({})
Round.args = {
  action: false,
  expanded: true,
  clickable: true,
  rounded: true,
  actionLabel: '',
  interface: 'tabs',
}

export const Steps = Template.bind({})
Steps.args = {
  action: false,
  expanded: true,
  clickable: true,
  rounded: true,
  actionLabel: '',
  interface: 'o-steps',
}
