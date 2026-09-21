import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssBackgroundColors = () => (
  <CssUtilitiesTable
    utility="background"
    filter={item => item.class.startsWith('bg-')}
    example={item => <div className={`${item.class} p-sm`}></div>}
  />
)

export const CssTextOnColors = () => (
  <CssUtilitiesTable
    utility="background"
    filter={item => item.class.startsWith('text-on-')}
    example={item => {
      const bgClass = item.class.replace('text-on-', 'bg-')
      return (
        <div className={`${bgClass} p-sm`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className={`${item.class} font-weight-bold text-md`}>Aa</span>
        </div>
      )
    }}
  />
)
