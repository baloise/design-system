import docs from './bal-form-grid.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalFormGrid, BalFormCol, BalInput } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Form Grid',
  component: BalFormGrid,
  subcomponents: { BalFormCol },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components, BalInput },
  setup: () => ({ args }),
  template: `<bal-form-grid v-bind="args">
    <bal-form-col><bal-input placeholder="fullwidth" /></bal-form-col>
    <bal-form-col size="half"><bal-input placeholder="half" /></bal-form-col>
    <bal-form-col size="half"><bal-input placeholder="half" /></bal-form-col>
    <bal-form-col size="one-third"><bal-input placeholder="one-third" /></bal-form-col>
    <bal-form-col size="two-thirds"><bal-input placeholder="two-thirds" /></bal-form-col>
    <bal-form-col size="one-third"><bal-input placeholder="one-third" /></bal-form-col>
    <bal-form-col size="one-third"><bal-input placeholder="one-third" /></bal-form-col>
    <bal-form-col size="one-third"><bal-input placeholder="one-third" /></bal-form-col>
    <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
    <bal-form-col size="three-quarters"><bal-input placeholder="three-quarters" /></bal-form-col>
    <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
    <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
    <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
    <bal-form-col size="one-quarter"><bal-input placeholder="one-quarter" /></bal-form-col>
  </bal-form-grid>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
