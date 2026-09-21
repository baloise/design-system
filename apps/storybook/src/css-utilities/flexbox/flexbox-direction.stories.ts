import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Flexbox/Flex Direction',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Row = Story({
  ...withRender(
    () => `<div class="flex flex-direction-row gap-base">
    <div class="bg-red text-align-center radius p-base">1</div>
    <div class="bg-red text-align-center radius p-base">2</div>
    <div class="bg-red text-align-center radius p-base">3</div>
</div>`,
  ),
})
export const RowReverse = Story({
  ...withRender(
    () => `<div class="flex flex-direction-row-reverse gap-base">
    <div class="bg-red text-align-center radius p-base">1</div>
    <div class="bg-red text-align-center radius p-base">2</div>
    <div class="bg-red text-align-center radius p-base">3</div>
</div>`,
  ),
})
export const Column = Story({
  ...withRender(
    () => `<div class="flex flex-direction-column gap-base">
    <div class="bg-red text-align-center radius p-base">1</div>
    <div class="bg-red text-align-center radius p-base">2</div>
    <div class="bg-red text-align-center radius p-base">3</div>
</div>`,
  ),
})
export const ColumnReverse = Story({
  ...withRender(
    () => `<div class="flex flex-direction-column-reverse gap-base">
    <div class="bg-red text-align-center radius p-base">1</div>
    <div class="bg-red text-align-center radius p-base">2</div>
    <div class="bg-red text-align-center radius p-base">3</div>
</div>`,
  ),
})
