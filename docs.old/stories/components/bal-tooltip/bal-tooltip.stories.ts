import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalTooltip & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Tooltip',
  args: {
    label: 'Tooltip Label',
    reference: 'my-tooltip',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-tooltip' }),
  },
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button id="my-tooltip">Hover over me</bal-button>
  <bal-tooltip ${props(args)}>Tooltip content</bal-tooltip>
</div>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
