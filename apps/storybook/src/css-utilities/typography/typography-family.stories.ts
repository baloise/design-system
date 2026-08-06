import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Typography/Font Family',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const TextFontFamily = Story({
  ...withRender(
    () => `<h1 class="title font-family-text">Text - Lorem ipsum dolor sit.</h1>
<p>Text - Lorem ipsum dolor sit.</p>`,
  ),
})
export const TitleFontFamily = Story({
  ...withRender(
    () => `<h1 class="title">Title - Lorem ipsum dolor sit.</h1>
<h1 class="subtitle">Subtitle - Lorem ipsum dolor sit.</h1>
<p class="font-family-heading">Title - Lorem ipsum dolor sit.</p>`,
  ),
})
