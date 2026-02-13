import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { Clipboard } from '../Clipboard'

export const TokensBorderColors = ({ overview }): React.ReactElement => {
  const list = tokens['🏷️ Semantic']['▭ Border'].Color
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Token & Description</th>
          <th style={{ minWidth: '100px' }}>Value</th>
          <th style={{ minWidth: '100px' }}></th>
        </tr>
      </thead>

      {Object.keys(list)
        .filter(key => key !== 'inverted')
        .map(key => {
          const item = list[key]
          return (
            <tbody key={key}>
              <tr className="border-bottom-grey">
                <td style={{ verticalAlign: 'middle' }}>
                  <Clipboard label={item.name} value={`var(--${item.name})`} />
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <p className={`text-small font-weight-bold`}>{item.$value}</p>
                </td>
                <td
                  style={{ verticalAlign: 'middle' }}
                  className={`flex justify-content-center ${
                    item.name.includes('white') || item.name.includes('inverted') ? 'bg-primary' : ''
                  }`}
                >
                  <div
                    className="radius-normal"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderColor: `var(--${item.name})`,
                      borderWidth: '2px',
                      borderStyle: 'solid',
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
