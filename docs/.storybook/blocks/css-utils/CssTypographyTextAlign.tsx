import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssTypographyTextAlign = ({}) => {
  const list = [
    { key: 'text-align-center', value: 'center' },
    { key: 'text-align-justify', value: 'justify' },
    { key: 'text-align-left', value: 'left' },
    { key: 'text-align-right', value: 'right' },
  ]

  return <CssPropertyTable keyValue={list} withoutProperty={true} property={'text-align'} prefix={''} />
}
