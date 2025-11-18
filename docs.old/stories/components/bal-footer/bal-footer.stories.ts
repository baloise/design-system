import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalFooter & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Footer',
  args: {
    ...withDefaultContent(),
    content: 'Footer Content',
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-footer' }),
  },
  ...withRender(
    ({ content }) => `<bal-footer>
  <div class="container">
    <p>${content}</p>
  </div>
</bal-footer>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const FooterOfGermany = Story({
  args: {
    region: 'DE',
    language: 'de',
    content: '',
    hideLanguageSelection: true,
    showSocialMedia: true,
  },
  ...withRender(
    ({ content, ...args }) => `<bal-footer ${props(args)}>
  <div class="container">
    <p>${content}</p>
  </div>
</bal-footer>`,
  ),
})
