import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsPagination

const tag = 'ds-pagination'

const meta: Meta<Args> = {
  title: 'Components/Pagination/Variants',
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-pagination ${props(args)}></ds-pagination>`),
}

export default meta

/**
 * STORIES
 * ––––––––––––––––––––––––––––––––––––––––––––––––––––––
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(() => `<ds-pagination page-range="2" total-pages="20" value="2"></ds-pagination>`),
})
Basic.storyName = '🧩 Basic'

export const Alignment = Story({
  ...withRender(
    () => `
<div style="margin-bottom: 1rem;">
  <ds-pagination page-range="2" total-pages="20" value="2" align="start"></ds-pagination>
</div>
<div>
  <ds-pagination page-range="2" total-pages="20" value="2" align="end"></ds-pagination>
</div>
`,
  ),
})
Alignment.storyName = '🧩 Alignment'

export const Ranges = Story({
  ...withRender(
    () => `
<div style="margin-bottom: 1rem;">
  <ds-pagination page-range="0" total-pages="20" value="10"></ds-pagination>
</div>
<div style="margin-bottom: 1rem;">
  <ds-pagination page-range="1" total-pages="20" value="10"></ds-pagination>
</div>
<div style="margin-bottom: 1rem;">
  <ds-pagination page-range="2" total-pages="20" value="10"></ds-pagination>
</div>
<div>
  <ds-pagination page-range="3" total-pages="20" value="10"></ds-pagination>
</div>
`,
  ),
})
Ranges.storyName = '🧩 Ranges'

export const Disabled = Story({
  ...withRender(() => `<ds-pagination page-range="2" total-pages="20" value="2" disabled></ds-pagination>`),
})
Disabled.storyName = '🧩 Disabled'

export const Sizes = Story({
  ...withRender(() => `<ds-pagination page-range="2" total-pages="20" value="2" size="small"></ds-pagination>`),
})
Sizes.storyName = '🧩 Sizes'

export const Dots = Story({
  ...withRender(
    () => `
<div style="margin-bottom: 2rem;">
  <div style="margin-bottom: 0.5rem;">
    <ds-pagination page-range="2" total-pages="3" value="1" variant="dots"></ds-pagination>
  </div>
  <div style="margin-bottom: 0.5rem;">
    <ds-pagination page-range="2" total-pages="3" value="2" variant="dots"></ds-pagination>
  </div>
  <div>
    <ds-pagination page-range="2" total-pages="3" value="3" variant="dots"></ds-pagination>
  </div>
</div>
<div>
  <div style="margin-bottom: 0.5rem;">
    <ds-pagination page-range="2" total-pages="20" value="1" variant="dots"></ds-pagination>
  </div>
  <div style="margin-bottom: 0.5rem;">
    <ds-pagination page-range="2" total-pages="20" value="10" variant="dots"></ds-pagination>
  </div>
  <div>
    <ds-pagination page-range="2" total-pages="20" value="20" variant="dots"></ds-pagination>
  </div>
</div>
`,
  ),
})
Dots.storyName = '🧩 Dots'
