import docs from './readme.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalFileUpload } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/FileUpload',
  component: BalFileUpload,
  docs,
})

export default component.story

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
Basic.parameters = { ...component.sourceCode(Basic) }
