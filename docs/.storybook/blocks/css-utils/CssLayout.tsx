import React from 'react'
import { CssTable } from './helpers/CssTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import json from '../../../../packages/styles/docs/layout.json'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssLayoutContainer = ({}) => {
  return CssTable({
    tokens: tokens.size.container.size,
    css: 'container is',
  })
}

export const CssLayoutDisplay = () => (
  <CssUtilitiesTable
    list={json}
    search="display"
    example={item => <div className={`bg-green ${item.class} p-small`}></div>}
  />
)

export const CssLayoutOverflow = () => <CssUtilitiesTable list={json} search="overflow" />
export const CssLayoutPosition = () => <CssUtilitiesTable list={json} search="position" />
export const CssLayoutPlacement = () => <CssUtilitiesTable list={json} search={['top', 'right', 'bottom', 'left']} />
export const CssLayoutZIndex = () => <CssUtilitiesTable list={json} search="z-index" />
export const CssLayoutVerticalAlign = () => <CssUtilitiesTable list={json} search="vertical-align" />
