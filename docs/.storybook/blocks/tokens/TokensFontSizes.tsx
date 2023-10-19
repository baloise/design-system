import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensFontSizes = ({ overview }) => {
  const typography = tokens.typography as any
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
  ]
  for (const k in typography.sizes) {
    if (validSizes.includes(k)) {
      sizes.push({
        name: k,
        value: typography.sizes[k],
      })
    }
  }
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '130px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '200px' }}>Token</th>
          <th style={{ minWidth: '100px' }}>Mobile</th>
          <th style={{ minWidth: '100px' }}>Tablet</th>
          <th style={{ minWidth: '100px' }}>Desktop</th>
        </tr>
      </thead>
      <tbody>
        {sizes.map(c => (
          <tr key={c.name}>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`title is-size-${c.name}`}>Aa</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="has-text-weight-bold is-size-large mt-none mb-x-small">
                {c.name} <span className="is-size-medium">({c.value.figmaName})</span>
              </p>
              <p className="m-none is-size-small">{c.value.description}</p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-size-{c.name})
              </p>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-line-height-{c.name})
              </p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`has-text-weight-bold is-size-small`}>{c.value.mobile.fontSize}</span>
              <br />
              <span className={`is-size-small`}>{c.value.mobile.lineHeight}</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`has-text-weight-bold is-size-small`}>{c.value.tablet.fontSize}</span>
              <br />
              <span className={`is-size-small`}>{c.value.tablet.lineHeight}</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`has-text-weight-bold is-size-small`}>{c.value.desktop.fontSize}</span>
              <br />
              <span className={`is-size-small`}>{c.value.desktop.lineHeight}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
