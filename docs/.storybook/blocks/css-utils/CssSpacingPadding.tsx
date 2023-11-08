import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssSpacingPadding = ({}) => {
  const obj = tokens.spacing
  const keys = Object.keys(obj)
  const values = Object.values(obj)

  const list = [
    ...keys.map((key, index) => ({
      key: `-${key}`,
      property: 'padding',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `x-${key}`,
      property: 'padding-left, padding-right',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `y-${key}`,
      property: 'padding-top, padding-bottom',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `t-${key}`,
      property: 'padding-top',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `r-${key}`,
      property: 'padding-right',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `b-${key}`,
      property: 'padding-bottom',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
    ...keys.map((key, index) => ({
      key: `l-${key}`,
      property: 'padding-left',
      valueMobile: values[index].mobile,
      valueTablet: values[index].tablet,
      valueDesktop: values[index].desktop,
    })),
  ]

  return <CssPropertyTable keyValue={list} property={''} prefix={'p'} withoutProperty={true} responsive={true} />
}
