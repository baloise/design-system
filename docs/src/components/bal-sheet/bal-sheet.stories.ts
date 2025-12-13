import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

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
    <h1 class="title">Sheet Example</h1>
  </div>

  <bal-sheet ${props(args)}>
    <bal-stack layout="vertical" space="small" class="tablet:hidden">
      <bal-button expanded>Continue with 1'234 CHF</bal-button>
      <bal-button expanded color="secondary">Back</bal-button>
    </bal-stack>
    <bal-stack class="mobile:hidden">
      <bal-heading level="p" visual-level="h4">1'234 CHF</bal-heading>
      <bal-content>
        <p class="text-small m-none">${content}</p>
      </bal-content>
      <bal-button-group>
        <bal-button color="secondary">Back</bal-button>
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
