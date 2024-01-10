import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssFlexboxAlignItems = ({}) => {
  const list = [
    {
      key: 'start',
      value: 'flex-start',
    },
    {
      key: 'end',
      value: 'flex-end',
    },
    {
      key: 'center',
      value: 'center',
    },
    {
      key: 'stretch',
      value: 'stretch',
    },
    {
      key: 'baseline',
      value: 'baseline',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'align-items'} prefix={''} />
}
