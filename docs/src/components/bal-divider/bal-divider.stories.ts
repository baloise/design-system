import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, props, StoryFactory, withComponentControls, withRender } from '../../utils'

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
      ...css('dashed', (dashed: string) => (dashed === 'true' ? 'is-dashed' : '')),
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

export const WebComponentBasic = Story({
  ...withRender(
    ({ content, ...args }) => `
<div class="stack as-col">
  <span>Before</span>
  <bal-divider ${props(args)}></bal-divider>
  <span>After</span>
</div>
   `,
  ),
})

export const Dashed = Story({
  args: {
    dashed: true,
  },
})

export const Vertical = Story({
  args: {
    layout: 'vertical',
  },
})
