import { BalComponentStory } from '../../../../stories/utils'
import { BalSnackbar, BalButton } from '../../../../../.storybook/vue/components'
import { balSnackbarController } from '../../../../../dist/custom-elements'
import docs from './bal-snackbar.docs.mdx'

const component = BalComponentStory({
  title: 'Components/Notice/Snackbar',
  component: BalSnackbar,
  args: {
    message: 'Hello World',
    duration: 2000,
    color: '',
  },
  layout: 'fullscreen',
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components, BalButton },
  setup: () => ({
    args,
    open: () => balSnackbarController.create(args),
  }),
  template: `<bal-button @click="open" class="m-4">Trigger a Snackbar</bal-button>`,
})

export const Basic = Template.bind({})
Basic.args = {
  subject: 'Subject',
  message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  action: 'More',
  color: 'info',
  icon: 'info-circle',
}
