import React from 'react'

import { addons, types } from '@storybook/addons'
import { useParameter } from '@storybook/api'
import { AddonPanel } from '@storybook/components'

const PARAM_KEY = 'vueSource'
const ADDON_ID = 'vuesource'
const PANEL_ID = `${ADDON_ID}/panel`

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// give a unique name for the panel
const MyPanel = () => {
  const value = useParameter(PARAM_KEY, null)
  if (!value) {
    return (
      <div style={{ margin: '16px' }}>
        <p>No source code available</p>
      </div>
    )
  }

  return (
    <div className="my-source-code">
      <SyntaxHighlighter language="html" style={atomDark} wrapLongLines={true} wrapLines={true}>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

addons.register(ADDON_ID, api => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Vue',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <MyPanel />
      </AddonPanel>
    ),
  })
})
