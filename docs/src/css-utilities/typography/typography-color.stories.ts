import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Typography/Text Colors',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Colors = Story({
  ...withRender(
    () => `<p>Default - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="text-light-blue">Light-Blue / Hover - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="text-primary-dark">Blue-Dark / Active - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="text-grey">Grey / Disabled - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="text-primary-light">Hint / Help - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="text-success">Success / Valid - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="text-warning">Warning - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="text-danger">Danger / Valid - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

<hr />

<ds-text color="primary-light">Text with the color primary-light</ds-text>
<ds-text color="danger">Text with the color danger</ds-text>`,
  ),
})
export const PseudoStates = Story({
  ...withRender(
    () => `<div class="bg-green-2 text-grey hover:text-primary active:text-danger cursor-pointer">
  <p class="p-normal">Hover and click me!</p>
</div>`,
  ),
})
