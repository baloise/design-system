import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalInputGroup & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/InputGroup',
  args: {
    placeholder: 'Enter text here',
  },
  argTypes: {
    ...withComponentControls({ tag: 'bal-input-group' }),
  },
  ...withRender(
    ({ ...args }) => `<bal-input-group class="mb-normal">
  <bal-input ${props(args)}></bal-input>
  <bal-icon name="date"></bal-icon>
</bal-input-group>

<bal-input-group class="mb-normal">
  <bal-icon name="date"></bal-icon>
  <bal-input ${props(args)}></bal-input>
</bal-input-group>

<bal-input-group class="mb-normal">
  <bal-icon name="call"></bal-icon>
  <bal-select style="max-width: 106px" value="DE">
    <bal-select-option label="DE" value="DE">DE</bal-select-option>
    <bal-select-option label="FR" value="FR">FR</bal-select-option>
    <bal-select-option label="IT" value="IT">IT</bal-select-option>
  </bal-select>
  <bal-input placeholder="79 123 45 67"></bal-input>
</bal-input-group>

<bal-input-group class="mb-normal">
  <bal-icon name="date"></bal-icon>
  <bal-input ${props(args)}></bal-input>
  <bal-icon name="date"></bal-icon>
</bal-input-group>

<bal-input-group class="mb-normal">
  <bal-tag closable="true">Tag</bal-tag>
  <bal-tag closable="true">Tag</bal-tag>
  <bal-tag closable="true">Tag</bal-tag>
  <bal-input ${props(args)}></bal-input>
  <bal-icon name="date"></bal-icon>
</bal-input-group>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
