
import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'
import { tableHtml } from './bal-table.templates'

type Args = JSX.BalTable & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Table',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-table' }),
  },
  ...withRender(({ content, ...args }) => `<bal-table ${props(args)}>${content}</bal-table>`),
}

const table = tableHtml

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(() => table),
})

export const Secondary = Story({
  args: {
    // place props here
  },
})
