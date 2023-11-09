import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory, ListenerFactory } from '../../utils'

type Args = JSX.BalFileUpload & { content: string }

const listener = ListenerFactory()

const meta: Meta<Args> = {
  title: 'Components/Form/FileUpload',
  args: {
    accept: 'image/png,image/jpeg',
    multiple: true,
    hasFileList: true,
    label: 'Choose or drop a file...',
    maxBundleSize: 1000000,
    maxFileSize: 1000000,
    maxFiles: 3,
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-file-upload' }),
  },
  render: (args, context) => {
    const section: HTMLElement = document.createElement('section')

    section.innerHTML = `<bal-field>
    <bal-field-label required="true">Upload Label</bal-field-label>
    <bal-field-control>
        <bal-file-upload ${props(args)}></bal-file-upload>
    </bal-field-control>
    <bal-field-message>Upload size per file is 20Mb.</bal-field-message>
  </bal-field>`

    listener.addEventListener('balRejectedFile', context, (event: any) => {
      if (event && event.detail) {
        const toastController = (window as any).BaloiseDesignSystem.toastController
        toastController.create({
          message: `${event.detail.file.name} => ${event.detail.reasons.join(', ')}`,
          duration: 2000,
          color: 'danger',
        })
      }
    })

    return section
  },
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const NativeFileUpload = Story({
  ...withRender(
    () => `<div class="file">
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
  ),
})
