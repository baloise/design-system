import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssBorderColors = () => (
  <CssUtilitiesTable
    utility="border-color"
    search={['border-top-color', 'border-color']}
    example={item => <div className={`${item.class} p-small`}></div>}
  />
)

export const CssBorderRadius = () => (
  <CssUtilitiesTable utility="border" example={item => <div className={`bg-green ${item.class} p-small`}></div>} />
)

export const CssBorderWidth = () => (
  <CssUtilitiesTable
    utility="border-color"
    search={['border-width', 'border-top-width']}
    example={item => <div className={`border-primary p-small ${item.class}`}></div>}
  />
)
