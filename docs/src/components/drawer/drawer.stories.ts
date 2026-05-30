import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsDrawer & { slot: string }

const tag = 'ds-drawer'

const meta: Meta<Args> = {
  title: 'Components/Drawer/Variants',
  args: {
    slot: 'Drawer content',
    open: false,
    closable: true,
    backdropDismiss: true,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-drawer' }),
  },
  ...withRender(({ slot, ...args }) => `<ds-drawer ${props(args)}>${slot}</ds-drawer>`),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Drawer = Story({
  ...withRender(
    ({ slot, ...args }) => `
<ds-drawer id="drawer-basic" ${props(args)}>${slot}</ds-drawer>

<!-- Trigger -->
<ds-button onclick="document.getElementById('drawer-basic').present()">
  Open Drawer
</ds-button>
    `,
  ),
})
Drawer.storyName = '🧩 Basic'

export const RichContent = Story({
  args: {
    label: 'Filter options',
    container: 'compact',
  },
  ...withRender(
    ({ slot, ...args }) => `
<ds-button onclick="document.getElementById('drawer-rich').present()">Open Drawer</ds-button>
<ds-drawer id="drawer-rich" ${props(args)}>
  <h3 class="title mb-base">Filter options</h3>
  <ds-checkbox-group vertical>
    <ds-checkbox>Category A</ds-checkbox>
    <ds-checkbox>Category B</ds-checkbox>
    <ds-checkbox>Category C</ds-checkbox>
  </ds-checkbox-group>
  <ds-button-group align="right">
    <ds-button color="text">Cancel</ds-button>
    <ds-button color="primary">Apply</ds-button>
  </ds-button-group>
</ds-drawer>
    `,
  ),
})
RichContent.storyName = '🧩 Rich Content'

export const Container = Story({
  args: {
    label: 'Container sizes',
    container: 'fluid',
    slot: 'This drawer uses different container widths. Change the container prop to see the effect.',
  },
  ...withRender(
    ({ slot, ...args }) => `
<ds-button onclick="document.getElementById('drawer-container').present()">Open Drawer</ds-button>
<ds-drawer id="drawer-container" ${props(args)}>${slot}</ds-drawer>
    `,
  ),
})
Container.storyName = '🧩 Container Sizes'
