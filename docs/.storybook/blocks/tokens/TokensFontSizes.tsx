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
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <Clipboard label={`bal-size-${key}`} value={`var(--bal-size-${key})`} />
              </td>
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <p className={`mt-none mb-none text-small has-text-weight-bold py-xx-small`}>
                  {item?.mobile?.value || '0rem'} / {item?.tablet?.value || '0rem'} / {item?.desktop?.value || '0rem'}
                </p>
              </td>
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <div
                  className={`is-family-title has-radius-normal has-text-primary has-text-weight-bold is-flex is-justify-content-center is-align-items-center is-size-${key}`}
                >
                  Aa
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className={'has-border-bottom-grey'}>
                <p className="m-none text-small mb-small">{item.mobile.comment}</p>
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}
