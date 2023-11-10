import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssSpacingMargin = ({ }) => {
  const obj = tokens.spacing
  const keys = Object.keys(obj)
  const values = Object.values(obj)

  const list = [
    ...keys.map((key, index) => ({
      key: `-${key}`,
      property: 'margin',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `x-${key}`,
      property: 'margin-left, margin-right',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `y-${key}`,
      property: 'margin-top, margin-bottom',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `t-${key}`,
      property: 'margin-top',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `r-${key}`,
      property: 'margin-right',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `b-${key}`,
      property: 'margin-bottom',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `l-${key}`,
      property: 'margin-left',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
  ]

  return <CssPropertyTable keyValue={list} property={''} prefix={'m'} withoutProperty={true} responsive={true} />
}
