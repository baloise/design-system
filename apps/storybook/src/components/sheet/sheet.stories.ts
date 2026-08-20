import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsSheet & { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Sheet/Variants',
  args: {
    slot: `<ds-heading level="h4" space="bottom">BaloiseCombi</ds-heading>
<p class="text-normal mb-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<ds-button-group direction="auto" align="right" space="top">
  <ds-button>Main Action</ds-button>
  <ds-button color="secondary">Secondary Action</ds-button>
</ds-button-group>`,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-sheet' }),
  },
  ...withRender(({ slot, ...args }) => `<ds-sheet ${props(args)}>${slot}</ds-sheet>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    ({ slot, ...args }) => `<div style="display:flex;align-items:center;justify-content:center;margin:15px 0 0;">
  <ds-sheet style="position:relative" ${props(args)}>${slot}</ds-sheet>
</div>`,
  ),
})
Basic.storyName = '🧩 Basic'
