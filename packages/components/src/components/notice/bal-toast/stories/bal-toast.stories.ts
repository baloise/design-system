import { BalComponentStory } from '../../../../stories/utils'
import { BalToast, BalButton } from '../../../../../.storybook/vue/components'
import { balToastController } from '../../../../../dist/custom-elements'
import docs from './bal-toast.docs.mdx'

const component = BalComponentStory({
  title: 'Components/Notice/Toast',
  component: BalToast,
  args: {
    message: 'Hello World',
    duration: 2000,
    color: '',
  },
  docs,
  layout: 'fullscreen',
})

export default component.story

const Template = (args, { argTypes }) => ({
  components: { ...component.components, BalButton },
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
