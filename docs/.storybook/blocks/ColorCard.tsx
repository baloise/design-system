import React from 'react'
import tokens from '@baloise/ds-tokens/dist/tokens.docs.json'

export const ColorCard = ({ background, color, small = false }) => {
  const colors = tokens.color
  const colorPath = color.split('.')
  const colorVariable = colorPath.reduce((acc, val) => acc[val] || {}, colors)
  return (
    <div
      className="sb-unstyled radius-large bg-white shadow-normal flex-1"
      style={{ minWidth: small ? '80px' : '120px', maxWidth: '220px' }}
    >
      <div
        className={`px-small py-normal text-align-center radius-top-large title text-x-large m-none`}
        style={{
          minHeight: '64px',
          background: `var(--${colorVariable.name})`,
          color: ['bal-color-primary'].includes(colorVariable.name) ? 'var(--bal-color-text-white)' : 'current',
        }}
      >
        {background ? 'A-a' : ''}
      </div>
      <div className={`radius-bottom-large p-small text-align-center`}>
        <div className="title text-normal text-primary">{colorVariable.name.replace('bal-color-', '')}</div>
        <div className="text-small text-primary">{colorVariable.value}</div>
      </div>
    </div>
  )
}

export const ColorCards = ({ children }) => {
  return <div className="flex justify-content-center flex-wrap gap-small my-normal">{children}</div>
}

export const ColorCardRow = ({ children, color }) => {
  return (
    <ColorCards>
      <ColorCard color={`${color}.1`} background={false} small />
      <ColorCard color={`${color}.2`} background={false} small />
      <ColorCard color={`${color}.3`} background={false} small />
      <ColorCard color={`${color}.4`} background={false} small />
      <ColorCard color={`${color}.5`} background={false} small />
      <ColorCard color={`${color}.6`} background={false} small />
    </ColorCards>
  )
}
