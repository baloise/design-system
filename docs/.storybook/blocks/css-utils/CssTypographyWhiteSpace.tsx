import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssTypographyWhiteSpace = ({}) => {
  const list = [
    { key: 'normal', value: 'normal' },
    { key: 'nowrap', value: 'nowrap' },
  ]

  return <CssPropertyTable keyValue={list} property={'white-space'} prefix={''} />
}
