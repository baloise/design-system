import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.BalDivider & { content: string }

const tag = 'bal-divider'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Layout/Divider',
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ ...args }) =>
      `
<div class="stack ${args.layout === 'vertical' ? 'as-row' : 'as-col'}">
  <span>Before</span>
  <hr ${cssClasses(
    {
      ...css('color', (color: string) => `is-${color}`),
      ...css('borderStyle', (borderStyle: string) => `is-${borderStyle}`),
      ...css('layout', (layout: string) => `is-${layout}`),
      ...css('space', (space: string) => `has-space-${space}`),
    },
    args,
  )}/>
  <span>After</span>
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

export const Dashed = Story({
  args: {
    borderStyle: 'dashed',
  },
})

export const Vertical = Story({
  args: {
    layout: 'vertical',
  },
})
