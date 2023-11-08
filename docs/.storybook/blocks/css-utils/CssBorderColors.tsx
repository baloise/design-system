import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssBorderColors = ({}) => {
  const border = tokens.border
  const keys = Object.keys(border.colors)
  const values = Object.values(border.colors)

  const list = keys.map((key, index) => ({
    key,
    value: values[index],
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
              <td><b>has-border-{item.key}</b></td>
              <td><pre className="doc-table-pre"><code>--bal-color-{item.value}</code></pre></td>
              <td><div className={`has-border-${item.key} p-small`}></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
