import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'

export const ColorCard = ({ background, color, small = false }): React.ReactElement => {
  const colors = tokens
  const colorPath = color.split('.')
  const colorVariable = colorPath.reduce((acc, val) => {
    return acc[val] || {}
  }, colors)

  return (
    <div
      className="sb-unstyled radius-lg bg-white shadow flex-1"
      style={{ minWidth: small ? '80px' : '120px', maxWidth: '220px' }}
    >
      <div
        className={`px-small py-normal text-align-center radius-top-lg title text-x-large m-none`}
        style={{
          minHeight: '32px',
          background: `var(--${colorVariable.name})`,
          color: ['ds-color-primary-5', 'ds-text-color-primary', 'ds-background-color-primary'].includes(
            colorVariable.name,
          )
            ? 'var(--ds-color-white)'
            : 'current',
        }}
      >
        {background ? 'A-a' : ''}
      </div>
      <div className={`radius-bottom-lg p-small text-align-center`}>
        <div className="title text-normal text-primary">
          {colorVariable.name
            .replace('ds-color-', '')
            .replace('ds-text-color-', '')
            .replace('ds-background-color-', '')}
        </div>
        <div className="text-small text-primary">{colorVariable.$value}</div>
        {/* <div className="text-small text-primary">{color}</div> */}
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
