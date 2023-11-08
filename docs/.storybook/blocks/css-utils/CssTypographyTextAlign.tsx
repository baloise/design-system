import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssTypographyTextAlign = ({}) => {
  const list = [
    { key: 'text-centered', value: 'center' },
    { key: 'text-justified', value: 'justify' },
    { key: 'text-left', value: 'left' },
    { key: 'text-right', value: 'right' },
  ]

  return <CssPropertyTable keyValue={list} withoutProperty={true} property={'text-align'} prefix={'has-'} />
}
