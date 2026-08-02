import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Typography/Text Align',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Examples = Story({
  ...withRender(
    () => `<p class="text-align-left">left</p>
<p class="text-align-center">centered</p>
<p class="text-align-right">right</p>`,
  ),
})
export const Responsive = Story({
  ...withRender(
    () => `<p class="mobile:text-align-right">mobile right</p>
<p class="tablet:text-align-right">tablet right</p>
<p class="desktop:text-align-right">desktop right</p>`,
  ),
})
