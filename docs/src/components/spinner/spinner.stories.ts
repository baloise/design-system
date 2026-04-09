import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.BalSpinner

const meta: Meta<Args> = {
  title: 'Components/Feedback/Spinner',
  args: {},
  argTypes: {
    ...withComponentControls({ tag: 'ds-spinner' }),
  },
  ...withRender(({ ...args }) => `<ds-spinner ${props(args)}></ds-spinner>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const LoadingButton = Story({
  args: {
    // place props here
  },
  ...withRender(() => `<ds-button loading="true" disabled="true">Button</ds-button>`),
})

export const LoadingCard = Story({
  args: {
    // place props here
  },
  ...withRender(
    () => `<ds-card>
    <ds-card-content class="flex align-items-center flex-direction-column justify-content-center">
        <ds-spinner class="my-medium"></ds-spinner>
        <ds-heading level="h5" space="all">Please wait...</ds-heading>
    </ds-card-content>
</ds-card>`,
  ),
})
