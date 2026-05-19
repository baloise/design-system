import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Elevation/Z-Index',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Examples = Story({
  ...withRender(
    () => `<div class="flex flex-wrap justify-content-center" style="min-height: 200px">
  <div class="z-index-tooltip relative flex align-items-center justify-content-center p-normal bg-green radius shadow" style="width: 100px; height: 100px; left:125px">tooltip</div>
  <div class="z-index-toast relative flex align-items-center justify-content-center p-normal bg-green radius shadow" style="width: 100px; height: 100px; left:100px; top:10px">toast</div>
   <div class="z-index-modal relative flex align-items-center justify-content-center p-normal bg-green radius shadow" style="width: 100px; height: 100px; left:75px; top:20px">modal</div>
</div>`,
  ),
})
