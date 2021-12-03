import docs from './readme.docs.mdx'
import { stencilArgType, withContent } from '../../../stories/utils'
import { BalNotification } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Notification',
  component: BalNotification,
  argTypes: {
    ...stencilArgType('bal-notification'),
    ...withContent(),
  },
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
