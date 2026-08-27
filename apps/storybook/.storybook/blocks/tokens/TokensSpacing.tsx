import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { Clipboard } from '../Clipboard'

export const TokensSpacing = ({ _overview }): React.ReactElement => {
  const list = tokens['🔗 Alias']['↔️ Space']
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
        .filter(key => list[key].$extensions?.['com.helvetia.responsive'])
        .map(key => {
          const item = list[key]
          const responsive = item.$extensions['com.helvetia.responsive']
          const name = `${item.name}-device`

          return (
            <tbody key={key}>
              <tr className="border-bottom-grey">
                <td>
                  <Clipboard label={name} value={`var(--${name})`} />
                </td>
                <td>
                  <p className={`mt-none mb-none text-small font-weight-bold py-xx-small`}>
                    {responsive.mobile} / {responsive.tablet} / {responsive.desktop}
                  </p>
                </td>
                <td className="flex justify-content-center">
                  <div
                    className="radius bg-yellow-4"
                    style={{
                      width: `var(--${name})`,
                      height: `var(--${name})`,
                    }}
                  ></div>
                </td>
              </tr>
            </tbody>
          )
        })}
    </table>
  )
}
