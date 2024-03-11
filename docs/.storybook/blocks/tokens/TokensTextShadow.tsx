import React from 'react'
import tokens from '@baloise/ds-tokens/dist/tokens.docs.json'
import { Clipboard } from '../Clipboard'

export const TokensTextShadow = ({ overview }) => {
  const list = tokens.text.shadow
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '50%' }}>Token & Description</th>
          <th style={{ minWidth: '50%' }}>Value</th>
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
                  className="radius-normal font-weight-bold text-x-large flex justify-content-center align-items-center"
                  style={{
                    height: '48px',
                    width: '48px',
                    textShadow: `var(--${item.name})`,
                  }}
                >
                  Aa
                </div>
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
