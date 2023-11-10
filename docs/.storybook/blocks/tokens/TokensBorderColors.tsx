import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensBorderColors = ({ overview }) => {
  const border = tokens.border
  const colors = Object.keys(border.colors)
  const values = Object.values(border.colors)

  const descriptions: any = {
    'primary': 'Use for focused or selected state.',
    'grey': 'Default border color for inactive state.',
    'grey-dark': 'Use for disabled state.',
    'warning': 'Use for warning/hint state.',
    'success': 'Use for valid state.',
    'danger': 'Use for invalid state.',
    'danger-dark': 'Use for invalid state when hovering.',
    'danger-darker': 'Use for invalid state when pressing.',
    'white': 'Default color on dark backgrounds.',
    'primary-light': 'Disabled or secondary color on dark backgrounds.',
    'light-blue': 'Primary hover color.',
    'primary-dark': 'Pressing hover color.',
  }

  const isInverted = (v: string) => (['white', 'primary-light'].includes(v) ? 'primary' : '')

  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '120px' }}>Example</th>
          <th>Name</th>
          <th>Description</th>
          {overview ? '' : <th style={{ minWidth: '200px' }}>Token</th>}
          {overview ? '' : <th style={{ minWidth: '100px' }}>value</th>}
        </tr>
      </thead>
      <tbody>
        {colors.map((c, i) => (
          <tr key={c}>
            <td style={{ verticalAlign: 'middle' }} className={`has-background-${isInverted(c)}`}>
              <div className={`has-border-${c} has-radius-normal`} style={{ width: '24px', height: '24px' }}></div>
            </td>
            <td style={{ verticalAlign: 'middle' }}>
              <p className="has-text-weight-bold is-size-normal m-none">{c}</p>
            </td>
            <td style={{ verticalAlign: 'middle' }}>
              <p className="m-none is-size-small">{descriptions[c]}</p>
            </td>
            {overview ? (
              ''
            ) : (
              <td style={{ verticalAlign: 'middle' }}>
                <p className="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                  var(--bal-color-border-{c})
                </p>
              </td>
            )}
            {overview ? (
              ''
            ) : (
              <td style={{ verticalAlign: 'middle' }}>
                <p className={`mt-none mb-x-small is-size-small has-text-weight-bold py-xx-small`}>{values[i]}</p>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
