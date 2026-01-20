import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { createCssMappings, cssClasses, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.BalClose & { content: string }

const tag = 'bal-close'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Navigation/Close 👻',
  args: {},
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(
    ({ content, ...args }) => `
<button ${cssClasses(
      {
        ...css('color', (color: string) => `is-${color}`),
        ...css('size', (size: string) => `is-${size}`),
      },
      args,
      'close',
    )} aria-label="close" title="Close" tabindex="0"></button>
`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const WebComponentBasic = Story({
  ...withRender(({ content, ...args }) => `<bal-close ${props(args)}></bal-close>`),
})
