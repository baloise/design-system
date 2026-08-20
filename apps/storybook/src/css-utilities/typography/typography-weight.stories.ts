import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Typography/Font Weight',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Bold = Story({
  ...withRender(
    () => `<h1 class="font-weight-bold title">Bold - Title</h1>
<p class="font-weight-bold">Bold - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>`,
  ),
})
export const Regular = Story({
  ...withRender(() => `<p>Regular - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>`),
})
export const Light = Story({
  ...withRender(() => `<h1 class="text-weight-light title">Light - Title</h1>`),
})
