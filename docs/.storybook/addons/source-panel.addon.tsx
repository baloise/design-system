import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { AddonPanel } from 'storybook/internal/components'
import { useParameter } from 'storybook/manager-api'

type PanelProps = {
  active: boolean
  key: string
}

export const SourcePanel: React.FC<PanelProps> = props => {
  const value = useParameter('mySource', null)

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
  )
}
