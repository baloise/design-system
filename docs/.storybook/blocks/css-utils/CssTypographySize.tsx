import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssTypographySize = ({}) => {
  const obj = tokens.typography.sizes
  const keys = Object.keys(obj)
  const values = Object.values(obj)

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
            <th className="pt-medium">Property</th>
            <th className="pt-medium">Value</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.key}>
              <td>
                <b>is-size-{item.key}</b>
              </td>
              <td>
                <div className="is-flex is-justify-content-space-between fg-small mb-x-small">
                  Mobile:{' '}
                  <pre className="doc-table-pre">
                    <code>font-size: var(--bal-size-{item.key})</code>
                  </pre>
                </div>
                <div className="is-flex is-justify-content-space-between fg-small mb-x-small">
                  Tablet:{' '}
                  <pre className="doc-table-pre">
                    <code>font-size: var(--bal-size-tablet-{item.key})</code>
                  </pre>
                </div>
                <div className="is-flex is-justify-content-space-between fg-small">
                  Desktop:{' '}
                  <pre className="doc-table-pre">
                    <code>font-size: var(--bal-size-desktop-{item.key})</code>
                  </pre>
                </div>
              </td>
              <td>
                <pre className="doc-table-pre mb-x-small">
                  <code>{item.value.mobile.fontSize}</code>
                </pre>
                <pre className="doc-table-pre mb-x-small">
                <code>{item.value.tablet.fontSize}</code>
                </pre>
                <pre className="doc-table-pre">
                <code>{item.value.desktop.fontSize}</code>
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
