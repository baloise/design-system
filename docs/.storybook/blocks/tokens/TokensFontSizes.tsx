import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { Clipboard } from '../Clipboard'

export const TokensFontSize = ({ overview }) => {
  const list = tokens.size.text.size

  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Token & Description</th>
          <th style={{ minWidth: '280px' }}>Value (mobile / tablet / desktop)</th>
          <th style={{ minWidth: '100px' }}></th>
        </tr>
      </thead>

      {Object.keys(list).map(key => {
        const item = list[key]

        return (
          <tbody key={key}>
            <tr>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <Clipboard label={`bal-size-${key}`} value={`var(--bal-text-size-${key})`} />
              </td>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <p className={`mt-none mb-none text-small font-weight-bold py-xx-small`}>
                  {item?.mobile?.value || '0rem'} / {item?.tablet?.value || '0rem'} / {item?.desktop?.value || '0rem'}
                </p>
              </td>
              <td style={{ verticalAlign: 'top' }} className="border-none">
                <div
                  className={`font-family-title radius-normal text-primary font-weight-bold flex justify-content-center align-items-center text-${key}`}
                >
                  Aa
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className={'border-bottom-grey'}>
                <p className="m-none text-small mb-small">{item.mobile.comment}</p>
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}
