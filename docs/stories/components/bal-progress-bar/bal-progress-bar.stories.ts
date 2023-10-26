import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalProgressBar

const meta: Meta<Args> = {
  title: 'Components/Feedback/ProgressBar',
  args: {
    background: 'grey',
    value: 50,
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-progress-bar' }),
  },
  ...withRender(({ ...args }) => `<bal-progress-bar ${props(args)}></bal-progress-bar>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
