import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalNumberInput & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/NumberInput',
  args: {
    ...withDefaultContent(''),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-number-input' }),
  },
  ...withRender(({ content, ...args }) => `<bal-number-input ${props(args)}>${content}</bal-number-input>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    placeholder: 'Enter a number',
  },
})

export const FieldControl = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
      <bal-number-input ${props(args)}></bal-number-input>
  </bal-field-control>
  <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Enter a number',
  },
})

export const Currency = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
        <bal-number-input ${props(args)}></bal-number-input>
    </bal-field-control>
    <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    decimal: '2',
    suffix: 'CHF',
    value: '1234.45',
  },
})
