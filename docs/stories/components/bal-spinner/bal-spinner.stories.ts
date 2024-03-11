import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalSpinner

const meta: Meta<Args> = {
  title: 'Components/Feedback/Spinner',
  args: {},
  argTypes: {
    ...withComponentControls({ tag: 'bal-spinner' }),
  },
  ...withRender(({ ...args }) => `<bal-spinner ${props(args)}></bal-spinner>`),
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
  ...withRender(() => `<bal-button loading="true" disabled="true">Button</bal-button>`),
})

export const LoadingCard = Story({
  args: {
    // place props here
  },
  ...withRender(
    () => `<bal-card>
    <bal-card-content class="flex align-items-center flex-direction-column justify-content-center">
        <bal-spinner class="my-medium"></bal-spinner>
        <bal-heading level="h5" space="all">Please wait...</bal-heading>
    </bal-card-content>
</bal-card>`,
  ),
})
