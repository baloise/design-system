import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.BalClose & { content: string }

const tag = 'ds-close'

const meta: Meta<Args> = {
  title: 'Components/Navigation/Close',
  args: {},
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-close ${props(args)}></ds-close>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'
