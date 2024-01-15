import React from 'react'
import { CssPropertyTable } from './helpers/CssPropertyTable'

export const CssSizingHeight = ({}) => {
  const fixedWidth = [
    '1rem',
    '2rem',
    '3rem',
    '4rem',
    '5rem',
    '6rem',
    '7rem',
    '8rem',
    '9rem',
    '10rem',
    '11rem',
    '12rem',
    '13rem',
    '14rem',
    '15rem',
    '16rem',
    '17rem',
    '18rem',
    '19rem',
    '20rem',
    '21rem',
    '22rem',
    '23rem',
    '24rem',
    '25rem',
    '26rem',
    '27rem',
    '28rem',
    '29rem',
    '30rem',
  ]
  const list = [
    {
      key: 'full',
      value: '100%',
    },
    {
      key: 'screen',
      value: '100vh',
    },
    {
      key: 'auto',
      value: 'auto',
    },
    {
      key: 'min',
      value: 'min-content',
    },
    {
      key: 'max',
      value: 'max-content',
    },
    {
      key: 'fit',
      value: 'fit-content',
    },
    ...fixedWidth.map(value => ({ key: value, value })),
  ]

  return <CssPropertyTable keyValue={list} property={'height'} prefix={'h-'} withoutProperty={true} />
}

export const CssSizingMinHeight = ({}) => {
  const list = [
    {
      key: '0',
      value: '0px',
    },
    {
      key: 'full',
      value: '100%',
    },
    {
      key: 'screen',
      value: '100vh',
    },
    {
      key: 'auto',
      value: 'auto',
    },
    {
      key: 'min',
      value: 'min-content',
    },
    {
      key: 'max',
      value: 'max-content',
    },
    {
      key: 'fit',
      value: 'fit-content',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'min-height'} prefix={'min-h-'} withoutProperty={true} />
}

export const CssSizingMaxHeight = ({}) => {
  const list = [
    {
      key: '0',
      value: '0px',
    },
    {
      key: 'full',
      value: '100%',
    },
    {
      key: 'screen',
      value: '100vh',
    },
    {
      key: 'auto',
      value: 'auto',
    },
    {
      key: 'min',
      value: 'min-content',
    },
    {
      key: 'max',
      value: 'max-content',
    },
    {
      key: 'fit',
      value: 'fit-content',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'max-height'} prefix={'max-h-'} withoutProperty={true} />
}

export const CssSizingWidth = ({}) => {
  const fixedWidth = [
    '1rem',
    '2rem',
    '3rem',
    '4rem',
    '5rem',
    '6rem',
    '7rem',
    '8rem',
    '9rem',
    '10rem',
    '11rem',
    '12rem',
    '13rem',
    '14rem',
    '15rem',
    '16rem',
    '17rem',
    '18rem',
    '19rem',
    '20rem',
    '21rem',
    '22rem',
    '23rem',
    '24rem',
    '25rem',
    '26rem',
    '27rem',
    '28rem',
    '29rem',
    '30rem',
  ]
  const list = [
    {
      key: 'full',
      value: '100%',
    },
    {
      key: 'screen',
      value: '100wh',
    },
    {
      key: 'auto',
      value: 'auto',
    },
    {
      key: 'min',
      value: 'min-content',
    },
    {
      key: 'max',
      value: 'max-content',
    },
    {
      key: 'fit',
      value: 'fit-content',
    },
    {
      key: '1',
      value: '8.3333%',
    },
    {
      key: '2',
      value: '16.6667%',
    },
    {
      key: '3',
      value: '25%',
    },
    {
      key: '4',
      value: '33.3333%',
    },
    {
      key: '5',
      value: '41.6667%',
    },
    {
      key: '6',
      value: '50%',
    },
    {
      key: '7',
      value: '58.3333%',
    },
    {
      key: '8',
      value: '66.6667%',
    },
    {
      key: '9',
      value: '75%',
    },
    {
      key: '10',
      value: '83.3333%',
    },
    {
      key: '11',
      value: '91.6667%',
    },
    {
      key: '12',
      value: '100%',
    },
    ...fixedWidth.map(value => ({
      key: value,
      value: value,
    })),
  ]

  return <CssPropertyTable keyValue={list} property={'width'} prefix={'w-'} withoutProperty={true} />
}

export const CssSizingMinWidth = ({}) => {
  const list = [
    {
      key: '0',
      value: '0px',
    },
    {
      key: 'full',
      value: '100%',
    },
    {
      key: 'screen',
      value: '100vw',
    },
    {
      key: 'auto',
      value: 'auto',
    },
    {
      key: 'min',
      value: 'min-content',
    },
    {
      key: 'max',
      value: 'max-content',
    },
    {
      key: 'fit',
      value: 'fit-content',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'min-width'} prefix={'min-w-'} withoutProperty={true} />
}

export const CssSizingMaxWidth = ({}) => {
  const list = [
    {
      key: '0',
      value: '0px',
    },
    {
      key: 'full',
      value: '100%',
    },
    {
      key: 'screen',
      value: '100vw',
    },
    {
      key: 'auto',
      value: 'auto',
    },
    {
      key: 'min',
      value: 'min-content',
    },
    {
      key: 'max',
      value: 'max-content',
    },
    {
      key: 'fit',
      value: 'fit-content',
    },
  ]

  return <CssPropertyTable keyValue={list} property={'max-width'} prefix={'max-w-'} withoutProperty={true} />
}
