import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsLogo & { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Logo/Variants',
  args: {
    slot: '',
    animated: true,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-logo' }),
  },
  ...withRender(({ slot, ...args }) => `<ds-logo ${props(args)}>${slot}</ds-logo>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'
