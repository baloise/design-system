import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalInputSlider & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/InputSlider',
  argTypes: {
    ...withComponentControls({ tag: 'bal-input-slider' }),
  },
  ...withRender(({ ...args }) => `<bal-input-slider ${props(args)}></bal-input-slider>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    value: '20',
    hasTicks: true,
    step: 20,
    min: 0,
    max: 100,
  },
})

export const FieldControl = Story({
  args: {
    value: '20',
    hasTicks: true,
    step: 20,
    min: 0,
    max: 100,
  },
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-input-slider ${props(args)}></bal-input-slider>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
})
