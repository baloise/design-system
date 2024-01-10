import React from 'react'

export const CssLayoutDisplay = ({}) => {
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
      className="sb-unstyled pb-medium my-x-large bg-grey-2 radius-normal px-medium"
      style={{
        maxHeight: '30rem',
        overflow: 'auto',
      }}
    >
      <table className="table w-full bg-grey-2">
        <thead
          className="doc-table-head bg-grey-2 border-none"
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
                <b>{item.key}</b>
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
