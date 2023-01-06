import React from 'react'

import { addons, types } from '@storybook/addons'
import { version } from '../../../package.json'

addons.register('my/toolbar', () => {
  addons.add('my-toolbar-addon/toolbar', {
    title: 'Version badge',
    type: types.TOOL,
    type: types.TOOLEXTRA,
    //👇 Shows the Toolbar UI element if either the Canvas or Docs tab is active
    // match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ({ active }) => {
      return (
        <a className="my-version" href='?path=/docs/changelog--page'>
          <span className="my-version__label">Latest:</span>
          {version}
        </a>
      )
    },
  })
})
