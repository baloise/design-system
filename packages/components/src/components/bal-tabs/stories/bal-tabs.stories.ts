import docs from './bal-tabs.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalTabs, BalTabItem } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalTabs,
  subcomponents: { BalTabItem },
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tabs v-bind="args" v-model="args.value">
  <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
  <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
  <bal-tab-item disabled value="tab-d" label="Tab D">Content of Tab D</bal-tab-item>
</bal-tabs>`,
})

export const MainNavigation = Template.bind({})
MainNavigation.args = {
  value: 'tab-b',
  action: true,
  expanded: false,
  actionLabel: 'Action',
  interface: 'tabs',
}
MainNavigation.parameters = { ...component.sourceCode(MainNavigation), controls: { exclude: ['clickable'] } }

export const SubNavigation = Template.bind({})
SubNavigation.args = {
  value: 'tab-b',
  expanded: false,
  interface: 'tabs-sub',
}
SubNavigation.parameters = {
  ...component.sourceCode(SubNavigation),
  controls: { exclude: ['clickable', 'action', 'actionLabel'] },
}

export const Steps = Template.bind({})
Steps.args = {
  value: 'tab-b',
  clickable: true,
  interface: 'o-steps',
}
Steps.parameters = { ...component.sourceCode(Steps), controls: { exclude: ['expanded', 'action', 'actionLabel'] } }
