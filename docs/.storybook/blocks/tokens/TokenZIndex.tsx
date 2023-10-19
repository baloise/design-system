import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokenZIndex = ({ overview }) => {
  const zIndex = tokens.zIndex as any
  const list = [] as any
  for (const k in zIndex) {
    list.push({
      name: k,
      description: zIndex[k].description,
      value: zIndex[k].value,
    })
  }

  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Description</th>
          <th style={{ minWidth: '280px' }}>Token</th>
          <th style={{ minWidth: '100px' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {list.map(c => (
          <tr key={c.name}>
            <td style={{ verticalAlign: 'top' }}>
              <p className="has-text-weight-bold is-size-large mt-none mb-x-small">{c.name}</p>
              <small>{c.description}</small>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-z-index-{c.name})
              </p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className={`has-text-weight-bold is-size-small py-xx-small`}>{c.value}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
