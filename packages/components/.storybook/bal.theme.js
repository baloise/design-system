import { create, themes } from '@storybook/theming'
import Logo from '../src/stories/assets/images/logo.svg'

export default create({
  ...themes.dark,

  appBg: '#15212a',
  appBg: '#161A38',
  appBg: '#13162D',
  appBg: '#12152D',
  appContentBg: '#1b2730',
  appContentBg: '#181D41',
  appContentBg: '#1E234A',
  appBorderRadius: 12,

  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  barTextColor: '#c5c5c5',
  barBg: '#181D41',

  inputBg: '#15212a',
  inputBorder: '#c5c5c5',
  inputBorderRadius: 4,

  brandTitle: 'Baloise Design System',
  brandUrl: 'https://github.com/baloise/design-system',
  brandImage: Logo,
})
