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

// Some responsive dimension entries are style-dictionary objects ({ value, unit })
// instead of pre-formatted strings — normalize both shapes for display.
function formatSizeValue(value: unknown): string | undefined {
  if (value && typeof value === 'object') {
    const { value: num, unit } = value as { value: number; unit: string }
    return `${num}${unit}`
  }
  return value as string | undefined
}

export const CssTypographySize = (): React.ReactElement => {
  const sizeCategory = tokens['📱 Device']['🔤 Text'].Size

  const sizeTokens = Object.fromEntries(
    Object.keys(sizeCategory).map(key => {
      const size = key.toLowerCase()
      const item = sizeCategory[key]
      const responsive = item.$extensions?.['com.helvetia.responsive']
      return [
        size,
        {
          name: `ds-device-text-size-${size}`,
          $value: formatSizeValue(responsive?.mobile) ?? item.$value,
        },
      ]
    }),
  )

  return CssTable({
    tokens: sizeTokens,
    css: 'text',
    example: item => <div className={`text-${item.key} font-weight-bold text-align-center p-xx-small`}>Aa</div>,
  })
}
