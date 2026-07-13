import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Typography/Text Transform',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Examples = Story({
  ...withRender(
    () => `<p class="capitalize">capitalized - Lorem ipsum dolor sit amet</p>
<p class="lowercase">lowercase -Lorem ipsum dolor sit amet</p>
<p class="uppercase">uppercase - Lorem ipsum dolor sit amet</p>`,
  ),
})
