import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssSpacingMargin = ({}) => {
  const obj = tokens.size.space
  const keys = Object.keys(obj).filter(k => obj[k] && obj[k].value)

  const list = [
    ...keys.map(key => ({
      key: `-${key}`,
      property: 'margin',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `x-${key}`,
      property: 'margin-left, margin-right',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `y-${key}`,
      property: 'margin-top, margin-bottom',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `t-${key}`,
      property: 'margin-top',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `r-${key}`,
      property: 'margin-right',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `b-${key}`,
      property: 'margin-bottom',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
    ...keys.map(key => ({
      key: `l-${key}`,
      property: 'margin-left',
      valueMobile: obj[key].value,
      valueTablet: obj.tablet[key]?.value || obj[key].value,
      valueDesktop: obj.desktop[key]?.value || obj.tablet[key]?.value || obj[key].value,
    })),
  ]

  return <CssPropertyTable keyValue={list} property={''} prefix={'m'} withoutProperty={true} responsive={true} />
}
