import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsData & { slot: string }

const tag = 'ds-data'

const meta: Meta<Args> = {
  title: 'Components/Data/Variants',
  args: {
    slot: `<ds-data-item>
  <ds-data-label>Label</ds-data-label>
  <ds-data-value>Value</ds-data-value>
</ds-data-item>
<ds-data-item>
  <ds-data-label>Email</ds-data-label>
  <ds-data-value>user@example.com</ds-data-value>
</ds-data-item>`,
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ slot, ...args }) => `<ds-data ${props(args)}>${slot}</ds-data>`),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const Horizontal = Story({
  args: {
    horizontal: true,
    slot: `<ds-data-item>
  <ds-data-label>Label 1</ds-data-label>
  <ds-data-value>Value 1</ds-data-value>
</ds-data-item>
<ds-data-item>
  <ds-data-label>Label 2</ds-data-label>
  <ds-data-value>Value 2</ds-data-value>
</ds-data-item>
<ds-data-item>
  <ds-data-label>Label 3</ds-data-label>
  <ds-data-value>Value 3</ds-data-value>
</ds-data-item>`,
  },
})
Horizontal.storyName = '🧩 Horizontal Layout'

export const Multiline = Story({
  args: {
    slot: `<ds-data-item multiline="true">
  <ds-data-label>Description</ds-data-label>
  <ds-data-value>
    This is a very long value that should wrap to multiple lines to demonstrate the multiline functionality of
    the data value component.
  </ds-data-value>
</ds-data-item>
<ds-data-item multiline="true">
  <ds-data-label>List</ds-data-label>
  <ds-data-value>
    <ul class="unordered-list ml-none">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </ds-data-value>
</ds-data-item>`,
  },
})
Multiline.storyName = '🧩 Multiline Values'

export const Required = Story({
  args: {
    slot: `<ds-data-item>
  <ds-data-label required>Name</ds-data-label>
  <ds-data-value>John Doe</ds-data-value>
</ds-data-item>
<ds-data-item>
  <ds-data-label required>Email</ds-data-label>
  <ds-data-value>john@example.com</ds-data-value>
</ds-data-item>`,
  },
})
Required.storyName = '🧩 Required Labels'

export const Disabled = Story({
  args: {
    slot: `<ds-data-item>
  <ds-data-label>Enabled Item</ds-data-label>
  <ds-data-value>This is enabled</ds-data-value>
</ds-data-item>
<ds-data-item disabled="true">
  <ds-data-label>Disabled Item</ds-data-label>
  <ds-data-value>This is disabled</ds-data-value>
</ds-data-item>`,
  },
})
Disabled.storyName = '🧩 Disabled State'

export const Editable = Story({
  args: {
    slot: `<ds-data-item editable="true">
  <ds-data-label>Name</ds-data-label>
  <ds-data-value>John Doe</ds-data-value>
</ds-data-item>
<ds-data-item editable="true">
  <ds-data-label>Email</ds-data-label>
  <ds-data-value>john@example.com</ds-data-value>
</ds-data-item>`,
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-card>
  <ds-card-header>
    <ds-card-title>Account Details</ds-card-title>
  </ds-card-header>
  <ds-card-content>
    <ds-data ${props(args)}>${slot}</ds-data>
  </ds-card-content>
</ds-card>`,
  ),
})
Editable.storyName = '🧩 Editable State'
