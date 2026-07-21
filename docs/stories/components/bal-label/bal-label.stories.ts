import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalLabel & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Typography/Label',
  args: {
    ...withDefaultContent('Label'),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-label' }),
  },
  ...withRender(({ content, ...args }) => `<bal-label ${props(args)}>${content}</bal-label>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    required: undefined,
  },
})

export const RequiredAndOptional = Story({
  args: {
    content: 'Label (optional)',
  },
})

export const States = Story({
  ...withRender(
    () => `<div>
  <div>
    <bal-label invalid="true">Invalid Label</bal-label>
  </div>
  <div>
    <bal-label disabled="true">Disabled Label</bal-label>
  </div>
</div>`,
  ),
})

export const Sizes = Story({
  ...withRender(
    () => `<div>
    <div>
      <bal-label size="small">Small Label</bal-label>
    </div>
    <div>
      <bal-label>Normal Label</bal-label>
    </div>
    <div>
      <bal-label size="large">Large Label</bal-label>
    </div>
  </div>`,
  ),
})

export const FieldLabel = Story({
  ...withRender(
    () => `<bal-field>
    <bal-field-label required="true">Field Label</bal-field-label>
    <bal-field-control>
      <bal-input name="my-input" placeholder="Placeholder"></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
  </bal-field>`,
  ),
})
