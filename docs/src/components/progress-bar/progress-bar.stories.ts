import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsProgressBar

const tag = 'ds-progress-bar'

const meta: Meta<Args> = {
  title: 'Components/Progress Bar/Variants',
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ value = 50, background, color }) =>
      `<ds-progress-bar value="${value}"${background ? ` background="${background}"` : ''}${color ? ` color="${color}"` : ''}></ds-progress-bar>`,
  ),
}

export default meta

/**
 * STORIES
 * -------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    () => `<ds-progress-bar id="progress" value="50"></ds-progress-bar>

<ds-button id="button" class="mt-normal">Toggle</ds-button>

<script>
  const progress = document.getElementById('progress')
  const button = document.getElementById('button')
  button.addEventListener('click', () => {
    const newValue = Math.random() * (101 - 1) + 1 - 1
    progress.value = newValue
  })
</script>`,
  ),
})
Basic.storyName = '🧩 Basic'

export const DarkVariants = Story({
  ...withRender(
    () => `<div class="mb-medium flex gap-small flex-direction-column">
  <ds-progress-bar value="50"></ds-progress-bar>
  <ds-progress-bar value="50" color="purple"></ds-progress-bar>
  <ds-progress-bar value="50" color="yellow"></ds-progress-bar>
  <ds-progress-bar value="50" color="red"></ds-progress-bar>
  <ds-progress-bar value="50" color="green"></ds-progress-bar>
</div>`,
  ),
})
DarkVariants.storyName = '🧩 Dark Variants'

export const LightVariants = Story({
  ...withRender(
    () => `<div class="mb-medium flex gap-small flex-direction-column">
  <ds-progress-bar value="50" background="light"></ds-progress-bar>
  <ds-progress-bar value="50" background="light" color="purple"></ds-progress-bar>
  <ds-progress-bar value="50" background="light" color="yellow"></ds-progress-bar>
  <ds-progress-bar value="50" background="light" color="red"></ds-progress-bar>
  <ds-progress-bar value="50" background="light" color="green"></ds-progress-bar>
</div>`,
  ),
})
LightVariants.storyName = '🧩 Light Variants'
