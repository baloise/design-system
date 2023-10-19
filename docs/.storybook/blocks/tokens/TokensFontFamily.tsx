import React from 'react'

export const TokensFontFamily = ({ overview }) => {
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
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`has-font-title has-text-weight-bold has-text-primary`}>Title</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="has-text-weight-bold is-size-large mt-none mb-x-small">
                Title
              </p>
              <span className="is-size-small">BaloiseCreateHeadline, Arial, sans-serif</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-font-family-title)
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <span className={`has-font-text has-text-primary`}>Text</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="has-text-weight-bold is-size-large mt-none mb-none">
                Text
              </p>
              <span className="is-size-small">BaloiseCreateText, Arial, sans-serif</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-font-family-text)
              </p>
            </td>
          </tr>
      </tbody>
    </table>
  )
}
