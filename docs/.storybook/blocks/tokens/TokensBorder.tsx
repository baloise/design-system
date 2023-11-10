import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensBorder = ({ overview }) => {
  const border = tokens.border
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '130px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '200px' }}>Token</th>
          <th style={{ minWidth: '100px' }}>value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ verticalAlign: 'top' }}>
            <div className={`has-border-primary`} style={{ width: '24px', height: '24px' }}></div>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <p className="m-none is-size-small">The default border is 2px and the only width we provide so far.</p>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
              var(--bal-border-width-normal)
            </p>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <p className={`mt-none mb-x-small is-size-small has-text-weight-bold py-xx-small`}>{border.width}</p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
