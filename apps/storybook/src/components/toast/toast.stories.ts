import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsToast & { slot: string }

const tag = 'ds-toast'

const meta: Meta<Args> = {
  title: 'Components/Toast/Variants',
  args: {
    heading: 'Information',
    closable: true,
    slot: 'Hello World',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ slot, ...args }) => `<ds-toast ${props(args)}>${slot}</ds-toast>`),
}

export default meta

/**
 * STORIES
 * ––––––––––––––––––––––––––––––––––––––––––––––––––––––
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const Variants = Story({
  ...withRender(
    () => `<div class="flex gap-small flex-direction-column">
  <ds-toast closable> Your changes have been saved. </ds-toast>
  <ds-toast color="info" action="Okay"> Your changes have been saved. </ds-toast>
  <ds-toast color="info" closable action="Okay"> Your changes have been saved. </ds-toast>
  <ds-toast closable>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore nostrum officia neque aut quas accusantium
    sequi, nam molestiae. Incidunt praesentium ut corporis possimus, impedit sunt. Exercitationem eius modi
    laboriosam amet.
  </ds-toast>
  <ds-toast color="danger" closable heading="Information"> Your changes have been saved. </ds-toast>
  <ds-toast color="success" heading="Information"> Your changes have been saved. </ds-toast>
  <ds-toast color="success" closable action="Okay" heading="Information">
    Your changes have been saved.
  </ds-toast>
  <ds-toast color="success" action="Okay" heading="Information"> Your changes have been saved. </ds-toast>
</div>`,
  ),
})
Variants.storyName = '🧩 Variants'

export const Colors = Story({
  ...withRender(
    () => `<div class="flex gap-small flex-direction-column">
  <ds-toast heading="Default"> Your changes have been saved. </ds-toast>
  <ds-toast color="info" heading="Information"> Your changes have been saved. </ds-toast>
  <ds-toast color="success" heading="Success"> Your changes have been saved. </ds-toast>
  <ds-toast color="warning" heading="Warning"> Your changes have been saved. </ds-toast>
  <ds-toast color="danger" heading="Danger"> Your changes have been saved. </ds-toast>
</div>`,
  ),
})
Colors.storyName = '🧩 Colors'
