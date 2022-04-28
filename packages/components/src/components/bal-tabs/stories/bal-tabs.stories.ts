import docs from './bal-tabs.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalTabs, BalTabItem } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalTabs,
  status: 'beta',
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
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: ['clickable'] },
}

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
  <bal-tab-item done value="tab-a" label="Finished Step"><p class="my-5">Content of Tab A</p></bal-tab-item>
  <bal-tab-item failed value="tab-b" label="Failed Step"><p class="my-5">Content of Tab B</p></bal-tab-item>
  <bal-tab-item value="tab-c" label="Active Step"><p class="my-5">Content of Tab C</p></bal-tab-item>
  <bal-tab-item value="tab-d" label="Tab D"><p class="my-5">Content of Tab D</p></bal-tab-item>
  <bal-tab-item disabled value="tab-e" label="Disabled Step"><p class="my-5">Content of Tab E</p></bal-tab-item>
</bal-tabs>`,
})

Steps.args = {
  value: 'tab-c',
  clickable: true,
  interface: 'o-steps',
}
Steps.parameters = {
  ...component.sourceCode(Steps),
  controls: { exclude: ['expanded', 'action', 'actionLabel', 'vertical', 'verticalOnMobile', 'border'] },
}
