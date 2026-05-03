import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { lorem1, props, StoryFactory, withComponentControls, withRender } from '../../../utils'

type Args = JSX.DsSnackbar & { slot: string; slotAction: string }

const tag = 'ds-snackbar'

const meta: Meta<Args> = {
  title: 'Components/Snackbar/Variants',
  args: {
    slot: lorem1,
    slotAction: 'Okay',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ slot, slotAction, ...args }) => `<ds-snackbar ${props(args)}>${slot}</ds-snackbar>`),
}

export default meta

/**
 * STORIES
 * ––––––––––––––––––––––––––––––––––––––––––––––––––––––
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const WithAction = Story({
  args: {
    heading: 'Heading',
    closable: true,
  },
  ...withRender(
    ({ slot, slotAction, ...args }) => `<ds-snackbar ${props(args)}>
    <b>Heading + Closable + Action</b> ${slot}
    <ds-button slot="action">${slotAction}</ds-button>
  </ds-snackbar>`,
  ),
})
WithAction.storyName = '🧩 WithAction'

import { BrandIconCarCrashWithAnimalGreen } from '@baloise/ds-assets/dist'
export const WithBrandIcon = Story({
  args: {
    heading: 'Heading',
    closable: true,
  },
  ...withRender(
    ({ slot, slotAction, ...args }) => `<ds-snackbar svg='${BrandIconCarCrashWithAnimalGreen}'  ${props(args)}>
  ${slot}
</ds-snackbar>`,
  ),
})
WithBrandIcon.storyName = '🧩 WithBrandIcon'

export const Colors = Story({
  ...withRender(
    ({ slot, slotAction, ...args }) => `<div class="flex gap-small flex-direction-column">
  <ds-snackbar heading="Default"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="info" heading="Information"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="success" heading="Success"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="warning" heading="Warning"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="danger" heading="Danger"> Your changes have been saved. </ds-snackbar>
</div>`,
  ),
})
Colors.storyName = '🧩 Colors'
