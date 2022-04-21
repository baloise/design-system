import docs from './bal-file-upload.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalFileUpload } from '../../../../../.storybook/vue/components'
import { balToastController } from '../../../../../dist/design-system-components/index.esm'

const component = BalComponentStory({
  title: 'Components/Form/FileUpload',
  component: BalFileUpload,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => {
    const onBalRejectedFile = (event: any) => {
      if (event && event.detail) {
        balToastController.create({
          message: `${event.detail.file.name} => ${event.detail.reasons.join(', ')}`,
          duration: 2000,
          color: 'danger',
        })
      }
    }

    return {
      args,
      onBalRejectedFile,
    }
  },
  template: `<bal-file-upload @balRejectedFile="onBalRejectedFile($event)" v-bind="args"></bal-file-upload>`,
})

export const Basic = Template.bind({})
Basic.args = {
  accept: 'image/png,image/jpeg',
  label: 'Choose or drop a file...',
  multiple: true,
  hasFileList: true,
  disabled: false,
  maxFiles: 3,
  maxFileSize: 1000000,
  maxBundleSize: 1000000,
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: ['subTitle', 'value'] },
}
