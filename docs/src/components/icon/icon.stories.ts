import { BrandIconCarCrashWithAnimalGreen } from '@baloise/ds-assets/dist'
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsIcon & { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Icon/Variants',
  args: {
    slot: 'Hello World',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-icon' }),
  },
  ...withRender(({ slot, ...args }) => `<ds-icon ${props(args)}>${slot}</ds-icon>`),
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
    slot: '',
  },
})
Basic.storyName = '🧩 Basic'

export const UiIcons = Story({
  args: {
    name: 'info-circle',
    size: 'large',
    slot: '',
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
      <ds-icon name="${item}"></ds-icon>
      <span>${item}</span>
    </div>`,
        )
        .join(' ')}
</div>`,
  ),
})
UiIcons.storyName = '🧩 UI Icons'

export const BrandIcons = Story({
  args: {
    size: 'x-large',
    color: 'auto',
    slot: '',
  },
  ...withRender(
    ({ slot, ...args }) => `<ds-icon ${props(args)} svg='${BrandIconCarCrashWithAnimalGreen}'>${slot}</ds-icon>`,
  ),
})
BrandIcons.storyName = '🧩 Brand Icons'
