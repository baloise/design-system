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
  ...withRender(
    ({ slot, ...args }) => `<ds-drawer ${props(args)}><div style="padding: 1rem">${slot}</div></ds-drawer>`,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Drawer = Story({
  ...withRender(
    ({ slot, ...args }) => `<ds-drawer ${props(args)}><div style="padding: 1rem">${slot}</div></ds-drawer>`,
  ),
})
Drawer.storyName = '🧩 Basic'

export const NotClosable = Story({
  args: {
    closable: false,
    backdropDismiss: false,
    slot: 'This drawer cannot be dismissed via Escape key or backdrop click. Use the programmatic API only.',
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-drawer ${props(args)}><div style="padding: 1rem"><p>${slot}</p></div></ds-drawer>`,
  ),
})
NotClosable.storyName = '🧩 Not Closable'

export const RichContent = Story({
  args: {
    label: 'Filter options',
    slot: `
<ds-heading level="h3" style="margin-top: 0">Filter options</ds-heading>
<div style="display: flex; flex-direction: column; gap: 1rem">
  <ds-checkbox>Category A</ds-checkbox>
  <ds-checkbox>Category B</ds-checkbox>
  <ds-checkbox>Category C</ds-checkbox>
  <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem">
    <ds-button color="text">Cancel</ds-button>
    <ds-button color="primary">Apply</ds-button>
  </div>
</div>
    `,
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-drawer ${props(args)}><div style="padding: 1rem">${slot}</div></ds-drawer>`,
  ),
})
RichContent.storyName = '🧩 Rich Content'

export const Scrollable = Story({
  args: {
    label: 'Long list',
    slot: `
<ds-heading level="h3" style="margin-top: 0">Items</ds-heading>
<ul style="margin: 0; padding: 0; list-style: none">
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 1</li>
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 2</li>
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 3</li>
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 4</li>
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 5</li>
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 6</li>
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 7</li>
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 8</li>
  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--ds-color-gray-light)">Item 9</li>
  <li style="padding: 0.5rem 0">Item 10</li>
</ul>
    `,
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-drawer ${props(args)}><div style="padding: 1rem">${slot}</div></ds-drawer>`,
  ),
})
Scrollable.storyName = '🧩 Scrollable'

export const Container = Story({
  args: {
    label: 'Container sizes',
    container: 'default',
    slot: 'This drawer uses different container widths. Change the container prop to see the effect.',
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-drawer ${props(args)}><div style="padding: 1rem">${slot}</div></ds-drawer>`,
  ),
})
Container.storyName = '🧩 Container Sizes'
