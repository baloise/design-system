import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { lorem1, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsSnackbar & { slot: string; slotAction: string }

const tag = 'ds-snackbar'

const meta: Meta<Args> = {
  title: 'Components/Snackbar/Variants',
  args: {
    heading: 'Heading',
    slot: lorem1,
    slotAction: 'Okay',
    closable: true,
    color: 'info',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ slot, slotAction, ...args }) => `<ds-snackbar ${props(args)}>
    ${slot}
    <ds-button slot="action">${slotAction}</ds-button>
  </ds-snackbar>`,
  ),
}

export default meta

/**
 * STORIES
 * ––––––––––––––––––––––––––––––––––––––––––––––––––––––
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

import { BrandIconCarCrashWithAnimalGreen } from '@baloise/ds-assets'
export const WithBrandIcon = Story({
  args: {
    color: 'base',
    closable: true,
  },
  ...withRender(
    ({ slot, slotAction, ...args }) => `<ds-snackbar svg='${BrandIconCarCrashWithAnimalGreen}' ${props(args)}>
  ${slot}
  <ds-button slot="action">${slotAction}</ds-button>
</ds-snackbar>`,
  ),
})
WithBrandIcon.storyName = '🧩 WithBrandIcon'

export const Colors = Story({
  ...withRender(
    () => `<div class="flex gap-sm flex-direction-column">
  <ds-snackbar heading="Default"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="info" heading="Information"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="success" heading="Success"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="warning" heading="Warning"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="danger" heading="Danger"> Your changes have been saved. </ds-snackbar>
</div>`,
  ),
})
Colors.storyName = '🧩 Colors'

export const Controller = Story({
  ...withRender(
    () => `
<div class="flex gap-sm flex-direction-row" style="align-items: flex-start">
  <ds-button color="info" id="snackbar-trigger-info">Show info</ds-button>
  <ds-button color="success" id="snackbar-trigger-success">Show success</ds-button>
  <ds-button color="warning" id="snackbar-trigger-warning">Show warning</ds-button>
  <ds-button color="danger" id="snackbar-trigger-danger">Show danger</ds-button>
</div>
<script>
  (() => {
    const controller = window.DesignSystem && window.DesignSystem.snackbarController
    if (!controller) return

    const presets = {
      'snackbar-trigger-info': {
        color: 'info',
        heading: 'Information',
        message: 'Your changes have been saved.',
        closable: true,
      },
      'snackbar-trigger-success': {
        color: 'success',
        heading: 'Success',
        message: 'Your request was submitted successfully.',
        action: 'Undo',
      },
      'snackbar-trigger-warning': {
        color: 'warning',
        heading: 'Warning',
        message: 'Please double check your input before continuing.',
        closable: true,
      },
      'snackbar-trigger-danger': {
        color: 'danger',
        heading: 'Error',
        message: 'Something went wrong. Please try again.',
        closable: true,
      },
    }

    Object.keys(presets).forEach(id => {
      const trigger = document.getElementById(id)
      if (!trigger) return
      trigger.addEventListener('click', () => {
        controller.create({
          closable: false,
          closeHandler: toastId => controller.remove(toastId),
          actionHandler: toastId => controller.remove(toastId),
          ...presets[id],
        })
      })
    })
  })()
</script>`,
  ),
})
Controller.storyName = '🧩 Controller'
