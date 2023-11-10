import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssLayoutDisplay = ({}) => {
  const obj = tokens.breakpoint
  const keys = Object.keys(obj)
  const values = Object.values(obj)

  const list = [
    {
      key: 'hidden',
      value: 'hidden',
    },
    {
      key: 'block',
      value: 'block',
    },
    {
      key: 'flex',
      value: 'flex',
    },
    {
      key: 'inline',
      value: 'inline',
    },
    {
      key: 'inline-block',
      value: 'inline-block',
    },
    {
      key: 'inline-flex',
      value: 'inline-flex',
    },

  ]

  return (
    <section
      className="sb-unstyled pb-medium my-x-large has-background-grey-2 has-radius-normal px-medium"
      style={{
        maxHeight: '30rem',
        overflow: 'auto',
      }}
    >
      <table className="table is-fullwidth has-background-grey-2">
        <thead
          className="doc-table-head has-background-grey-2 has-border-none"
          style={{ position: 'sticky', top: '0', left: '0' }}
        >
          <tr style={{ position: 'sticky', top: '0', left: '0' }}>
            <th className="pt-medium">Class</th>
            <th className="pt-medium">Property</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.key}>
              <td>
                <b>is-{item.key}</b>
              </td>
              <td>
                <pre className="doc-table-pre">
                  <code>display: {item.value}</code>
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
