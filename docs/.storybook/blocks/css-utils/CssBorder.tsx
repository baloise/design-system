import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssBorderColors = () => (
  <CssUtilitiesTable
    utility="border-color"
    search={['border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color']}
    example={item => <div className={`${item.class} p-small`}></div>}
  />
)

export const CssBorderRadius = () => (
  <CssUtilitiesTable utility="border" example={item => <div className={`bg-green ${item.class} p-small`}></div>} />
)

export const CssBorderWidth = () => (
  <CssUtilitiesTable
    utility="border-color"
    search={['border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width']}
    filter={item => !Array.isArray(item.property)}
    example={item => <div className={`border-primary p-small ${item.class}`}></div>}
  />
)
