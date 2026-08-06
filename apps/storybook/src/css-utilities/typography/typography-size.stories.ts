import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Typography/Font Size',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Headings = Story({
  ...withRender(
    () => `<h1 class="title">Heading 1</h1>
<h2 class="title text-xx-large">Heading 2</h2>
<h3 class="title text-x-large">Heading 3</h3>
<h4 class="title text-large">Heading 4</h4>
<h5 class="title text-normal">Heading 5</h5>`,
  ),
})
export const Texts = Story({
  ...withRender(
    () => `<p class="text-medium">Medium Paragraph - Lorem ipsum dolor sit.</p>
<p>Paragraph - Lorem ipsum dolor sit.</p>
<p class="text-small">Small Paragraph - Lorem ipsum dolor sit.</p>`,
  ),
})
export const Display = Story({
  ...withRender(
    () => `<h1 class="title text-5xl">Display 1</h1>
<h1 class="subtitle text-xxxx-large">Display 2</h1>`,
  ),
})
