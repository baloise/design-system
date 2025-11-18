import React from 'react'
import { Clipboard } from '../../Clipboard'

export const CssTable = ({
  tokens,
  css,
  example,
}: {
  tokens: any
  css: string
  example?: (item: { key: string; name: string; value: string }) => any
}) => {
  const keys = Object.keys(tokens).filter(k => tokens[k] && tokens[k].value)

  const list = keys.map(key => ({
    key: key.replace('default', ''),
    name: tokens[key].name,
    value: tokens[key].value,
  }))

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
          style={{ position: 'sticky', top: '0', left: '0', zIndex: '10' }}
        >
          <tr>
            <th className="pt-medium">Class</th>
            <th className="pt-medium">Value</th>
            {example ? <th className="pt-medium"></th> : ''}
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.name}>
              <td>
                <Clipboard label={[css, item.key].filter(i => i).join('-')} />
              </td>
              <td>
                <Clipboard label={`var(--${item.name})`} value={`var(--${item.name})`} />
              </td>
              {example ? <td>{example(item)}</td> : ''}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
