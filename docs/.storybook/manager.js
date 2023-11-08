import { addons } from '@storybook/addons'
import baloiseTheme from './bal.theme'

addons.setConfig({
  theme: baloiseTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['foundation', 'development', 'css-utilities', 'components'],
  },
})
