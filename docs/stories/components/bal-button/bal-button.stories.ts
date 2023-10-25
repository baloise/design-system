
import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalButton & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Button',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-button' }),
  },
  ...withRender(({ content, ...args }) => `<bal-button ${props(args)}>${content}</bal-button>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    icon: 'plus',
  },
})

export const ButtonVariants = Story({
  ...withRender(
    () => `<bal-button-group direction="column" position="center">
    <bal-button>Primary</bal-button>
    <bal-button color="secondary">Secondary</bal-button>
    <bal-button color="tertiary">Tertiary</bal-button>
    <bal-button color="tertiary-purple">Tertiary Purple</bal-button>
    <bal-button color="tertiary-red">Tertiary Red</bal-button>
    <bal-button color="tertiary-yellow">Tertiary Yellow</bal-button>
    <bal-button color="tertiary-green">Tertiary Green</bal-button>
    <bal-button color="link">Link</bal-button>
  </bal-button-group>`,
  ),
})

export const ButtonStates = Story({
  ...withRender(
    () => `<bal-button-group>
    <bal-button loading>Loading</bal-button>
    <bal-button disabled>Disabled</bal-button>
  </bal-button-group>`,
  ),
})

export const AlertButtons = Story({
  args: {
    icon: 'plus',
  },
  ...withRender(
    () => `<bal-button-group>
    <bal-button v-bind="args" color="info-light">Info</bal-button>
    <bal-button v-bind="args" color="success">Success</bal-button>
    <bal-button v-bind="args" color="warning">Warning</bal-button>
    <bal-button v-bind="args" color="danger">Danger</bal-button>
  </bal-button-group>`,
  ),
})
