import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'
import json from '../../../../packages/styles/docs/typography.json'
import tokens from '@baloise/ds-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssTypographyColors = () => (
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

export const CssTypographyFamily = () => (
  <CssUtilitiesTable
    list={json}
    search="font-family"
    example={item => <div className={`${item.class} p-small font-weight-bold text-medium`}>Aa</div>}
  />
)

export const CssTypographyTextAlign = () => <CssUtilitiesTable list={json} search="text-align" />

export const CssTypographyTextTransform = () => <CssUtilitiesTable list={json} search="text-transform" />

export const CssTypographyWeight = () => <CssUtilitiesTable list={json} search="font-weight" />

export const CssTypographyWhiteSpace = () => <CssUtilitiesTable list={json} search="white-space" />

export const CssTypographySize = ({}) => {
  return CssTable({
    tokens: {
      'x-small': tokens.size.text.size['x-small'].desktop,
      'small': tokens.size.text.size['small'].desktop,
      'normal': tokens.size.text.size['normal'].desktop,
      'medium': tokens.size.text.size['medium'].desktop,
      'large': tokens.size.text.size['large'].desktop,
      'x-large': tokens.size.text.size['x-large'].desktop,
      'xx-large': tokens.size.text.size['xx-large'].desktop,
      'xxx-large': tokens.size.text.size['xxx-large'].desktop,
      'xxxx-large': tokens.size.text.size['xxxx-large'].desktop,
      'xxxxx-large': tokens.size.text.size['xxxxx-large'].desktop,
    },
    css: 'text',
    example: item => <div className={`text-${item.key} font-weight-bold text-align-center p-xx-small`}>Aa</div>,
  })
}
