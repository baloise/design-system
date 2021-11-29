import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import { BalNotification } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Notification',
  component: BalNotification,
  argTypes: withContent(generateArgType('bal-notification')),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

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
