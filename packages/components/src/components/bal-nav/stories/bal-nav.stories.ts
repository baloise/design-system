import docs from './bal-nav.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalNav } from '../../../../.storybook/vue/generated/components'
import { withContent } from '../../../stories/utils'

const component = BalComponentStory({
  title: 'Components/Navigation/Nav',
  component: BalNav,
  subcomponents: {},
  docs,
  argTypes: {
    ...withContent(),
  },
})

export default component.story

export const Basic = args => ({
  components: {
    ...component.components,
  },
  setup: () => {
    return {
      args,
    }
  },
  template: `
  <div>
hello world
</div>`,
})
Basic.args = {

}
Basic.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(Basic),
}
