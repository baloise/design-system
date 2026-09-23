import type { JSX } from '@helvetia-design/core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls } from '../../../../utils'

type Args = JSX.DsCardContent

const tag = 'ds-card-content'

const meta: Meta<Args> = {
  title: 'Components/Structure/Card/CardContent',
  tags: ['!dev'],
  argTypes: {
    ...withComponentControls({ tag }),
  },
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
