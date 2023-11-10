import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssGridSystem = ({}) => {
  const list = [
    {
      key: 'start',
      value: 'flex-start',
    },
    {
      key: 'end',
      value: 'flex-end',
    },
    {
      key: 'center',
      value: 'center',
    },
    {
      key: 'space-between',
      value: 'space-between',
    },
    {
      key: 'space-around',
      value: 'space-around',
    },
    {
      key: 'space-evenly',
      value: 'space-evenly',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'align-content'} prefix={'is-'} />
}
