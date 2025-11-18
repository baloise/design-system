import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalPagination

const meta: Meta<Args> = {
  title: 'Components/Navigation/Pagination',
  args: {
    pageRange: 3,
    totalPages: 20,
    value: 2,
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-pagination' }),
  },
  ...withRender(({ ...args }) => `<bal-pagination ${props(args)}></bal-pagination>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const SmallPagination = Story({
  args: {
    interface: 'small',
    totalPages: 20,
  },
})

export const SmallPaginationWithDots = Story({
  args: {
    interface: 'small',
    totalPages: 3,
  },
})
