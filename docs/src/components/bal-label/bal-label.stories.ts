import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  createCssMappings,
  cssClasses,
  StoryFactory,
  withComponentControls,
  withContent,
  withDefaultContent,
  withRender,
} from '../../utils'

type Args = JSX.BalLabel & { content: string }

const tag = 'bal-label'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Typography/Label',
  args: {
    ...withDefaultContent('Label'),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ content, ...args }) => `
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
    )}>${content}</label>
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

export const RequiredAndOptional = Story({
  args: {
    content: 'Label (optional)',
  },
})

export const States = Story({
  ...withRender(
    () => `
<label class="label is-danger">Invalid Label</label>
<label class="label is-disabled">Disabled Label</label>
`,
  ),
})

export const Sizes = Story({
  ...withRender(
    () => `
<label class="label is-small">Small Label</label>
<label class="label">Normal Label</label>
<label class="label is-large">Large Label</label>
`,
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
