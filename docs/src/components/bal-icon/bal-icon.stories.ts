import { BrandIconCarCrashWithAnimalGreen } from '@baloise/ds-assets/dist'
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

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
        'information',
        'alert',
        'file',
        'picture',
        'video',
        'audio',
        'clock',
        'close',
        'info-circle',
        'link',
        'plus',
        'minus',
        'nav-go-left',
        'nav-go-right',
        'nav-go-down',
        'nav-go-up',
        'caret-up',
        'caret-right',
        'caret-down',
        'caret-left',
        'check',
        'date',
        'document',
        'download',
        'edit',
        'trash',
        'upload',
        'menu-bars',
        'facebook',
        'instagram',
        'xing',
        'linkedin',
        'twitter',
        'x',
        'youtube',
        'web',
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

export const BrandIcons = Story({
  args: {
    size: 'x-large',
    color: 'auto',
    content: '',
  },
  ...withRender(
    ({ content, ...args }) =>
      `<bal-icon ${props(args)} svg='${BrandIconCarCrashWithAnimalGreen}'>${content}</bal-icon>`,
  ),
})
