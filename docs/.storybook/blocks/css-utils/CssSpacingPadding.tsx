import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssSpacingPadding = ({}) => {
  const obj = tokens.size.space
  const keys = Object.keys(obj).filter(k => obj[k] && obj[k].value)


  const list = [
    ...keys.map(key => ({
      key: `-${key}`,
      property: 'padding',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `x-${key}`,
      property: 'padding-left, padding-right',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `y-${key}`,
      property: 'padding-top, padding-bottom',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `t-${key}`,
      property: 'padding-top',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `r-${key}`,
      property: 'padding-right',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `b-${key}`,
      property: 'padding-bottom',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `l-${key}`,
      property: 'padding-left',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
  ]

  return <CssPropertyTable keyValue={list} property={''} prefix={'p'} withoutProperty={true} responsive={true} />
}
