import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls } from '../../../utils'

type Args = JSX.DsCardTitle

const tag = 'ds-card-title'

const meta: Meta<Args> = {
  title: 'Components/Card/CardTitle',
  tags: ['!dev'],
  argTypes: {
    ...withComponentControls({ tag }),
  },
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
