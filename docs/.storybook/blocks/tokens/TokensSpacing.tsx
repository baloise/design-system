import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensSpacing = ({ overview }) => {
  const spacing = tokens.spacing as any
  const sizes = [] as any
  const validSizes = [
    'xxxxx-large',
    'xxxx-large',
    'xxx-large',
    'xx-large',
    'x-large',
    'large',
    'medium',
    'normal',
    'small',
    'x-small',
    'xx-small',
    'none',
    'auto',
  ].reverse()
  for (const k in spacing) {
    if (validSizes.includes(k)) {
      sizes.push({
        name: k,
        value: spacing[k],
      })
    }
  }
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '100px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '240px' }}>Token</th>
          <th style={{ minWidth: '90px' }}>Mobile</th>
          <th style={{ minWidth: '90px' }}>Tablet</th>
          <th style={{ minWidth: '90px' }}>Desktop</th>
        </tr>
      </thead>
      <tbody>
        {sizes.map(c => (
          <tr key={c.name}>
            <td style={{ verticalAlign: 'top' }}>
              <div className={`pt-${c.name} mt-x-small has-background-green`}></div>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="has-text-weight-bold is-size-large mt-none mb-x-small">
                {c.name} <span className="is-size-medium">({c.value.legacy})</span>
              </p>
              <p className="m-none is-size-small">{c.value.description}</p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-space-{c.name})
              </p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`has-text-weight-bold is-size-small`}>{c.value.mobile}</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`has-text-weight-bold is-size-small`}>{c.value.tablet}</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`has-text-weight-bold is-size-small`}>{c.value.desktop}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
