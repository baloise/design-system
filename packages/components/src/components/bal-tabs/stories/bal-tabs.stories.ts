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
  template: `<bal-tabs v-bind="args">
  <bal-tab-item value="tab-a" label="Tab A" :active="true">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
  <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
  <bal-tab-item disabled value="tab-d" label="Tab D">Content of Tab D</bal-tab-item>
</bal-tabs>`,
})

export const MainNavigation = Template.bind({})
MainNavigation.args = {
  action: true,
  expanded: false,
  clickable: true,
  actionLabel: 'Action',
  interface: 'tabs',
}
MainNavigation.parameters = { ...component.sourceCode(MainNavigation) }

export const SubNavigation = Template.bind({})
SubNavigation.args = {
  action: true,
  expanded: false,
  clickable: true,
  interface: 'tabs-sub',
}
SubNavigation.parameters = { ...component.sourceCode(SubNavigation) }

export const Steps = Template.bind({})
Steps.args = {
  action: false,
  expanded: true,
  clickable: true,
  actionLabel: '',
  interface: 'o-steps',
}
Steps.parameters = { ...component.sourceCode(Steps) }
