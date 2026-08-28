import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssSpacingPadding = ({}): React.ReactElement => {
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
      property: 'padding',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `x-${key}`,
      property: 'padding',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `y-${key}`,
      property: 'padding',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `t-${key}`,
      property: 'padding',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `r-${key}`,
      property: 'padding',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `b-${key}`,
      property: 'padding',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
    ...values.map(({ key, valueMobile, valueTablet, valueDesktop }) => ({
      key: `l-${key}`,
      property: 'padding',
      valueMobile,
      valueTablet,
      valueDesktop,
    })),
  ]

  return <CssPropertyTable keyValue={list} property={''} prefix={'p'} withoutProperty={true} responsive={true} />
}
