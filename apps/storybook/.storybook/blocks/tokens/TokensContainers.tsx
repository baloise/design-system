import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { Clipboard } from '../Clipboard'

export const TokensContainersSize = ({ _overview }): React.ReactElement => {
  const list = tokens.container.size
  return (
    <table className="sb-unstyled my-xl ds-table tokens" style={{ width: '100%' }}>
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
            <tr>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <Clipboard label={item.name} value={`var(--${item.name})`} />
              </td>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <p className={`mt-none mb-xs text-sm font-weight-bold py-2xs`}>{item.$value}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border-bottom-grey">
                <p className="m-none text-sm mb-sm">{item.comment}</p>
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}
export const TokensContainersSpace = ({ _overview }): React.ReactElement => {
  const list = tokens.container.space
  return (
    <table className="sb-unstyled my-xl ds-table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Token</th>
          <th style={{ minWidth: '100px' }}>Value</th>
        </tr>
      </thead>

      {Object.keys(list).map(key => {
        const item = list[key]

        return (
          <tbody key={key}>
            <tr>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <p className="font-weight-bold m-none">{key}</p>
                <p className="inline-block mt-2xs mb-xs text-sm py-2xs px-xs bg-grey-1 radius font-weight-bold">
                  var(--{item.name})
                </p>
              </td>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <p className={`mt-none mb-xs text-sm font-weight-bold py-2xs`}>{item.$value}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border-bottom-grey">
                <p className="m-none text-sm mb-sm">{item.comment}</p>
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}
