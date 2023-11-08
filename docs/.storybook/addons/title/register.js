import { addons } from '@storybook/addons'
import { STORY_RENDERED, DOCS_RENDERED, STORY_PREPARED, DOCS_PREPARED } from '@storybook/core-events'

addons.register('my/title', api => {
  api.on(STORY_PREPARED, story => {
    const storyData = api.getCurrentStoryData()
    if (storyData) {
      document.title = `${storyData.title.split('/').pop()} • Baloise Design System`
    }
  })
  api.on(STORY_RENDERED, story => {
    const storyData = api.getCurrentStoryData()
    if (storyData) {
      document.title = `${storyData.title.split('/').pop()} • Baloise Design System`
    }
  })
  api.on(DOCS_PREPARED, story => {
    const storyData = api.getCurrentStoryData()
    if (storyData) {
      if (storyData.title === 'Welcome' || storyData.title === 'Design System') {
        document.title = `Baloise Design System`
      } else {
        document.title = `${storyData.title.split('/').pop()} • Baloise Design System`
      }
    }
  })
  api.on(DOCS_RENDERED, story => {
    const storyData = api.getCurrentStoryData()
    if (storyData) {
      if (storyData.title === 'Welcome' || storyData.title === 'Design System') {
        document.title = `Baloise Design System`
      } else {
        document.title = `${storyData.title.split('/').pop()} • Baloise Design System`
      }
    }
  })
})
