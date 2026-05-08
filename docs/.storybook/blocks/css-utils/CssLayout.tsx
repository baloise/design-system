import React from 'react'
import { CssTable } from './helpers/CssTable'
import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssLayoutContainer = ({}) => {
  return CssTable({
    tokens: tokens['🔗 Alias']['🗃️ Container'].Width,
    css: 'container is',
  })
}

export const CssLayoutDisplay = () => (
  <CssUtilitiesTable
    utility="layout"
    search="display"
    example={item => <div className={`bg-green ${item.class} p-small`}></div>}
  />
)

export const CssLayoutOverflow = () => (
  <CssUtilitiesTable utility="layout" search={['overflow', 'overflow-x', 'overflow-y']} />
)
export const CssLayoutPosition = () => <CssUtilitiesTable utility="layout" search="position" />
export const CssLayoutPlacement = () => (
  <CssUtilitiesTable utility="layout" search={['top', 'right', 'bottom', 'left']} />
)
export const CssLayoutVerticalAlign = () => <CssUtilitiesTable utility="layout" search="vertical-align" />
