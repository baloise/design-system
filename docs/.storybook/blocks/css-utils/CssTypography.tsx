import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
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
      'x-small': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['x-small'].Mobile,
        name: 'bal-text-size-x-small-device',
      },
      'small': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['small'].Mobile,
        name: 'bal-text-size-small-device',
      },
      'normal': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['normal'].Mobile,
        name: 'bal-text-size-normal-device',
      },
      'medium': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['medium'].Mobile,
        name: 'bal-text-size-medium-device',
      },
      'large': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['large'].Mobile,
        name: 'bal-text-size-large-device',
      },
      'x-large': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['x-large'].Mobile,
        name: 'bal-text-size-x-large-device',
      },
      'xx-large': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['xx-large'].Mobile,
        name: 'bal-text-size-xx-large-device',
      },
      'xxx-large': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['xxx-large'].Mobile,
        name: 'bal-text-size-xxx-large-device',
      },
      'xxxx-large': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['xxxx-large'].Mobile,
        name: 'bal-text-size-xxxx-large-device',
      },
      'xxxxx-large': {
        ...tokens['🏷️ Semantic']['🔤 Text'].Size['xxxxx-large'].Mobile,
        name: 'bal-text-size-xxxxx-large-device',
      },
    },
    css: 'text',
    example: item => <div className={`text-${item.key} font-weight-bold text-align-center p-xx-small`}>Aa</div>,
  })
}
