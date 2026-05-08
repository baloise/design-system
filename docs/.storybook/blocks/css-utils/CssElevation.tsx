import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssElevationOpacity = () => (
  <CssUtilitiesTable
    utility="elevation"
    search="opacity"
    example={item => <div className={`bg-green ${item.class} p-small`}></div>}
  />
)

export const CssElevationShadow = () => (
  <CssUtilitiesTable
    utility="elevation"
    search={['box-shadow', 'text-shadow']}
    example={item => {
      if (item.property === 'box-shadow') {
        return <div className={`bg-green ${item.class} p-small`}></div>
      }
      return <div className={`font-weight-bold text-large ${item.class} px-small`}>Aa</div>
    }}
  />
)

export const CssElevationZIndex = () => <CssUtilitiesTable utility="elevation" search="z-index" />
