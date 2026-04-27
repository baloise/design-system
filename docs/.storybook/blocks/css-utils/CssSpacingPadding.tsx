import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssSpacingPadding = ({}): React.ReactElement => {
  const obj = tokens['🏷️ Semantic']['↔️ Space']
  const keys = Object.keys(obj)

  const values = keys.map(key => ({
    key,
    valueMobile: obj[key].Mobile.$value,
    valueTablet: obj[key].Tablet.$value,
    valueDesktop: obj[key].Desktop.$value,
  }))

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
