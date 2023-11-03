import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalDate & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/Date',
  args: {
    ...withDefaultContent(''),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-date' }),
  },
  ...withRender(({ content, ...args }) => `<bal-date ${props(args)}>${content}</bal-date>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(({ content, ...args }) => `<bal-date ${props(args)}>${content}</bal-date>`),
  args: {
    placeholder: 'Placeholder',
    content: '',
  },
})

export const FieldControl = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-date ${props(args)}></bal-date>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Placeholder',
  },
})

export const ManualInput = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-date ${props(args)} trigger-icon="true"></bal-date>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Placeholder',
  },
})

export const MinAndMax = Story({
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-date ${props(args)} default-date="2022-02-07"></bal-date>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    placeholder: 'Placeholder',
    min: '2022-02-06',
    max: '2022-03-12',
  },
})
