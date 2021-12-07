import docs from './readme.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalNotification } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalNotification,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { BalNotification },
  setup: () => ({ args }),
  template: `<bal-notification v-bind="args">
  <span v-html="args.content"></span>
</bal-notification>`,
})
Basic.args = {
  color: 'primary',
  content: '<strong>Strong Title </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}
Basic.parameters = { ...component.sourceCode(Basic) }
