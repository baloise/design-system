import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { lorem1, props, StoryFactory, withComponentControls, withRender } from '../../../utils'

type Args = JSX.DsCheckboxGroup

const meta: Meta<Args> = {
  title: 'Components/Checkbox/Group',
  tags: ['!dev'],
  args: {
    label: 'Select items',
    description: lorem1,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-checkbox-group' }),
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-checkbox-group ${props(args)}>
    <ds-checkbox>Item 1</ds-checkbox>
    <ds-checkbox>Item 2</ds-checkbox>
  </ds-checkbox-group>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'
