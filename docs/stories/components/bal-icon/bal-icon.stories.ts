import type { JSX } from '@baloise/design-system-components'
import { balBrandIconCarCrashWithAnimalGreen } from '@baloise/design-system-brand-icons'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalIcon & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data View/Icon',
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
    ({ content, ...args }) =>
      `<div class="is-flex fg-medium is-flex-wrap-wrap">
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
          item => `<div class="is-flex fg-small is-flex-wrap-wrap is-align-items-center" style="min-width: 180px">
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

// export const Sizes = Story({
//   args: {
//     name: 'info-circle',
//     size: 'large',
//     content: '',
//   },
//   ...withRender(
//     () => `<div>
//   <bal-icon name="date" size="x-small"></bal-icon>
//   <bal-icon name="date" size="small"></bal-icon>
//   <bal-icon name="date"></bal-icon>
//   <bal-icon name="date" size="medium"></bal-icon>
//   <bal-icon name="date" size="large"></bal-icon>
//   <bal-icon name="date" size="x-large"></bal-icon>
//   <bal-icon name="date" size="xx-large"></bal-icon>
// </div>`,
//   ),
// })

// export const Colors = Story({
//   args: {
//     name: 'info-circle',
//     size: 'large',
//     color: 'primary',
//     content: '',
//   },
//   ...withRender(
//     () => `<div>
//   <bal-icon color="primary" name="github"></bal-icon>
//   <bal-icon color="grey" name="github"></bal-icon>
//   <bal-icon color="success" name="github"></bal-icon>
//   <bal-icon color="warning" name="github"></bal-icon>
//   <bal-icon color="danger" name="github"></bal-icon>
// </div>`,
//   ),
// })
