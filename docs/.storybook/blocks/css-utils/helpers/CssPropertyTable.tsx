import React from 'react'
import { Clipboard } from '../../Clipboard'

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
      className="sb-unstyled pb-medium my-x-large bg-grey-2 radius-normal px-medium"
      style={{
        maxHeight: '30rem',
        overflow: 'auto',
      }}
    >
      <table className="table w-full bg-grey-2">
        <thead
          className="doc-table-head bg-grey-2 border-none"
          style={{ position: 'sticky', top: '0', left: '0', overflow: 'hidden', zIndex: 10 }}
        >
          <tr>
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
                <Clipboard label={`${prefix}${withoutProperty ? '' : `${property}-`}${item.key}`} />
              </td>
              <td>
                <pre className="doc-table-pre text-small">
                  {/* <code className='bg-grey-2 border-none'> */}
                  {property || item.property}
                  {(property || item.property) && item.value ? ': ' : ''}
                  {item.value}
                  {/* </code> */}
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
