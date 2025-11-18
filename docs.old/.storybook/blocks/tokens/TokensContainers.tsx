import React from 'react'
import tokens from '@baloise/ds-tokens/dist/tokens.docs.json'
import { Clipboard } from '../Clipboard'

export const TokensContainersSize = ({ overview }) => {
  const list = tokens.size.container.size
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
            <tr>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <Clipboard label={item.name} value={`var(--${item.name})`} />
              </td>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <p className={`mt-none mb-x-small text-small font-weight-bold py-xx-small`}>{item.value}</p>
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
export const TokensContainersSpace = ({ overview }) => {
  const list = tokens.size.container.space
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
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
                <p className="inline-block mt-xx-small mb-x-small text-small py-xx-small px-x-small bg-grey-2 radius-normal font-weight-bold">
                  var(--{item.name})
                </p>
              </td>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <p className={`mt-none mb-x-small text-small font-weight-bold py-xx-small`}>{item.value}</p>
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
