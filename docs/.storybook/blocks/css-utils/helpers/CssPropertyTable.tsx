import React from 'react'

export const CssPropertyTable = ({
  keyValue,
  property,
  prefix = '',
  list = [],
}: {
  keyValue?: any
  property: string
  prefix: string
  list?: string[]
}) => {
  if (!keyValue) {
    keyValue = list.map(item => ({ key: item, value: item })) as any
  }

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
          {keyValue.map(item => (
            <tr key={item.key}>
              <td>
                <b>
                  {prefix}
                  {property}-{item.key}
                </b>
              </td>
              <td>
                <pre className="doc-table-pre">
                  <code>
                    {property}: {item.value}
                  </code>
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
