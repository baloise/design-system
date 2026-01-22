import tokens from '@baloise/ds-tokens/dist/tokens.docs.json'
import React from 'react'
import json from '../../../../packages/styles/docs/typography.json'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'
import { CssTable } from './helpers/CssTable'

export const CssTypographyColors = (): React.ReactElement => (
  <CssUtilitiesTable
    list={json}
    search="color"
    example={item => {
      if (item.class.includes('inverted') || item.class.includes('white')) {
        return <div className={`${item.class} bg-primary p-small font-weight-bold text-medium`}>Aa</div>
      }
      return <div className={`${item.class} p-small font-weight-bold text-medium`}>Aa</div>
    }}
  />
)

export const CssTypographyFamily = (): React.ReactElement => (
  <CssUtilitiesTable
    list={json}
    search="font-family"
    example={item => <div className={`${item.class} p-small font-weight-bold text-medium`}>Aa</div>}
  />
)

export const CssTypographyTextAlign = (): React.ReactElement => <CssUtilitiesTable list={json} search="text-align" />

export const CssTypographyTextTransform = (): React.ReactElement => (
  <CssUtilitiesTable list={json} search="text-transform" />
)

export const CssTypographyWeight = (): React.ReactElement => <CssUtilitiesTable list={json} search="font-weight" />

export const CssTypographyWhiteSpace = (): React.ReactElement => <CssUtilitiesTable list={json} search="white-space" />

export const CssTypographySize = (): React.ReactElement => {
  return CssTable({
    tokens: {
      'x-small': tokens.text.size['x-small'].desktop,
      'small': tokens.text.size['small'].desktop,
      'normal': tokens.text.size['normal'].desktop,
      'medium': tokens.text.size['medium'].desktop,
      'large': tokens.text.size['large'].desktop,
      'x-large': tokens.text.size['x-large'].desktop,
      'xx-large': tokens.text.size['xx-large'].desktop,
      'xxx-large': tokens.text.size['xxx-large'].desktop,
      'xxxx-large': tokens.text.size['xxxx-large'].desktop,
      'xxxxx-large': tokens.text.size['xxxxx-large'].desktop,
    },
    css: 'text',
    example: item => <div className={`text-${item.key} font-weight-bold text-align-center p-xx-small`}>Aa</div>,
  })
}
