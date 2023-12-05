import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalBadge & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Popup',
  args: {
    label: 'Popup Label',
    backdropDismiss: 'true',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-popup' }),
  },
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button bal-popup="my-popup">Click me</bal-button>
  <bal-popup id="my-popup" ${props(args)}>Popup content</bal-popup>
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

export const Popover = Story({
  args: {
    arrow: true,
    backdrop: true,
    closable: true,
    backdropDismiss: 'true',
  },
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button bal-popup="my-popup">Click me</bal-button>
  <bal-popup id="my-popup" ${props(args)}>Popup content</bal-popup>
</div>`,
  ),
})

export const Fullscreen = Story({
  args: {
    variant: 'fullscreen',
    closable: true,
    arrow: false,
    backdrop: false,
    backdropDismiss: 'true',
  },
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button bal-popup="my-popup">Click me</bal-button>
  <bal-popup id="my-popup" ${props(args)}>Popup content</bal-popup>
</div>`,
  ),
})

export const Drawer = Story({
  args: {
    label: 'Popup Label',
    variant: 'drawer',
    backdrop: true,
    closable: true,
    arrow: false,
    backdropDismiss: 'true',
  },
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button bal-popup="my-popup">Click me</bal-button>
  <bal-popup id="my-popup" ${props(args)}>Popup content</bal-popup>
</div>`,
  ),
})
