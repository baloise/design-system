import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

type Args = Record<string, never>

const meta: Meta<Args> = {
  title: 'Components/Table/Variants',
  args: {},
  argTypes: {},
  ...withRender(
    () => `
<table class="table is-wide">
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Admin</td>
      <td>Active</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Editor</td>
      <td>Inactive</td>
    </tr>
    <tr>
      <td>Carol</td>
      <td>Viewer</td>
      <td>Active</td>
    </tr>
  </tbody>
</table>
`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const Striped = Story({
  ...withRender(
    () => `
<table class="table is-wide is-striped is-hoverable">
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Admin</td>
      <td>Active</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Editor</td>
      <td>Inactive</td>
    </tr>
    <tr>
      <td>Carol</td>
      <td>Viewer</td>
      <td>Active</td>
    </tr>
    <tr>
      <td>Dave</td>
      <td>Admin</td>
      <td>Active</td>
    </tr>
  </tbody>
</table>
`,
  ),
})
Striped.storyName = '🧩 Striped'

export const Narrow = Story({
  ...withRender(
    () => `
<table class="table is-narrow">
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Editor</td>
    </tr>
    <tr>
      <td>Carol</td>
      <td>Viewer</td>
    </tr>
  </tbody>
</table>
`,
  ),
})
Narrow.storyName = '🧩 Narrow'
