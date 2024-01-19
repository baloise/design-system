import React from 'react'
import json from '../../../../packages/styles/docs/elevation.json'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssElevationOpacity = () => (
  <CssUtilitiesTable
    list={json}
    search="opacity"
    example={item => <div className={`bg-green ${item.class} p-small`}></div>}
  />
)

export const CssElevationShadow = () => (
  <CssUtilitiesTable
    list={json}
    search={['box-shadow', 'text-shadow']}
    example={item => <div className={`bg-green ${item.class} p-small`}></div>}
  />
)

