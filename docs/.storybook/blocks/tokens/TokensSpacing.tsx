import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { Clipboard } from '../Clipboard'

export const TokensSpacing = ({ overview }): React.ReactElement => {
  const list = tokens['🏷️ Semantic']['↔️ Space']
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
        .filter(key => list[key].Mobile.$value)
        .map(key => {
          const item = list[key].Mobile
          const itemTablet = list[key].Tablet
          const itemDesktop = list[key].Desktop

          const name = item.name.replace('-mobile', '-device')
          return (
            <tbody key={key}>
              <tr className="border-bottom-grey">
                <td>
                  <Clipboard label={name} value={`var(--${name})`} />
                </td>
                <td>
                  <p className={`mt-none mb-none text-small font-weight-bold py-xx-small`}>
                    {item.$value} / {itemTablet?.$value || '0rem'} / {itemDesktop?.$value || '0rem'}
                  </p>
                </td>
                <td className="flex justify-content-center">
                  <div
                    className="radius-normal"
                    style={{
                      background: 'var(--bal-color-purple-4)',
                      width: `var(--${item.name})`,
                      height: `var(--${item.name})`,
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
