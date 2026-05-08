import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssFlexboxAlignContent = () => <CssUtilitiesTable utility="flex" search="align-content" />
export const CssFlexboxAlignItems = () => <CssUtilitiesTable utility="flex" search="align-items" />
export const CssFlexboxAlignSelf = () => <CssUtilitiesTable utility="flex" search="align-self" />
export const CssFlexboxDirection = () => <CssUtilitiesTable utility="flex" search="flex-direction" />
export const CssFlexboxFlex = () => <CssUtilitiesTable utility="flex" search="flex" />
export const CssFlexboxJustifyContent = () => <CssUtilitiesTable utility="flex" search="justify-content" />
export const CssFlexboxWrap = () => <CssUtilitiesTable utility="flex" search="flex-wrap" />

export const CssFlexboxGap = () => (
  <CssUtilitiesTable
    utility="flex"
    search={['gap', 'column-gap', 'row-gap']}
    example={item => <div className={`bg-red`} style={{ height: item.value, width: item.value }}></div>}
  />
)
