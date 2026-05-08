import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'
import { CssTable } from './helpers/CssTable'

export const CssTypographyColors = (): React.ReactElement => (
  <CssUtilitiesTable
    utility="typography"
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
    utility="typography"
    search="font-family"
    example={item => <div className={`${item.class} p-small font-weight-bold text-medium`}>Aa</div>}
  />
)

export const CssTypographyTextAlign = (): React.ReactElement => (
  <CssUtilitiesTable utility="typography" search="text-align" />
)

export const CssTypographyTextTransform = (): React.ReactElement => (
  <CssUtilitiesTable utility="typography" search="text-transform" />
)

export const CssTypographyWeight = (): React.ReactElement => (
  <CssUtilitiesTable utility="typography" search="font-weight" />
)

export const CssTypographyWhiteSpace = (): React.ReactElement => (
  <CssUtilitiesTable utility="typography" search="white-space" />
)

export const CssTypographySize = (): React.ReactElement => {
  return CssTable({
    tokens: {
      'x-small': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['x-small'].Mobile,
        name: 'ds-text-size-x-small-device',
      },
      'small': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['small'].Mobile,
        name: 'ds-text-size-small-device',
      },
      'normal': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['normal'].Mobile,
        name: 'ds-text-size-normal-device',
      },
      'medium': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['medium'].Mobile,
        name: 'ds-text-size-medium-device',
      },
      'large': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['large'].Mobile,
        name: 'ds-text-size-large-device',
      },
      'x-large': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['x-large'].Mobile,
        name: 'ds-text-size-x-large-device',
      },
      'xx-large': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['xx-large'].Mobile,
        name: 'ds-text-size-xx-large-device',
      },
      'xxx-large': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['xxx-large'].Mobile,
        name: 'ds-text-size-xxx-large-device',
      },
      'xxxx-large': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['xxxx-large'].Mobile,
        name: 'ds-text-size-xxxx-large-device',
      },
      'xxxxx-large': {
        ...tokens['🔗 Alias']['🔤 Text'].Size['xxxxx-large'].Mobile,
        name: 'ds-text-size-xxxxx-large-device',
      },
    },
    css: 'text',
    example: item => <div className={`text-${item.key} font-weight-bold text-align-center p-xx-small`}>Aa</div>,
  })
}
