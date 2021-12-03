import { create } from '@storybook/theming'
import Logo from '../src/stories/assets/images/logo.svg'

const primary = '#009ee7'
const secondary = '#039'
const border = '#d1dbed'

export default create({
  base: 'light',

  colorPrimary: primary,
  colorSecondary: secondary,

  // UI
  appBg: '#f8f9fa',
  appContentBg: 'white',
  appBorderColor: border,
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'black',
  barSelectedColor: primary,
  barBg: '#f1f3f5',

  // Form colors
  inputBg: 'white',
  inputBorder: border,
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Baloise Design System',
  brandUrl: 'https://www.baloise.com/',
  brandImage: Logo,
})
