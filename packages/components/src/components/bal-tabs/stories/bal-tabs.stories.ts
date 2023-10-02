import docs from './bal-tabs.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalTabs, BalTabItem } from '../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Navigation/Tabs',
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
  <bal-tab-item value="tab-d" label="Tab D" hidden>Hidden Content of Tab D</bal-tab-item>
  <bal-tab-item value="tab-e" label="Tab E" disabled>Content of Tab E</bal-tab-item>
  <bal-tab-item value="tab-link" label="Tab link" href="https://github.com/baloise/design-system" target="_blank">Content of Tab link</bal-tab-item>
</bal-tabs>`,
})
Basic.args = {
  interface: 'tabs',
  value: 'tab-b',
  border: true,
  fullwidth: true,
  expanded: false,
  vertical: false,
  selectOnMobile: false,
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: ['clickable'] },
}

export const Vertical = Basic.bind({})
Vertical.args = {
  interface: 'tabs',
  value: 'tab-b',
  border: true,
  fullwidth: true,
  expanded: false,
  vertical: true,
  selectOnMobile: false,
}
Vertical.parameters = {
  ...component.sourceCode(Vertical),
  controls: { exclude: ['clickable'] },
}

export const Mobile = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tabs v-bind="args" v-model="args.value">
  <bal-tab-item value="tab-a" label="Account" icon="account">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Calendar" icon="date" bubble="99+">Content of Tab B</bal-tab-item>
  <bal-tab-item value="tab-c" label="Settings" icon="settings" bubble>Content of Tab C</bal-tab-item>
  <bal-tab-item disabled value="tab-d" label="Support" icon="consultant">Content of Tab D</bal-tab-item>
</bal-tabs>`,
})
Mobile.args = {
  interface: 'tabs',
  value: 'tab-b',
  border: true,
  fullwidth: true,
  expanded: true,
  vertical: false,
  verticalOnMobile: false,
}
Mobile.parameters = {
  viewport: {
    defaultViewport: 'small',
  },
  layout: 'fullscreen',
  ...component.sourceCode(Mobile),
  controls: { exclude: ['clickable'] },
}
