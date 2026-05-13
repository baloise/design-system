import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsDivider

const tag = 'ds-divider'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Divider/Variants',
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

export const Basic = Story({
  ...withRender(
    ({ ...args }) => `
<div class="stack as-col">
  <span>Before</span>
  <ds-divider ${props(args)}></ds-divider>
  <span>After</span>
</div>
   `,
  ),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({})
BasicHtml.storyName = '🌍 Basic'

export const Dashed = Story({
  ...withRender(
    () => `
<div class="stack as-col">
  <span>Before</span>
  <ds-divider dashed></ds-divider>
  <span>After</span>
</div>`,
  ),
})
Dashed.storyName = '🧩 Dashed'

export const DashedHtml = Story({
  args: {
    dashed: true,
  },
})
DashedHtml.storyName = '🌍 Dashed'

export const Vertical = Story({
  ...withRender(
    () => `
<div class="stack as-row">
  <span>Before</span>
  <ds-divider layout="vertical"></ds-divider>
  <span>After</span>
</div>`,
  ),
})
Vertical.storyName = '🧩 Vertical'

export const VerticalHtml = Story({
  args: {
    layout: 'vertical',
  },
})
VerticalHtml.storyName = '🌍 Vertical'
