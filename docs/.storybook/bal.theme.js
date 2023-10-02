import { create, themes } from '@storybook/theming'
import Logo from '../public/assets/images/storybook.svg'

export default create({
  ...themes.light,
  base: 'light',
  brandTitle: 'Baloise Design System',
  brandUrl: 'https://github.com/baloise/design-system',
  brandImage: Logo,

  fontBase: 'BaloiseCreateText, "Open Sans", Arial, sans-serif',
  fontCode: 'monospace',

  colorPrimary: "#000d6e",
  colorSecondary: "#d9304c",

  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appBorderColor: "#e8e8e8",
  appBorderRadius: 12,

  barBg: '#ffffff',
  barTextColor: '#000d6e',
  barSelectedColor: "#000d6e",

  inputBg: '#ffffff',
  inputBorder: '#e8e8e8',
  inputTextColor: '#000d6e',
  inputBorderRadius: 4,

  textColor: "#000d6e",
  textInverseColor: "#ffffff",
  textMutedColor: "#1c5951",

  gridCellSize: 8,
})
