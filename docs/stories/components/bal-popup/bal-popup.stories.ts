import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalBadge & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Popup',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-popup' }),
  },
  ...withRender(({ content, ...args }) => `<bal-popup ${props(args)}>${content}</bal-popup>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button bal-popup="my-popup">Click me</bal-button>
  <bal-popup id="my-popup" ${props(args)} backdrop-dismiss="true">Popup content</bal-popup>
</div>`,
  ),
  args: {
    arrow: false,
    backdrop: false,
    backdropDismiss: false,
    closable: false,
    content: '',
  },
})

export const Popover = Story({
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button bal-popup="my-popup">Click me</bal-button>
  <bal-popup id="my-popup" ${props(args)} backdrop-dismiss="true">Popup content</bal-popup>
</div>`,
  ),
  args: {
    arrow: true,
    backdrop: true,
    closable: true,
  },
})

export const Fullscreen = Story({
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button bal-popup="my-popup">Click me</bal-button>
  <bal-popup id="my-popup" ${props(args)} backdrop-dismiss="true">Popup content</bal-popup>
</div>`,
  ),
  args: {
    variant: 'fullscreen',
    closable: true,
    arrow: false,
    backdrop: false,
  },
})

export const Drawer = Story({
  ...withRender(
    ({ ...args }) => `<div>
  <bal-button bal-popup="my-popup">Click me</bal-button>
  <bal-popup id="my-popup" ${props(args)} backdrop-dismiss="true">Popup content</bal-popup>
</div>`,
  ),
  args: {
    label: 'Popup Label',
    variant: 'drawer',
    backdrop: true,
    closable: true,
    arrow: false,
  },
})
