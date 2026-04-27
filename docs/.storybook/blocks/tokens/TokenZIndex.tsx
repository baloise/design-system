import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { Clipboard } from '../Clipboard'

export const TokensZIndex = ({ overview }): React.ReactElement => {
  const list = tokens['🏷️ Semantic']['🗂️ ZIndex']
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Token & Description</th>
          <th style={{ minWidth: '100px' }}>Value</th>
        </tr>
      </thead>

      {Object.keys(list).map(key => {
        const item = list[key]
        return (
          <tbody key={key}>
            <tr className="border-bottom-grey">
              <td>
                <Clipboard label={item.name} value={`var(--${item.name})`} />
              </td>
              <td>
                <p className={`text-small text-weight-bold`}>{item.$value}</p>
              </td>
            </tr>
            {/* <tr>
              <td colSpan={2} className="border-bottom-grey">
                <p className="m-none text-small mb-small">{item.comment}</p>
              </td>
            </tr> */}
          </tbody>
        )
      })}
    </table>
  )
}
