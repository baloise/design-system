import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsFooter & { slot: string }

const tag = 'ds-footer'

const meta: Meta<Args> = {
  title: 'Components/Footer/Variants',
  args: {
    slot: '',
    // logoSlot: '',
    // linksSlot: '',
    // socialLinksSlot: '',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ slot, ...args }) => `<ds-footer ${props(args)}>${slot}</ds-close>`),
  // ...withRender(({ slot, logoSlot, linksSlot, socialLinksSlot, ...args }) => {
  //   let html = `<ds-footer ${props(args)}>`
  //   if (slot) html += slot
  //   if (logoSlot) html += `<div slot="logo">${logoSlot}</div>`
  //   if (socialLinksSlot) html += socialLinksSlot
  //   if (linksSlot) html += linksSlot
  //   html += '</ds-footer>'
  //   return html
  // }),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const CustomLinks = Story({
  args: {
    disableDefaultSocialLinks: true,
    disableDefaultLinks: true,
    legalText: '© 42 Custom',
    slot: `
    <p>Footer Content</p>
    <a slot="links" href="/impressum">Gugus</a>
    <a slot="social-links" href="https://www.facebook.com" aria-label="Facebook">
      <ds-icon name="facebook"></ds-icon>
    </a>
  `,
  },
})
CustomLinks.storyName = '🧩 Custom Links'

export const CustomLogo = Story({
  args: {
    hideLanguageSelection: true,
    legalText: ' ',
    slot: `
    <a slot="logo" href="/" aria-label="Home"><strong class="title text-warning">Gugus</strong></a>
  `,
  },
})
CustomLogo.storyName = '🧩 Custom Logo'
