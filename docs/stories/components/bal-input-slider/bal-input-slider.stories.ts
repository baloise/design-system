import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalInputSlider & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Form/InputSlider',
  args: {
    ...withDefaultContent(''),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-input-slider' }),
  },
  ...withRender(({ content, ...args }) => `<bal-input-slider ${props(args)}>${content}</bal-input-slider>`),
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
  ...withRender(
    ({ ...args }) => `<bal-field>
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-input-slider ${props(args)}></bal-input-slider>
  </bal-field-control>
  <bal-field-message>Field Message</bal-field-message>
</bal-field>`,
  ),
  args: {
    value: '20',
    hasTicks: true,
    step: 20,
    min: 0,
    max: 100,
  },
})
