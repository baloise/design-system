import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssBackgroundColors = ({}) => {
  const color = tokens.color
  const keys = Object.keys(color)
  const values = Object.values(color)

  const list = keys.map((key, index) => ({
    key,
    value: values[index].hex,
  }))

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
            <th className="pt-medium">Value</th>
            <th className="pt-medium"></th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.key}>
              <td><b>has-background-{item.key}</b></td>
              <td><pre className="doc-table-pre"><code>background: var(--bal-color-{item.key})</code></pre></td>
              <td><div className={`has-background-${item.key} p-small`}></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
