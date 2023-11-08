import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss'

export const ScssSource = ({ code }) => {
  SyntaxHighlighter.registerLanguage('scss', scss)
  const [isReady, updateState] = React.useState(false)
  if (isReady) {
    return (
      <div className="sb-unstyled docblock-source">
        <SyntaxHighlighter language="scss">
          {code}
        </SyntaxHighlighter>
      </div>
    )
  } else {
    setTimeout(() => updateState(true), 100)
  }
  return <div></div>
}
