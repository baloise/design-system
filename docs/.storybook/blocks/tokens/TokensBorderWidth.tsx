import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { Clipboard } from '../Clipboard'

export const TokensBorderWidth = ({ overview }): React.ReactElement => {
  const list = tokens['🏷️ Semantic']['▭ Border'].Width
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Token & Description</th>
          <th style={{ minWidth: '100px' }}>Value</th>
          <th style={{ minWidth: '100px' }}></th>
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
                <p className={`text-small font-weight-bold`}>{item.$value}</p>
              </td>
              <td className="flex justify-content-center align-items-center h-3rem">
                <div
                  style={{
                    background: 'var(--ds-color-purple-4)',
                    borderRadius: 'var(--ds-radius)',
                    height: `var(--${item.name})`,
                    width: '48px',
                  }}
                ></div>
              </td>
            </tr>
            {/* <tr>
              <td colSpan={3} className="border-bottom-grey">
                <p className="m-none text-small mb-small">{item.comment}</p>
              </td>
            </tr> */}
          </tbody>
        )
      })}
    </table>
  )
}
