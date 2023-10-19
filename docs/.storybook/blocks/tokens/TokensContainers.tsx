import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensContainers = ({ overview }) => {
  const container = tokens.container as any
  const sizes = [] as any
  for (const k in container.size) {
    sizes.push({
      name: k,
      value: container.size[k],
    })
  }
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Description</th>
          <th style={{ minWidth: '200px' }}>Token / CSS className</th>
          <th style={{ minWidth: '100px' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {sizes.map(c => (
          <tr key={c.name}>
            <td style={{ verticalAlign: 'top' }}>
              <p className="has-text-weight-bold is-size-large mt-none mb-x-small">{c.name}</p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-container-size-{c.name})
              </p>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                container{c.name !== 'normal' ? ` is-${c.name}` : ''}
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
