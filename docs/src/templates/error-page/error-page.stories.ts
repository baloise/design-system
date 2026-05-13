import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'
import { BrandIconError404Red } from '@baloise/ds-assets'

type Args = JSX.DsBadge & { slot: string }

const tag = 'ds-badge'

const meta: Meta<Args> = {
  title: 'Templates/ErrorPage',
  tags: ['!dev'],
  args: {
    slot: '42',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ slot, ...args }) => `<div class="container bg-red-light p-large radius flex gap-xl">
    <div class="flex-1">
      <h1 class="title is-2xl">This page could not be found.</h1>
      <p class="subtitle is-2xl">A reasons for this could be a misspelled URL.</p>
      <p class="mt-lg">We kindly ask you to review this once again. It is also possible that we have moved, archived, or renamed the relevant page. Perhaps you can find the content you're looking for on our homepage. Or use the search on our portal to locate the desired page.</p>
      <div class="buttons mt-lg">
        <button class="button">Home Page</button>
        <button class="button is-secondary">Search</button>
      </div>
    </div>
    <div class="flex justify-content-center align-items-center">
      <ds-icon svg='${BrandIconError404Red}' size="2xl" color="auto"></ds-icon>
    </div>
  </div>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'
