import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../../utils'

type Args = JSX.DsButtonGroup

const tag = 'ds-button-group'

const meta: Meta<Args> = {
  title: 'Components/Button/ButtonGroup',
  tags: ['!dev'],
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ ...args }) => `
<ds-button-group ${props(args)}>
  <ds-button color="primary">Primary</ds-button>
  <ds-button color="secondary">Secondary</ds-button>
</ds-button-group>`,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'
