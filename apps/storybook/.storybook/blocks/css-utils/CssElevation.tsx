import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssElevationOpacity = () => (
  <CssUtilitiesTable
    utility="elevation"
    search="opacity"
    example={item => <div className={`bg-red ${item.class} p-sm`}></div>}
  />
)

export const CssElevationShadow = () => (
  <CssUtilitiesTable
    utility="elevation"
    search={['box-shadow', 'text-shadow']}
    example={item => {
      if (item.property === 'box-shadow') {
        return <div className={`bg-red ${item.class} p-sm`}></div>
      }
      return <div className={`font-weight-bold text-lg ${item.class} px-sm`}>Aa</div>
    }}
  />
)

export const CssElevationZIndex = () => (
  <CssUtilitiesTable
    utility="elevation"
    search="z-index"
    example={item => <pre className="doc-table-pre text-sm">{item.value}</pre>}
  />
)
