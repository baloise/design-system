import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensTextShadow = ({ overview }) => {
  const textShadows = tokens.shadow.text as any
  const shadowTokens = []
  for (const k in textShadows) {
    shadowTokens.push({
      name: k,
      value: textShadows[k],
    })
  }
  return (
    <table class="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '120px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '220px' }}>Token</th>
          <th style={{ minWidth: '230px' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {shadowTokens.map(c => (
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ height: '48px', width: '80px' }} class={`mt-x-small has-background-yellow-1 p-x-small`}>
                <p class={`has-text-shadow${`-${c.name}`}`}>Shadow</p>
              </div>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class="has-text-weight-bold is-size-large mt-none mb-x-small">{c.name}</p>
              <p class="m-none is-size-small">{c.value.description}</p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-text-shadow{`-${c.name}`})
              </p>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class="mt-none mb-x-small is-size-small has-text-weight-bold py-xx-small">{c.value.value}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
