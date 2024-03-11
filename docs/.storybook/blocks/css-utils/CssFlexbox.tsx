import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'
import json from '../../../../packages/styles/docs/flex.json'

export const CssFlexboxAlignContent = () => <CssUtilitiesTable list={json} search="align-content" />
export const CssFlexboxAlignItems = () => <CssUtilitiesTable list={json} search="align-items" />
export const CssFlexboxAlignSelf = () => <CssUtilitiesTable list={json} search="align-self" />
export const CssFlexboxDirection = () => <CssUtilitiesTable list={json} search="flex-direction" />
export const CssFlexboxFlex = () => <CssUtilitiesTable list={json} search="flex" />
export const CssFlexboxJustifyContent = () => <CssUtilitiesTable list={json} search="justify-content" />
export const CssFlexboxWrap = () => <CssUtilitiesTable list={json} search="flex-wrap" />

export const CssFlexboxGap = () => (
  <CssUtilitiesTable
    list={json}
    search="gap"
    example={item => <div className={`bg-red`} style={{ height: item.value, width: item.value }}></div>}
  />
)
