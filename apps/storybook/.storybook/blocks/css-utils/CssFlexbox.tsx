import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssFlexboxAlignContent = () => <CssUtilitiesTable utility="flex" search="align-content" value />
export const CssFlexboxAlignItems = () => <CssUtilitiesTable utility="flex" search="align-items" value />
export const CssFlexboxAlignSelf = () => <CssUtilitiesTable utility="flex" search="align-self" value />
export const CssFlexboxDirection = () => <CssUtilitiesTable utility="flex" search="flex-direction" value />
export const CssFlexboxFlex = () => <CssUtilitiesTable utility="flex" search="flex" value />
export const CssFlexboxJustifyContent = () => <CssUtilitiesTable utility="flex" search="justify-content" value />
export const CssFlexboxWrap = () => <CssUtilitiesTable utility="flex" search="flex-wrap" value />

export const CssFlexboxGap = () => (
  <CssUtilitiesTable
    utility="flex"
    search={['gap', 'column-gap', 'row-gap']}
    example={item => <div className={`bg-red`} style={{ height: item.value, width: item.value }}></div>}
  />
)
