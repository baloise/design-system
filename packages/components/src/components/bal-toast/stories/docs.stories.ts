import { generateArgType } from '../../../stories/helpers/args'
import { BalToast } from '../../../../.storybook/vue/components'
import { balToastController } from '../../../../dist/design-system-components/index.esm'
import docs from './readme.docs.mdx'

export default {
  title: 'Components/Toast',
  component: BalToast,
  argTypes: generateArgType('bal-toast'),
  args: {
    message: 'Hello World',
    duration: 2000,
    color: '',
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = (args, { argTypes }) => ({
  components: { BalToast },
  props: Object.keys(argTypes),
  setup: () => ({
    args,
    openToast: () => balToastController.create(args),
  }),
  template: `<bal-button @click="openToast">Trigger a Toast</bal-button>`,
})

export const Basic = Template.bind({})
Basic.args = {
  message: 'Hello World',
  color: 'warning',
}
