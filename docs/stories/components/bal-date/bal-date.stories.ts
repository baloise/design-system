import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalDate & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/Date',
  args: {
    ...withDefaultContent(''),
    placeholder: 'Pick a date',
    content: undefined,
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-date' }),
  },
  ...withRender(({ ...args }) => `<bal-date ${props(args)}></bal-date>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const FieldControl = Story({
  args: {
    placeholder: 'Pick a date',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-date ${props(args)}></bal-date>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const ManualInput = Story({
  args: {
    placeholder: 'Pick a date',
    triggerIcon: true,
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-date ${props(args)}></bal-date>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})

export const MinAndMax = Story({
  args: {
    placeholder: 'Pick a date',
    min: '2022-02-06',
    max: '2022-03-12',
    defaultDate: '2022-02-07',
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-date ${props(args)}></bal-date>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})
