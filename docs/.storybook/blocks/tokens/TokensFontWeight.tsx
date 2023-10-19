import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensFontWeight = ({ overview }) => {
  const typography = tokens.typography as any
  const weights = [] as any

  for (const k in typography.weights) {
    weights.push({
      name: k,
      value: typography.weights[k],
    })
  }
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '220px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '240px' }}>Token</th>
        </tr>
      </thead>
      <tbody>
        {weights.map(c => (
          <tr key={c.name}>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`is-${c.name} has-font-title has-text-primary`}>Headline</span>
              <br />
              <span className={`is-${c.name} is-family-text has-text-primary`}>Text</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="has-text-weight-bold is-size-large mt-none mb-x-small">
                {c.name} <span className="is-size-medium">({c.value})</span>
              </p>
              <p className="m-none is-size-small">{c.value.description}</p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-weight-{c.name})
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
