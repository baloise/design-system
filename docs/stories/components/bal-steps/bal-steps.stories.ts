import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalSteps

const meta: Meta<Args> = {
  title: 'Components/Navigation/Steps',
  args: {
    value: 'tab-c',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-steps' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-steps ${props(args)}>
  <bal-step-item value="step-a" label="Done" done="true">Content of Step A</bal-step-item>
  <bal-step-item value="step-b" label="Failed" failed="true">Content of Step B</bal-step-item>
  <bal-step-item value="step-c" label="Active">Content of Step C</bal-step-item>
  <bal-step-item value="step-d" label="Default">Content of Step D</bal-step-item>
  <bal-step-item value="step-e" label="Disabled" disabled="true">Content of Step E</bal-step-item>
  <bal-step-item value="step-f" label="Hidden" hidden="true">Content of Step F</bal-step-item>
</bal-steps>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
