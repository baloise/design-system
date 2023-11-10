import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const ColorCard = ({ background, color, small = false }) => {
  const colors = tokens.color
  const colorVariable = colors[color]

  return (
    <div
      className="sb-unstyled has-radius-large has-background-white has-shadow-normal is-flex-1"
      style={{ minWidth: small ? '80px' : '120px', maxWidth: '220px' }}
    >
      <div
        className={`has-background-${color} px-small py-normal has-text-centered has-radius-top-large has-text-${colorVariable.inverted} title is-size-x-large m-none`}
        style={{ minHeight: '64px' }}
      >
        {background ? 'A-a' : ''}
      </div>
      <div className={`has-radius-bottom-large p-small has-text-centered`}>
        <div className="title is-size-normal has-text-primary">{color}</div>
        <div className="is-size-small has-text-primary">{colorVariable.hex}</div>
      </div>
    </div>
  )
}

export const ColorCards = ({ children }) => {
  return <div className="is-flex is-justify-content-center is-flex-wrap-wrap fg-small my-normal">{children}</div>
}

export const ColorCardRow = ({ children, color }) => {
  return (
    <ColorCards>
      <ColorCard color={`${color}-1`} background={false} small/>
      <ColorCard color={`${color}-2`} background={false} small/>
      <ColorCard color={`${color}-3`} background={false} small/>
      <ColorCard color={`${color}-4`} background={false} small/>
      <ColorCard color={`${color}-5`} background={false} small/>
      <ColorCard color={`${color}-6`} background={false} small/>
    </ColorCards>
  )
}
