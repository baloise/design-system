import { create } from '@storybook/theming'
import Logo from '../src/stories/assets/images/logo.svg'

export default create({
  base: 'light',

  colorPrimary: '#000d6e',
  colorSecondary: '#000d6e',

  // UI
  appBg: '#f6f6f6',
  appContentBg: '#ffffff',
  appBorderColor: '#b6b6b6',
  appBorderRadius: 12,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#000000',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#000000',
  barSelectedColor: '#000d6e',
  barBg: '#e8e8e8',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e8e8e8',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Baloise Design System',
  brandUrl: 'https://github.com/baloise/design-system',
  brandImage: Logo,
})
