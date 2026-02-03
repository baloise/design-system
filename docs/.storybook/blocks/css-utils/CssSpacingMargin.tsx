import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'

export const CssSpacingMargin = ({}): React.ReactElement => {
  const obj = tokens.space
  const keys = Object.keys(obj).filter(k => obj[k] && obj[k].mobile.$value)

  const values = keys.map(key => ({
    key,
    valueMobile: obj[key].mobile.$value,
    valueTablet: obj[key].tablet.$value,
    valueDesktop: obj[key].desktop.$value,
  }))

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
