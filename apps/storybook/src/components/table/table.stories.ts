import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

type Args = Record<string, never>

const meta: Meta<Args> = {
  title: 'Components/Table/Variants',
  args: {},
  argTypes: {},
  ...withRender(
    () => `
<table class="ds-table is-wide">
  <thead>
    <tr>
      <th>Selected</th>
      <th>Name</th>
      <th>Status</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ds-checkbox id="checkbox1"></ds-checkbox>
      </td>
      <td>Tony Stark</td>
      <td><span class="ds-tag is-success is-sm">Ready</span></td>
      <td class="has-buttons">
        <ds-button color="tertiary" size="sm" icon="edit" square="true" outlined="true"></ds-button>
        <ds-button color="tertiary" size="sm" icon="trash" square="true" outlined="true"></ds-button>
      </td>
    </tr>
        <tr>
      <td>
        <ds-checkbox id="checkbox2"></ds-checkbox>
      </td>
      <td>Steve Rogers</td>
      <td><span class="ds-tag is-danger is-sm">Injured</span></td>
      <td class="has-buttons">
        <ds-button color="tertiary" size="sm" icon="edit" square="true" outlined="true"></ds-button>
        <ds-button color="tertiary" size="sm" icon="trash" square="true" outlined="true"></ds-button>
      </td>
    </tr>
        <tr>
      <td>
        <ds-checkbox id="checkbox3"></ds-checkbox>
      </td>
      <td>Peter Parker</td>
      <td><span class="ds-tag is-info is-sm">In School</span></td>
      <td class="has-buttons">
        <ds-button color="tertiary" size="sm" icon="edit" square="true" outlined="true"></ds-button>
        <ds-button color="tertiary" size="sm" icon="trash" square="true" outlined="true"></ds-button>
      </td>
    </tr>
        <tr>
      <td>
        <ds-checkbox id="checkbox4"></ds-checkbox>
      </td>
      <td>John Doe</td>
      <td><span class="ds-tag is-sm">Unknown</span></td>
      <td class="has-buttons">
        <ds-button color="tertiary" size="sm" icon="edit" square="true" outlined="true"></ds-button>
        <ds-button color="tertiary" size="sm" icon="trash" square="true" outlined="true"></ds-button>
      </td>
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
<table class="ds-table is-wide is-striped is-hoverable">
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
<table class="ds-table is-narrow">
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
