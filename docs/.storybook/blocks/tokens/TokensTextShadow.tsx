import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
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
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <Clipboard label={item.name} value={`var(--${item.name})`} />
              </td>
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <p className={`mt-none mb-x-small is-size-small has-text-weight-bold py-xx-small`}>{item.value}</p>
              </td>
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <div
                  className="has-radius-normal has-text-weight-bold is-size-x-large is-flex is-justify-content-center is-align-items-center"
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
              <td colSpan={3} className="has-border-bottom-grey">
                <p className="m-none is-size-small mb-small">{item.comment}</p>
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}
