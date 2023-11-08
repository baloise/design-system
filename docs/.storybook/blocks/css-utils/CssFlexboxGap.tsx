import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssFlexboxGap = ({}) => {
  const obj = tokens.spacing
  const keys = Object.keys(obj)
  const values = Object.values(obj)

  const list = keys.map((key, index) => ({
    key,
    value: values[index].mobile,
  }))

  return <CssPropertyTable keyValue={list} property={'gap'} prefix={'fg-'} withoutProperty={true} />
}
