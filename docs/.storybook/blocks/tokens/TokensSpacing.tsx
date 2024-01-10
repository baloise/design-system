import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { Clipboard } from '../Clipboard'

export const TokensSpacing = ({ overview }) => {
  const list = tokens.size.space
  const listTablet = tokens.size.space.tablet
  const listDesktop = tokens.size.space.desktop
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Token & Description</th>
          <th style={{ minWidth: '280px' }}>Value (mobile / tablet / desktop)</th>
          <th style={{ minWidth: '100px' }}></th>
        </tr>
      </thead>

      {Object.keys(list)
        .filter(key => list[key].value)
        .map(key => {
          const item = list[key]
          const itemTablet = listTablet[key]
          const itemDesktop = listDesktop[key]

          return (
            <tbody key={key}>
              <tr>
                <td style={{ verticalAlign: 'top' }} className="border-none">
                  <Clipboard label={item.name} value={`var(--${item.name})`} />
                </td>
                <td style={{ verticalAlign: 'top' }} className="border-none">
                  <p className={`mt-none mb-none text-small text-weight-bold py-xx-small`}>
                    {item.value} / {itemTablet?.value || '0rem'} / {itemDesktop?.value || '0rem'}
                  </p>
                </td>
                <td style={{ verticalAlign: 'top' }} className="border-none">
                  <div
                    className="radius-normal"
                    style={{
                      background: 'var(--bal-color-red)',
                      width: `var(--${item.name})`,
                      height: `var(--${item.name})`,
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
