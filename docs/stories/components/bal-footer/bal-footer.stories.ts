import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalFooter & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/Footer',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-footer' }),
  },
  ...withRender(({ content, ...args }) => `<bal-footer ${props(args)}>${content}</bal-footer>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    ({ content, ...args }) => `<bal-footer ${props(args)}>
  <div class="container">
    <p>${content}</p>
  </div>
</bal-footer>`,
  ),
  args: {
    content: 'Footer Content',
    hideLinks: false,
    hideLanguageSelection: false,
    showSocialMedia: false,
  },
})

export const FooterOfGermany = Story({
  ...withRender(
    ({ content, ...args }) => `<bal-footer ${props(args)} hide-language-selection="true" show-social-media="true">
  <div class="container">
    <p>${content}</p>
  </div>
</bal-footer>`,
  ),
  args: {
    hideLinks: false,
    region: 'DE',
    language: 'de',
    content: '',
  },
})
