import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalFileUpload & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/FileUpload',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-file-upload' }),
  },
  ...withRender(({ content, ...args }) => `<bal-file-upload ${props(args)}>${content}</bal-file-upload>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    () => `<bal-field>
  <bal-field-label required>Upload Label</bal-field-label>
  <bal-field-control>
      <bal-file-upload accept="image/png,image/jpeg" has-file-list label="Choose or drop a file..." max-bundle-size="1000000" max-file-size="1000000" max-files="3" multiple></bal-file-upload>
  </bal-field-control>
  <bal-field-message>Upload size per file is 20Mb.</bal-field-message>
</bal-field>`,
  ),
})

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
