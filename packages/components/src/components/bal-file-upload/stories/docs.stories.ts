import docs from './readme.docs.mdx'
import { generateArgType } from '../../../stories/helpers/args'
import { BalFileUpload } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Form/FileUpload',
  component: BalFileUpload,
  argTypes: generateArgType('bal-file-upload'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalFileUpload },
  setup: () => ({ args }),
  template: `<p id="bal-file-upload-messages"></p>
  <bal-file-upload v-bind="args"></bal-file-upload>`,
})

export const Basic = Template.bind({})
Basic.args = {
  accept: 'image/png,image/jpeg',
  maxFiles: 3,
  maxFileSize: '1000000',
  maxBundleSize: '1000000',
}
