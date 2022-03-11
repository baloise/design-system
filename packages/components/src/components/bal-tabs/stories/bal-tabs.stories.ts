import docs from './bal-tabs.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalTabs, BalTabItem } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalTabs,
  subcomponents: { BalTabItem },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tabs v-bind="args" v-model="args.value">
  <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
  <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
  <bal-tab-item disabled value="tab-d" label="Tab D">Content of Tab D</bal-tab-item>
</bal-tabs>`,
})
Basic.args = {
  value: 'tab-b',
  action: true,
  expanded: false,
  actionLabel: 'Action',
  interface: 'tabs',
}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: ['clickable'] } }

export const SubNavigation = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tabs v-bind="args" v-model="args.value">
  <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
  <bal-tab-item value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
  <bal-tab-item disabled value="tab-d" label="Tab D">Content of Tab D</bal-tab-item>
</bal-tabs>`,
})
SubNavigation.args = {
  value: 'tab-b',
  expanded: false,
  interface: 'tabs-sub',
}
SubNavigation.parameters = {
  ...component.sourceCode(SubNavigation),
  controls: { exclude: ['clickable', 'action', 'actionLabel'] },
}

export const Steps = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tabs v-bind="args" v-model="args.value">
  <bal-tab-item done value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  <bal-tab-item failed value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
  <bal-tab-item value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
  <bal-tab-item value="tab-d" label="Tab D">Content of Tab D</bal-tab-item>
  <bal-tab-item disabled value="tab-e" label="Tab E">Content of Tab E</bal-tab-item>
</bal-tabs>`,
})
Steps.args = {
  value: 'tab-c',
  clickable: true,
  interface: 'o-steps',
}
Steps.parameters = { ...component.sourceCode(Steps), controls: { exclude: ['expanded', 'action', 'actionLabel'] } }
