import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Interactions/User Select',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Classes = Story({
  ...withRender(
    () => `<div class="flex flex-wrap align-items-center justify-content-center">
  <div class="select-none bg-red radius p-small m-small flex align-items-center justify-content-center">select-none</div>
  <div class="select-text bg-red radius p-small m-small flex align-items-center justify-content-center">select-text</div>
  <div class="select-all bg-red radius p-small m-small flex align-items-center justify-content-center">select-all</div>
  <div class="select-auto bg-red radius p-small m-small flex align-items-center justify-content-center">select-auto</div>
</div>`,
  ),
})
