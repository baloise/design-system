import { DOCS_PREPARED, DOCS_RENDERED, STORY_PREPARED, STORY_RENDERED } from 'storybook/internal/core-events'
import { addons, types } from 'storybook/manager-api'
import { registerCookie } from './addons/cookie.addon'
import { registerFramework } from './addons/framework.addon'
import { SourcePanel } from './addons/source-panel.addon'
import { registerVersion } from './addons/version.addon'
import baloiseTheme from './bal.theme'

addons.setConfig({
  theme: baloiseTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['foundation', 'development', 'css-utilities', 'components', 'tokens'],
  },
})

addons.register('my/cookie', () => registerCookie())

addons.register('my/framework', () => {
  addons.add('my-framework-addon/toolbar', {
    title: 'Framework',
    type: types.TOOLEXTRA,
    render: registerFramework as any,
  })
})

addons.register('my/toolbar', () => {
  addons.add('my-toolbar-addon/toolbar', {
    title: 'Version badge',
    type: types.TOOLEXTRA,
    render: registerVersion as any,
  })
})

addons.register('my/source', () => {
  addons.add('my-source-addon/panel', {
    type: types.PANEL,
    title: 'Source',
    render: SourcePanel as any,
  })
})

addons.register('my/title', api => {
  api.on(STORY_PREPARED, () => {
    const storyData = api.getCurrentStoryData()
    if (storyData) {
      document.title = `${storyData.title.split('/').pop()} • Helvetia Design System`
    }
  })
  api.on(STORY_RENDERED, () => {
    const storyData = api.getCurrentStoryData()
    if (storyData) {
      document.title = `${storyData.title.split('/').pop()} • Helvetia Design System`
    }
  })
  api.on(DOCS_PREPARED, () => {
    const storyData = api.getCurrentStoryData()
    if (storyData) {
      if (storyData.title === 'Welcome' || storyData.title === 'Design System') {
        document.title = `Helvetia Design System`
      } else {
        document.title = `${storyData.title.split('/').pop()} • Helvetia Design System`
      }
    }
  })
  api.on(DOCS_RENDERED, () => {
    const storyData = api.getCurrentStoryData()
    if (storyData) {
      if (storyData.title === 'Welcome' || storyData.title === 'Design System') {
        document.title = `Helvetia Design System`
      } else {
        document.title = `${storyData.title.split('/').pop()} • Helvetia Design System`
      }
    }
  })
})
