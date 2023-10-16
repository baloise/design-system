import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensBreakpoints = ({ overview }) => {
  const obj = tokens.breakpoint as any
  const sizes = []
  for (const k in obj) {
    sizes.push({
      name: k,
      value: obj[k],
    })
  }
  return (
    <table class="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Description</th>
          <th style={{ minWidth: '200px' }}>Token</th>
          <th style={{ minWidth: '100px' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {sizes.map(c => (
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <p class="has-text-weight-bold is-size-large mt-none mb-x-small">{c.name}</p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-breakpoint-{c.name})
              </p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class={`has-text-weight-bold is-size-small py-xx-small`}>{c.value}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
