import React from 'react'
import tokens from '@baloise/ds-tokens/dist/tokens.docs.json'
import { Clipboard } from '../Clipboard'

export const TokensShadow = ({ overview }) => {
  const list = tokens.shadow
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Token & Description</th>
          <th style={{ minWidth: '220px' }}>Value</th>
          <th style={{ minWidth: '100px' }}></th>
        </tr>
      </thead>

      {Object.keys(list).map(key => {
        const item = list[key]
        return (
          <tbody key={key}>
            <tr>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <Clipboard label={item.name} value={`var(--${item.name})`} />
              </td>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <p className={`mt-none mb-x-small text-small font-weight-bold py-xx-small`}>{item.value}</p>
              </td>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <div
                  className="radius-normal"
                  style={{
                    background: 'var(--bal-color-grey)',
                    height: '48px',
                    width: '48px',
                    boxShadow: `var(--${item.name})`,
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border-bottom-grey">
                <p className="m-none text-small mb-small">{item.comment}</p>
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}
