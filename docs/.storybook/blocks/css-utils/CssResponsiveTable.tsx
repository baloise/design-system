import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssResponsiveTable = ({}) => {
  const obj = tokens.size.breakpoint

  const list = [
    {
      key: '-mobile',
      value: 'from 0',
    },
    {
      key: '-tablet',
      value: `from ${obj.tablet.value}`,
    },
    {
      key: '-tablet-only',
      value: `from ${obj.tablet.value} to ${obj.desktop.value}`,
    },
    {
      key: '-touch',
      value: `to ${obj.desktop.value}`,
    },
    {
      key: '-desktop',
      value: `from ${obj.desktop.value}`,
    },
    // {
    //   key: '-high-definition',
    //   value: `from ${obj['high-definition']}`,
    // },
    {
      key: '-widescreen',
      value: `from ${obj.widescreen.value}`,
    },
    // {
    //   key: '-fullhd',
    //   value: `from ${obj.fullhd}`,
    // },
  ]

  return <CssPropertyTable keyValue={list} property={'width'} prefix={'...'} withoutProperty={true} />
}
