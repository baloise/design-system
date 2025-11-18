import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff'

export const DiffSource = ({ code }) => {
  SyntaxHighlighter.registerLanguage('diff', diff)
  const [isReady, updateState] = React.useState(false)
  if (isReady) {
    return (
      <div className="sb-unstyled docblock-source">
        <SyntaxHighlighter language="diff">{code}</SyntaxHighlighter>
      </div>
    )
  } else {
    setTimeout(() => updateState(true), 100)
  }
  return <div></div>
}
