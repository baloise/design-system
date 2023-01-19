import docs from './bal-file-upload.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalFileUpload } from '../../../../../.storybook/vue/generated/components'
import { balToastController } from '../../../notice/bal-toast/bal-toast.controller'

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
  template: `<bal-field>
  <bal-field-label required>Upload Label</bal-field-label>
  <bal-field-control>
    <bal-file-upload @balRejectedFile="onBalRejectedFile($event)" v-bind="args"></bal-file-upload>
  </bal-field-control>
  <bal-field-message>Upload size per file is 20Mb.</bal-field-message>
  </bal-field>`,
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

export const NativeFileUpload = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
  <div class="file">
  <label class="file-label">
      <input class="file-input" type="file" name="resume" />
      <span class="file-cta">
          <span class="file-label"> Choose a file… </span>
      </span>
  </label>
</div>
<div class="file is-disabled mt-normal">
  <label class="file-label">
      <input class="file-input" disabled type="file" name="resume" />
      <span class="file-cta">
          <span class="file-label"> Choose a file… </span>
      </span>
  </label>
</div>
<div class="file is-success mt-normal">
  <label class="file-label">
      <input class="file-input" type="file" name="resume" />
      <span class="file-cta">
          <span class="file-label"> Choose a file… </span>
      </span>
  </label>
</div>
<div class="file is-danger mt-normal">
  <label class="file-label">
      <input class="file-input" type="file" name="resume" />
      <span class="file-cta">
          <span class="file-label"> Choose a file… </span>
      </span>
  </label>
</div>`,
})
NativeFileUpload.args = {}
NativeFileUpload.parameters = {
  ...component.sourceCode(NativeFileUpload),
  controls: { exclude: ['subTitle', 'value'] },
}
