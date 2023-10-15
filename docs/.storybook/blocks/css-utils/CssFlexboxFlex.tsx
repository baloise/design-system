import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssFlexboxFlex = ({}) => {
  const list = [
    {
      key: '1',
      value: '1 1 0%',
    },
    {
      key: 'auto',
      value: '1 1 auto',
    },
    {
      key: 'initial',
      value: '0 1 auto',
    },
    {
      key: 'none',
      value: 'none',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'flex'} prefix={'is-'} />
}
