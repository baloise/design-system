import docs from './bal-steps.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalSteps, BalStepItem } from '../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  component: BalSteps,
  subcomponents: { BalStepItem },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-steps v-bind="args" v-model="args.value">
  <bal-step-item value="step-a" label="Done" done>Content of Step A</bal-step-item>
  <bal-step-item value="step-b" label="Failed" failed>Content of Step B</bal-step-item>
  <bal-step-item value="step-c" label="Active">Content of Step C</bal-step-item>
  <bal-step-item value="step-d" label="Default">Content of Step D</bal-step-item>
  <bal-step-item value="step-e" label="Disabled" disabled>Content of Step E</bal-step-item>
  <bal-step-item value="step-f" label="Hidden" hidden>Content of Step F</bal-step-item>
</bal-steps>`,
})
Basic.args = {
  value: 'tab-c',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
}
