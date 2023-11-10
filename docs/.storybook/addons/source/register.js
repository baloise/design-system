import React from 'react'

import { addons, types } from '@storybook/addons'
import { useParameter } from '@storybook/api'
import { AddonPanel } from '@storybook/components'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const PARAM_KEY = 'mySource'
const ADDON_ID = 'mysource'
const PANEL_ID = `${ADDON_ID}/panel`

export const Panel = (props) => {
  const value = useParameter(PARAM_KEY, null)

  if (!value) {
    return (
      <AddonPanel {...props}>
        <div style={{ margin: '16px' }}>
          <p>No source code available</p>
        </div>
      </AddonPanel>
    )
  }

  return (
    <AddonPanel {...props}>
      <div className="my-source-code">
        <SyntaxHighlighter language="html" style={atomDark} wrapLongLines={true} wrapLines={true}>
          {value}
        </SyntaxHighlighter>
      </div>
    </AddonPanel>
  );
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Source',
    render: Panel,
  })
})
