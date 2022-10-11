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
  <bal-tab-item value="tab-d" label="Tab D" hidden>Hidden Content of Tab D</bal-tab-item>
  <bal-tab-item value="tab-e" label="Tab E" disabled>Content of Tab E</bal-tab-item>
  <bal-tab-item value="tab-link" label="Tab link" href="https://github.com/baloise-incubator/design-system" target="_blank">Content of Tab link</bal-tab-item>
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
  controls: {
    exclude: ['expanded', 'selectOnMobile', 'iconPosition', 'fullwidth', 'vertical', 'verticalOnMobile', 'border'],
  },
}

export const Navigation = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tabs v-bind="args" v-model="args.value">
  <bal-tab-item value="tab-a" label="Tab A" icon="nav-go-down">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B" icon="nav-go-down">Content of Tab B</bal-tab-item>
  <bal-tab-item value="tab-c" label="Tab C" icon="nav-go-down">Content of Tab C</bal-tab-item>
</bal-tabs>`,
})
Navigation.args = {
  interface: 'navigation',
  value: 'tab-a',
  border: true,
  float: 'right',
  spaceless: true,
  fullwidth: true,
  expanded: false,
  vertical: false,
  selectOnMobile: false,
}
Navigation.parameters = {
  ...component.sourceCode(Navigation),
  controls: { exclude: ['clickable'] },
}

export const MetaNavigation = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tabs v-bind="args" v-model="args.value">
  <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
  <bal-tab-item value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
</bal-tabs>`,
})
MetaNavigation.args = {
  interface: 'meta',
  value: 'tab-a',
  border: false,
  inverted: true,
  spaceless: true,
  fullwidth: true,
  expanded: false,
  vertical: false,
  selectOnMobile: false,
}
MetaNavigation.parameters = {
  ...component.sourceCode(MetaNavigation),
  controls: { exclude: ['clickable'] },
  backgrounds: { default: 'blue' },
}
