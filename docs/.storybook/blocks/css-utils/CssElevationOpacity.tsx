import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssElevationOpacity = ({}) => {
  const list = [
    { key: '0', value: '0' },
    { key: '30', value: '0.3' },
    { key: '40', value: '0.4' },
    { key: '50', value: '0.5' },
    { key: '60', value: '0.6' },
    { key: '80', value: '0.8' },
    { key: '100', value: '1' },
  ]

  return <CssPropertyTable keyValue={list} property={'opacity'} prefix={'has-'} />
}
