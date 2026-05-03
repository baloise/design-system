import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsSpinner

const meta: Meta<Args> = {
  title: 'Components/Spinner/Variants',
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
Basic.storyName = '🧩 Basic'

export const LoadingButton = Story({
  args: {
    // place props here
  },
  ...withRender(() => `<ds-button loading="true" disabled="true">Button</ds-button>`),
})
LoadingButton.storyName = '🧩 Loading Button'

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
LoadingCard.storyName = '🧩 Loading Card'
