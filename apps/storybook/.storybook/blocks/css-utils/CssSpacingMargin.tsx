import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'

export const CssSpacingMargin = ({}): React.ReactElement => {
  const obj = tokens['🔗 Alias']['↔️ Space']
  const keys = Object.keys(obj)

  const values = keys.map(key => {
    const item = obj[key]
    const responsive = item.$extensions?.['com.helvetia.responsive']
    return {
      key: key.toLowerCase(),
      valueMobile: responsive?.mobile ?? item.$value,
      valueTablet: responsive?.tablet ?? item.$value,
      valueDesktop: responsive?.desktop ?? item.$value,
    }
  })

  const list = [
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `-${key}`,
      property: 'margin',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `x-${key}`,
      property: 'margin',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `y-${key}`,
      property: 'margin',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `t-${key}`,
      property: 'margin',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `r-${key}`,
      property: 'margin',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `b-${key}`,
      property: 'margin',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `l-${key}`,
      property: 'margin',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
  ]

  return <CssPropertyTable keyValue={list} property={''} prefix={'m'} withoutProperty={true} responsive={true} />
}
