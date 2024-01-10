import React from 'react'
import { Source } from '@storybook/addon-docs'

export const Code = ({ code, preview, language, border = false, noPreview = undefined }) => {

  if (!['html'].includes((language || 'html').toLowerCase()) && noPreview === undefined) {
    noPreview = true as any
  }

  return (
    <section className={`sb-unstyled  ${noPreview === true ? 'doc-code-no-preview' : 'doc-code'}`}>
      <div
        className={`${
          noPreview === true ? 'hidden ' : ''
        }p-medium radius-top-normal ${
          border ? 'border-grey' : 'bg-grey-2'
        }`}
        dangerouslySetInnerHTML={{ __html: preview || code }}
      ></div>
      <div
        style={{ marginTop: noPreview === true ? '0px' : '-24px' }}
        className={`${noPreview === true ? 'radius-normal' : ''}`}
      >
        <Source dark language={language || 'html'} code={code} />
      </div>
    </section>
  )
}
