import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { Clipboard } from '../Clipboard'

export const TokensBorderColors = ({ overview }) => {
  const list = tokens.color.border
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
              <tr>
                <td style={{ verticalAlign: 'top' }} className="border-none">
                  <Clipboard label={item.name} value={`var(--${item.name})`} />
                </td>
                <td style={{ verticalAlign: 'top' }} className="border-none">
                  <p className={`mt-none mb-x-small text-small font-weight-bold py-xx-small`}>{item.value}</p>
                </td>
                <td style={{ verticalAlign: 'top' }} className="border-none">
                  <div
                    className={`radius-normal p-small ${['white', 'primary-light'].includes(key) ? 'bg-primary' : ''}`}
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
