import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsLabel & { slot: string }

const tag = 'ds-label'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Forms/Label/Variants',
  args: {
    slot: 'Label',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ slot, ...args }) => `
<label ${cssClasses(
      {
        ...css('color', (color: string) => `is-${color}`),
        ...css('size', (size: string) => `is-${size}`),
        disabled: 'is-disabled',
        valid: 'is-success',
        invalid: 'is-danger',
        multiline: 'is-multiline',
        noWrap: 'has-no-wrap',
      },
      args,
      'label',
    )}>${slot}</label>
  `,
  ),
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
Basic.storyName = '🌍 Basic'

export const RequiredAndOptional = Story({
  args: {
    slot: 'Label (optional)',
  },
})
RequiredAndOptional.storyName = '🌍 Required And Optional'

export const States = Story({
  ...withRender(
    () => `
<label class="label is-danger">Invalid Label</label>
<label class="label is-disabled">Disabled Label</label>
`,
  ),
})
States.storyName = '🌍 States'

export const Sizes = Story({
  ...withRender(
    () => `
<label class="label is-small">Small Label</label>
<label class="label">Normal Label</label>
<label class="label is-large">Large Label</label>
`,
  ),
})
Sizes.storyName = '🌍 Sizes'

export const FieldLabel = Story({
  ...withRender(
    () => `<ds-field>
    <ds-field-label required="true">Field Label</ds-field-label>
    <ds-field-control>
      <ds-input name="my-input" placeholder="Placeholder"></ds-input>
    </ds-field-control>
    <ds-field-message>Field Message</ds-field-message>
  </ds-field>`,
  ),
})
FieldLabel.storyName = '🧩 Field Label'
