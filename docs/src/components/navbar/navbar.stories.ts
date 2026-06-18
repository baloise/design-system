import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsNavbar & { slot: string }

const meta: Meta<Args> = {
  title: 'Components/Navbar/Variants',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    slot: '',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-navbar' }),
  },
  ...withRender(
    () => `<ds-navbar>
  <a slot="brand" href="/">
    <ds-logo color="white"></ds-logo>
  </a>
  <h1 slot="title">Navbar</h1>

  <a href="#" slot="menu-start" aria-current="page">About</a>
  <a href="#" slot="menu-start">Features</a>
  <a href="#" slot="menu-start">Pricing</a>

  <ds-button slot="menu-end" icon="search" square></ds-button>
  <button slot="menu-end" class="button">Sign In</button>
</ds-navbar>`,
  ),
}

export default meta

const Story = StoryFactory<Args>(meta)

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const BasicMobile = Story({
  globals: {
    viewport: {
      value: 'small',
    },
  },
  ...withRender(
    () => `<ds-navbar>
  <a slot="brand" href="/">
    <ds-logo color="white"></ds-logo>
  </a>
  <h1 slot="title">Navbar</h1>

  <a href="#" slot="menu-start" aria-current="page">About</a>
  <a href="#" slot="menu-start">Features</a>
  <a href="#" slot="menu-start">Pricing</a>

  <ds-button slot="menu-end" icon="search" square></ds-button>
  <button slot="menu-end" class="button">Sign In</button>
</ds-navbar>`,
  ),
})
BasicMobile.storyName = '🧩 Mobile'

export const BrandLogo = Story({
  ...withRender(
    () => `<ds-navbar light>
<a href="/" slot="brand" style="padding: 0; display: flex; align-items: center">
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="4" fill="yellow" />
    <text x="16" y="22" font-size="18" font-weight="bold" fill="purple" text-anchor="middle">A</text>
  </svg>
</a>
<h1 slot="title">White Label</h1>
<a href="#" slot="menu-start" aria-current="page">Docs</a>
<a href="#" slot="menu-start">API</a>
<button class="button" slot="menu-end">Get Started</button>
</ds-navbar>`,
  ),
})
BrandLogo.storyName = '🧩 Brand Logo'
