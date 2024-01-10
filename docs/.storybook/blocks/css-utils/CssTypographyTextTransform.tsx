import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssTypographyTextTransform = ({}) => {
  const list = [
    { key: 'capitalized', value: 'capitalized' },
    { key: 'lowercase', value: 'lowercase' },
    { key: 'uppercase', value: 'uppercase' },
  ]

  return <CssPropertyTable keyValue={list} withoutProperty={true} property={'text-transform'} prefix={''} />
}
