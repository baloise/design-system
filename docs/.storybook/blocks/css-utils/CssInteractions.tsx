import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssInteractionsCursor = ({}) => {
  const list = [
    {
      key: 'cursor-auto',
      value: 'auto',
    },
    {
      key: 'cursor-pointer',
      value: 'pointer',
    },
    {
      key: 'cursor-wait',
      value: 'wait',
    },
    {
      key: 'cursor-move',
      value: 'move',
    },
    {
      key: 'cursor-not-allowed',
      value: 'not-allowed',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'cursor'} prefix={''} withoutProperty={true} />
}

export const CssInteractionsUserSelect = ({}) => {
  const list = [
    {
      key: 'select-none',
      value: 'none',
    },
    {
      key: 'select-text',
      value: 'text',
    },
    {
      key: 'select-all',
      value: 'all',
    },
    {
      key: 'select-auto',
      value: 'auto',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'user-select'} prefix={''} withoutProperty={true} />
}
