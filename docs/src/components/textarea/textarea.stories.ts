import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { lorem1, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsTextarea

const tag = 'ds-textarea'

const meta: Meta<Args> = {
  title: 'Components/Forms/Textarea/Variants',
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    description: 'Description',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ slot, ...args }) => `<ds-textarea ${props(args)}></ds-textarea>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    ({ label, description, ...args }) => `
<div class="field">
  <label class="label" for="textarea-basic">${label}</label>
  <div class="control">
    <textarea id="textarea-basic" class="textarea" aria-describedby="help-basic" ${props(args)}></textarea>
  </div>
  <p id="help-basic" class="help">${description}</p>
</div>
`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Optional = Story({
  args: { required: false },
})
Optional.storyName = '🧩 Optional'

export const Disabled = Story({
  args: { disabled: true },
})
Disabled.storyName = '🧩 Disabled'

export const Invalid = Story({
  args: { invalid: true, invalidText: 'Validation Message' },
})
Invalid.storyName = '🧩 Invalid'

export const Rows = Story({
  args: { rows: 6, value: lorem1 },
})
Rows.storyName = '🧩 Rows'
