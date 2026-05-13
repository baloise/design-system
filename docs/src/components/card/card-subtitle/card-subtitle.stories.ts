import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls } from '../../../utils'

type Args = JSX.DsCardSubtitle

const tag = 'ds-card-subtitle'

const meta: Meta<Args> = {
  title: 'Components/Card/CardSubtitle',
  tags: ['!dev'],
  argTypes: {
    ...withComponentControls({ tag }),
  },
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
