import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssBorderRadius = ({}) => {
  const radius = tokens.radius
  const keys = Object.keys(radius)
  const values = Object.values(radius)

  const list = keys.map((key, index) => ({
    key,
    value: values[index].value,
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
              <td><b>has-radius-{item.key}</b></td>
              <td><pre className="doc-table-pre"><code>border-radius: {item.value}</code></pre></td>
              <td><div className={`has-radius-${item.key} has-background-green p-small`}></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
