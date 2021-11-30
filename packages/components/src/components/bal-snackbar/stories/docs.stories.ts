import { generateArgType } from '../../../stories/helpers/args'
import { BalSnackbar } from '../../../../.storybook/vue/components'
import { balSnackbarController } from '../../../../dist/design-system-components/index.esm'
import docs from './readme.docs.mdx'

export default {
  title: 'Components/Snackbar',
  component: BalSnackbar,
  argTypes: generateArgType('bal-snackbar'),
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
  components: { BalSnackbar },
  props: Object.keys(argTypes),
  setup: () => ({
    args,
    open: () => balSnackbarController.create(args),
  }),
  template: `<bal-button @click="open">Trigger a Snackbar</bal-button>`,
})

export const Basic = Template.bind({})
Basic.args = {
  subject: 'Subject',
  message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  action: 'More',
  color: 'info',
  icon: 'info-circle',
}
