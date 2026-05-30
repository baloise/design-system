import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssResponsiveTable = ({ all = false }): React.ReactElement => {
  const obj = tokens['🔗 Alias']['📐 Breakpoint']

  const list = [
    {
      key: 'mobile:',
      value: 'from 0',
    },
    {
      key: 'tablet:',
      value: `from ${obj.Tablet.$value}`,
    },
    all
      ? {
          key: 'touch:',
          value: `to ${obj.Desktop.$value}`,
        }
      : false,
    {
      key: 'desktop:',
      value: `from ${obj.Desktop.$value}`,
    },
    all
      ? {
          key: 'high-definition:',
          value: `from ${obj.DesktopLG.$value}`,
        }
      : false,
    {
      key: 'widescreen:',
      value: `from ${obj.DesktopXL.$value}`,
    },
    all
      ? {
          key: 'fullhd:',
          value: `from ${obj.Desktop2XL.$value}`,
        }
      : false,
  ].filter(item => item)

  return <CssPropertyTable keyValue={list} property={'width'} prefix={''} withoutProperty={true} />
}
