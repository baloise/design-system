import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssElevationShadow = ({}) => {
  const objBox = tokens.shadow.box
  const objText = tokens.shadow.text

  const list = [
    {
      key: 'shadow-none',
      property: 'box-shadow',
      value: objBox.none.value,
    },
    {
      key: 'shadow-normal',
      property: 'box-shadow',
      value: objBox.normal.value,
    },
    {
      key: 'shadow-large',
      property: 'box-shadow',
      value: objBox.large.value,
    },
    {
      key: 'text-shadow-none',
      property: 'text-shadow',
      value: objText.none.value,
    },
    {
      key: 'text-shadow-normal',
      property: 'text-shadow',
      value: objText.normal.value,
    },
  ]

  return <CssPropertyTable keyValue={list} withoutProperty={true} prefix={'has-'} />
}
