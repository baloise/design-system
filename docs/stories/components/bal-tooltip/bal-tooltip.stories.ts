import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalTooltip & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Tooltip',
  args: {
    ...withDefaultContent(),
    label: 'Tooltip Label',
    reference: 'my-tooltip',
  },
  argTypes: {
    ...withContent(),
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
