import docs from './bal-shape.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalShape } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Shape',
  component: BalShape,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-shape v-bind="args"></bal-shape>`,
})
Basic.args = {
  variation: '1',
  color: 'green',
  rotation: 0,
}
Basic.parameters = { ...component.sourceCode(Basic) }
