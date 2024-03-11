import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalSheet & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Containment/Sheet',
  args: {
    ...withDefaultContent(),
    containerSize: 'compact',
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-sheet' }),
  },
  ...withRender(
    ({ content, ...args }) => `<div>
  <div class="container is-compact mb-xx-small">
    <bal-card>
      <bal-card-title>BaloiseCombi</bal-card-title>
      <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>
      <bal-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</bal-card-content>
      <bal-card-actions position="right">
        <bal-button>Main Action</bal-button>
        <bal-button color="info" outlined>Secondary Action</bal-button>
      </bal-card-actions>
    </bal-card>
  </div>

  <bal-sheet ${props(args)}>
    <bal-stack layout="vertical" space="small" class="tablet:hidden">
      <bal-button expanded>Continue with 1'234 CHF</bal-button>
      <bal-button expanded color="info">Back</bal-button>
    </bal-stack>
    <bal-stack class="mobile:hidden">
      <bal-heading level="p" visual-level="h4">1'234 CHF</bal-heading>
      <bal-content>
        <p class="text-small m-none flex-1">${content}</p>
      </bal-content>
      <bal-button-group>
        <bal-button color="info">Back</bal-button>
        <bal-button>Next</bal-button>
      </bal-button-group>
    </bal-stack>
  </bal-sheet>
</div>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
