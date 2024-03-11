import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'
import json from '../../../../packages/styles/docs/border.json'

export const CssBorderColors = () => (
  <CssUtilitiesTable
    list={json}
    search="border-color"
    example={item => <div className={`${item.class} p-small`}></div>}
  />
)

export const CssBorderRadius = () => (
  <CssUtilitiesTable
    list={json}
    search="border-radius"
    example={item => <div className={`bg-green ${item.class} p-small`}></div>}
  />
)

export const CssBorderWidth = () => (
  <CssUtilitiesTable
    list={json}
    search="border-width"
    example={item => <div className={`border-primary p-small ${item.class}`}></div>}
  />
)
