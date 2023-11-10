import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalTabs

const meta: Meta<Args> = {
  title: 'Components/Navigation/Tabs',
  args: {
    fullwidth: true,
    border: true,
    value: 'tab-b',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-tabs' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-tabs ${props(args)}>
  <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
  <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
  <bal-tab-item value="tab-d" label="Tab D" hidden>Hidden Content of Tab D</bal-tab-item>
  <bal-tab-item value="tab-e" label="Tab E" disabled>Content of Tab E</bal-tab-item>
  <bal-tab-item value="tab-link" label="Tab link" href="https://github.com/baloise/design-system" target="_blank">Content of Tab link</bal-tab-item>
</bal-tabs>
  `,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Vertical = Story({
  args: {
    vertical: true,
  },
})

export const Mobile = Story({
  args: {
    expanded: true,
  },
  ...withRender(
    ({ ...args }) => `<bal-tabs ${props(args)}>
  <bal-tab-item value="tab-a" label="Account" icon="account">Content of Tab A</bal-tab-item>
  <bal-tab-item value="tab-b" label="Calendar" icon="date">Content of Tab B</bal-tab-item>
  <bal-tab-item value="tab-c" label="Settings" icon="settings" bubble>Content of Tab C</bal-tab-item>
  <bal-tab-item disabled value="tab-d" label="Support" icon="consultant">Content of Tab D</bal-tab-item>
</bal-tabs>
  `,
  ),
})
