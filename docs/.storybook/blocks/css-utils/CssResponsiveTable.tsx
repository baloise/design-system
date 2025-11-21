import tokens from '@baloise/ds-tokens/dist/tokens.docs.json'
import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssResponsiveTable = ({ all = false }): React.ReactElement => {
  const obj = tokens.breakpoint

  const list = [
    {
      key: 'mobile:',
      value: 'from 0',
    },
    {
      key: 'tablet:',
      value: `from ${obj.tablet.$value}`,
    },
    all
      ? {
          key: 'touch:',
          value: `to ${obj.desktop.$value}`,
        }
      : false,
    {
      key: 'desktop:',
      value: `from ${obj.desktop.$value}`,
    },
    all
      ? {
          key: 'high-definition:',
          value: `from ${obj['high-definition'].$value}`,
        }
      : false,
    {
      key: 'widescreen:',
      value: `from ${obj.widescreen.$value}`,
    },
    all
      ? {
          key: 'fullhd:',
          value: `from ${obj.fullhd.$value}`,
        }
      : false,
  ].filter(item => item)

  return <CssPropertyTable keyValue={list} property={'width'} prefix={''} withoutProperty={true} />
}
