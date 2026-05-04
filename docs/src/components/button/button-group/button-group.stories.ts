import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, props, StoryFactory, withComponentControls, withRender } from '../../../utils'

type Args = JSX.DsButtonGroup

const tag = 'ds-button-group'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Button/ButtonGroup',
  tags: ['!dev'],
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ ...args }) => `
<ds-button-group ${props(args)}>
  <ds-button color="primary">Primary</ds-button>
  <ds-button color="secondary">Secondary</ds-button>
</ds-button-group>`,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    ({ slot, ...args }) => `
  <div ${cssClasses({}, args, 'buttons')}>
    <button class="button is-primary">Primary</button>
    <button class="button is-secondary">Secondary</button>
  </div>
  `,
  ),
})
BasicHtml.storyName = '🌍 Basic'
