import { generateArgType } from '../../stories/helpers/args'
import { BalToast, BalButton, BalIcon } from '../../../.storybook/vue/components'
import { balToastController } from '../../../dist/design-system-components/index.esm'
import docs from './bal-toast.docs.mdx'

export default {
  title: '01-Components/BalToast',
  component: BalToast,
  subcomponents: { BalButton, BalIcon },
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
  components: { BalToast, BalButton, BalIcon },
  props: Object.keys(argTypes),
  setup: () => ({
    args,
    openToast: () => balToastController.create(args),
  }),
  template: `<bal-button @click="openToast">Trigger a Toast</bal-button>`,
})

// const Template = (args, { argTypes }) => ({
//   components: { BalToast },
//   props: Object.keys(argTypes),
//   setup: () => ({ args }),
//   template: `<bal-toast v-bind="args">{{ args.inner }}</bal-toast>`,
// })

export const Primary = Template.bind({})
Template.args = {
  message: 'Hello World',
  color: 'warning',
}
