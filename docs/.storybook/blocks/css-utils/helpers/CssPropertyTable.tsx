import React from 'react'

export const CssPropertyTable = ({
  keyValue,
  property,
  prefix = '',
  list = [],
  responsive = false,
  withoutProperty = false,
}: {
  prefix: string
  keyValue?: any
  property?: string
  list?: string[]
  responsive?: boolean
  withoutProperty?: boolean
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
            <th className="pt-medium" style={{ minWidth: '220px' }}>
              Class
            </th>
            <th className="pt-medium">Property</th>
            {responsive ? <th className="pt-medium">Mobile</th> : ''}
            {responsive ? <th className="pt-medium">Tablet</th> : ''}
            {responsive ? <th className="pt-medium">Desktop</th> : ''}
          </tr>
        </thead>
        <tbody>
          {keyValue.map(item => (
            <tr key={item.key}>
              <td>
                <b>{`${prefix}${withoutProperty ? '' : `${property}-`}${item.key}`}</b>
              </td>
              <td>
                <pre className="doc-table-pre">
                  <code>
                    {property || item.property}{(property || item.property) && item.value ? ': ' : ''}
                    {item.value}
                  </code>
                </pre>
              </td>
              {responsive ? <td>{item.valueMobile}</td> : ''}
              {responsive ? <td>{item.valueTablet}</td> : ''}
              {responsive ? <td>{item.valueDesktop}</td> : ''}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
