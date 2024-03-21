import type { JSX } from '@baloise/ds-core'
import { balBrandIconCarCrashWithAnimalGreen } from '@baloise/ds-brand-icons/dist'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalIcon & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Icon',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-icon' }),
  },
  ...withRender(({ content, ...args }) => `<bal-icon ${props(args)}>${content}</bal-icon>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  args: {
    name: 'info-circle',
    size: 'large',
    content: '',
  },
})

export const UiIcons = Story({
  args: {
    name: 'info-circle',
    size: 'large',
    content: '',
  },
  ...withRender(
    () =>
      `<div class="flex gap-medium flex-wrap">
      ${[
        'caret-down',
        'caret-left',
        'caret-up',
        'check',
        'close',
        'date',
        'document',
        'edit',
        'facebook',
        'info-circle',
        'instagram',
        'linkedin',
        'menu-bars',
        'minus',
        'nav-go-down',
        'nav-go-left',
        'nav-go-right',
        'nav-go-up',
        'plus',
        'trash',
        'twitter',
        'upload',
        'web',
        'x',
        'xing',
        'youtube',
      ]
        .map(
          item => `<div class="flex gap-small flex-wrap align-items-center" style="min-width: 180px">
      <bal-icon name="${item}"></bal-icon>
      <span>${item}</span>
    </div>`,
        )
        .join(' ')}
</div>`,
  ),
})

// Youtube
// Xing
// X
// Web
// Upload
// Twitter
// Trash
// Plus
// NavGoUp
// NavGoRight
// NavGoLeft
// NavGoDown
// Minus
// MenuBars
// Linkedin
// Instagram
// InfoCircle
// Facebook
// Edit
// Document
// Date
// Close
// Check
// CaretUp
// CaretLeft
// CaretDown

export const BrandIcons = Story({
  args: {
    size: 'x-large',
    color: 'auto',
    content: '',
  },
  ...withRender(
    ({ content, ...args }) =>
      `<bal-icon ${props(args)} svg='${balBrandIconCarCrashWithAnimalGreen}'>${content}</bal-icon>`,
  ),
})
