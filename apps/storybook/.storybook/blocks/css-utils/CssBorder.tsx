import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssBorderColors = () => (
  <CssUtilitiesTable
    utility="border-color"
    search={['border', 'border-top', 'border-bottom', 'border-left', 'border-right']}
    example={item => (
      <div className={`p-small ${item.class.includes('white') ? 'bg-primary' : ''}`}>
        <div className={`${item.class} p-small`}></div>
      </div>
    )}
  />
)

export const CssBorderRadius = () => (
  <CssUtilitiesTable utility="border" example={item => <div className={`bg-red ${item.class} p-small`}></div>} />
)
