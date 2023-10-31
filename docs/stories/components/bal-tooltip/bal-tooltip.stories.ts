import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalTooltip & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Tooltip',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-tooltip' }),
  },
  ...withRender(({ content, ...args }) => `<bal-tooltip ${props(args)}>${content}</bal-tooltip>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    () => `<div>
  <bal-button id="my-tooltip">Hover over me</bal-button>
  <bal-tooltip label="tooltip Label" reference="my-tooltip">Tooltip content</bal-tooltip>
</div>`,
  ),
})
