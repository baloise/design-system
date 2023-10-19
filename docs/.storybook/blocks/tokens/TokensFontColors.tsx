import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensFontColors = ({ overview }) => {
  const typography = tokens.typography as any
  const colorMap = typography.colors as any
  const colors = Object.keys(colorMap) as any
  const values = Object.values(colorMap) as any

  const colorTokens = tokens.color as any

  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '130px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '200px' }}>Token</th>
        </tr>
      </thead>
      <tbody>
        {colors.map((c: string, i: number) => (
          <tr key={c}>
            <td
              style={{
                verticalAlign: 'top',
                background: c === 'white' ? 'var(--bal-color-primary)' : 'transparent',
              }}
            >
              <span className={`title is-size-xxx-large has-text-${c}`}>Aa</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="has-text-weight-bold is-size-large mt-none mb-x-small">
                {c} <span className="is-size-medium">({values[i]})</span>
              </p>
              <p className="m-none is-size-small">{colorTokens[values[i]].description}</p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-color-text-{c})
              </p>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-color-{values[i]})
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
