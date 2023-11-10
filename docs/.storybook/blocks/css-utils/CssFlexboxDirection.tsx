import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssFlexboxDirection = ({}) => {
  const list = ['row', 'row-reverse', 'column', 'column-reverse']

  return <CssPropertyTable list={list} property={'flex-direction'} prefix={'is-'} />
}
