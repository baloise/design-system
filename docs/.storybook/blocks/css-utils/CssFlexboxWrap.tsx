import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssFlexboxWrap = ({}) => {
  const list = ['nowrap', 'wrap', 'wrap-reverse']

  return <CssPropertyTable list={list} property={'flex-wrap'} prefix={'is-'} />
}
