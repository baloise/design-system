import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsFileUpload & { slot: string }

const tag = 'ds-file-upload'

const meta: Meta<Args> = {
  title: 'Components/FileUpload/Variants',
  args: {
    label: 'Choose or drop a file...',
    description: 'All File Types',
    slot: '',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ slot, ...args }) => `<ds-file-upload ${props(args)}>${slot}</ds-file-upload>`),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({})
BasicHtml.storyName = '🌍 Basic'

export const Disabled = Story({
  args: {
    disabled: true,
    description: 'This field is disabled',
  },
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  args: {
    disabled: true,
    description: 'This field is disabled',
  },
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  args: {
    invalid: true,
    invalidText: 'File type not allowed',
    description: 'This field has an error',
  },
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  args: {
    invalid: true,
    invalidText: 'File type not allowed',
    description: 'This field has an error',
  },
})
InvalidHtml.storyName = '🌍 Invalid'

export const Loading = Story({
  args: {
    loading: true,
    label: 'Uploading...',
  },
})
Loading.storyName = '🧩 Loading'

export const LoadingHtml = Story({
  args: {
    loading: true,
    label: 'Uploading...',
  },
})
LoadingHtml.storyName = '🌍 Loading'
