import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls } from '../../../utils'

type Args = JSX.DsItem

const meta: Meta<Args> = {
  title: 'Components/List/Item',
  tags: ['!dev'],
  argTypes: {
    ...withComponentControls({ tag: 'ds-item' }),
  },
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'
