import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import {Clipboard} from '../Clipboard'

export const TokensColors = ({ overview }) => {
  const listBase = tokens.color.base
  const listAlias = tokens.color.alias

  const list = { ...listBase, ...listAlias }

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
          const subItems = listBase[key]
          return (
            <tbody key={key}>
              <tr>
                <td style={{ verticalAlign: 'top' }} className="has-border-none">
                  <Clipboard label={item.name} value={`var(--${item.name})`}/>
                </td>
                <td style={{ verticalAlign: 'top' }} className="has-border-none">
                  <p className={`mt-none mb-x-small is-size-small has-text-weight-bold py-xx-small`}>{item.value}</p>
                </td>
                <td style={{ verticalAlign: 'top' }} className="has-border-none">
                  <div
                    className="has-radius-normal"
                    style={{ width: '48px', height: '48px', background: `var(--${item.name})` }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td colSpan={3} className={subItems.value ? 'has-border-bottom-grey' : 'has-border-none'}>
                  <p className="m-none is-size-small mb-small">{item.comment}</p>
                </td>
              </tr>
              {!subItems.value ? (
                <tr>
                  <td colSpan={3} className="has-border-bottom-grey">
                    <p className="has-text-weight-bold mb-none">Shades</p>
                    <p className="is-inline-block mt-none is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                      {item.name}-x
                    </p>
                    <div className="is-flex fg-normal">
                      <div
                        className="has-radius-normal p-small has-text-weight-bold"
                        style={{ flex: '1', height: '48px', background: `var(--${item.name}-1)` }}
                      >
                        1
                      </div>
                      <div
                        className="has-radius-normal p-small has-text-weight-bold"
                        style={{ flex: '1', height: '48px', background: `var(--${item.name}-2)` }}
                      >
                        2
                      </div>
                      <div
                        className="has-radius-normal p-small has-text-weight-bold"
                        style={{ flex: '1', height: '48px', background: `var(--${item.name}-3)` }}
                      >
                        3
                      </div>
                      <div
                        className="has-radius-normal p-small has-text-weight-bold has-text-white"
                        style={{ flex: '1', height: '48px', background: `var(--${item.name}-4)` }}
                      >
                        4
                      </div>
                      <div
                        className="has-radius-normal p-small has-text-weight-bold has-text-white"
                        style={{ flex: '1', height: '48px', background: `var(--${item.name}-5)` }}
                      >
                        5
                      </div>
                      <div
                        className="has-radius-normal p-small has-text-weight-bold has-text-white"
                        style={{ flex: '1', height: '48px', background: `var(--${item.name}-6)` }}
                      >
                        6
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                ''
              )}
            </tbody>
          )
        })}
    </table>
  )
}
