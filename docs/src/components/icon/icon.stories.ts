import { BrandIconCarCrashWithAnimalGreen } from '@baloise/ds-assets'
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
        'youtube',
        'xing',
        'x',
        'whats-app',
        'web',
        'video',
        'user-check',
        'upload',
        'twitter',
        'triangle',
        'trash',
        'tiktok',
        'star-shape',
        'star-half',
        'star-full',
        'share',
        'share-link',
        'settings',
        'send',
        'search',
        'refresh',
        'read-only',
        'print',
        'plus',
        'pinterest',
        'picture',
        'pdf',
        'nav-go-up',
        'nav-go-right',
        'nav-go-left',
        'nav-go-down',
        'nav-back',
        'mobile',
        'minus',
        'message',
        'menu-dots',
        'menu-bars',
        'map',
        'logout',
        'location',
        'location-target',
        'locate',
        'linkedin',
        'link',
        'instagram',
        'information',
        'info-circle',
        'help-customer-support',
        'github',
        'file',
        'facebook',
        'eye-closed',
        'edit',
        'duplicate',
        'download',
        'document',
        'design',
        'delete',
        'date',
        'copy',
        'contact',
        'consultant',
        'code',
        'close',
        'close-circle',
        'clock',
        'circle',
        'check',
        'check-circle',
        'caret-up',
        'caret-right',
        'caret-left',
        'caret-down',
        'call',
        'bell',
        'back',
        'audio',
        'arrows-round-left',
        'arrow-right-up',
        'arrow-right-down',
        'arrow-right-circle',
        'arrow-down',
        'answer',
        'alert',
        'alert-triangle',
        'account',
      ]
        .sort()
        .map(
          item => `<div class="flex gap-small flex-wrap align-items-center" style="min-width: 220px">
      <ds-icon name="${item}" size="md"></ds-icon>
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

export const Sizes = Story({
  ...withRender(
    () =>
      `<div class="stack">
      ${['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl']
        .map(
          item => `<div class="stack as-row">
      <ds-icon name="info-circle" size="${item}"></ds-icon>
      <span>${item}</span>
    </div>`,
        )
        .join(' ')}
</div>`,
  ),
})
Sizes.storyName = '🧩 Sizes'
