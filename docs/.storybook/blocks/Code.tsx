import React from 'react'
import { Source } from '@storybook/addon-docs'

export const Code = ({ code, preview, language }) => {
  return (
    <section className="sb-unstyled doc-code">
      <div
        className="p-medium has-radius-top-left-normal has-radius-top-right-normal has-background-grey-2"
        dangerouslySetInnerHTML={{ __html: preview || code }}
      ></div>
      <div style={{ marginTop: '-24px' }}>
        <Source dark language={language || 'html'} code={code} />
      </div>
    </section>
  )
}
