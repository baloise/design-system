import React from 'react'
import { Source } from '@storybook/addon-docs'

export const Code = ({ code, preview, language, border = false, noPreview = false }) => {
  return (
    <section className={`sb-unstyled  ${noPreview === true ? 'doc-code-no-preview' : 'doc-code'}`}>
      <div
        className={`${
          noPreview === true ? 'is-hidden ' : ''
        }p-medium has-radius-top-left-normal has-radius-top-right-normal ${
          border ? 'has-border-grey' : 'has-background-grey-2'
        }`}
        dangerouslySetInnerHTML={{ __html: preview || code }}
      ></div>
      <div
        style={{ marginTop: noPreview === true ? '0px' : '-24px' }}
        className={`${noPreview === true ? 'has-radius-normal' : ''}`}
      >
        <Source dark language={language || 'html'} code={code} />
      </div>
    </section>
  )
}
