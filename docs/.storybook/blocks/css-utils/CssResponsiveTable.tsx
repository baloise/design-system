import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssResponsiveTable = ({ }) => {
  const obj = tokens.breakpoint

  const list = [
    {
      key: '-mobile',
      value: 'from 0',
    },
    {
      key: '-tablet',
      value: `from ${obj.tablet}`,
    },
    {
      key: '-tablet-only',
      value: `from ${obj.tablet} to ${obj.desktop}`,
    },
    {
      key: '-touch',
      value: `to ${obj.desktop}`,
    },
    {
      key: '-desktop',
      value: `from ${obj.desktop}`,
    },
    // {
    //   key: '-high-definition',
    //   value: `from ${obj['high-definition']}`,
    // },
    // {
    //   key: '-widescreen',
    //   value: `from ${obj.widescreen}`,
    // },
    // {
    //   key: '-fullhd',
    //   value: `from ${obj.fullhd}`,
    // },
  ]

  return <CssPropertyTable keyValue={list} property={'width'} prefix={'...'} withoutProperty={true} />
}
