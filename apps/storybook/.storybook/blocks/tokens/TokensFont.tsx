import React from 'react'
import { Clipboard } from '../Clipboard'

export const TokensFont = ({ _overview }): React.ReactElement => {
  return (
    <table className="sb-unstyled my-xl ds-table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '220px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '220px' }}>Token</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ verticalAlign: 'top' }}>
            <span className="font-family-heading font-weight-bold text-primary text-md">Bold Headline</span>
            <br />
            <span className="font-family-heading text-primary text-md">Light Headline</span>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <p className="font-weight-bold text-lg mt-none mb-xs">
              Title <span className="text-md">(BaloiseCreateHeadline)</span>
            </p>
            <p className="m-none text-sm">Should only be used for headings and buttons</p>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <Clipboard label={'ds-font-family-heading'} value={`var(--ds-font-family-heading)`} />
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: 'top' }}>
            <span className="font-family-text font-weight-bold text-primary text-md">Bold Text</span>
            <br />
            <span className="font-family-text text-primary text-md">Regular Text</span>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <p className="font-weight-bold text-lg mt-none mb-xs">
              Text <span className="text-md">(BaloiseCreateText)</span>
            </p>
            <p className="m-none text-sm">Should only be used for body texts and form controls</p>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <Clipboard label={'ds-font-family-text'} value={`var(--ds-font-family-text)`} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
