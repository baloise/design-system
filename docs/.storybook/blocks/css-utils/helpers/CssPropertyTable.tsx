import React from 'react'
import { Clipboard } from '../../Clipboard'
import json from '../../../../../packages/css/dist/docs/design-system.json'

type DesignSystemJson = typeof json
type UtilityKey = keyof DesignSystemJson

interface CssUtility {
  class: string
  css: string
  property: string | string[]
  value: string
  responsive?: boolean
  valueMobile?: string
  valueTablet?: string
  valueDesktop?: string
}

function getValues(utility: UtilityKey, search?: string | string[], filter?: (item: CssUtility) => boolean): CssUtility[] {
  const items = json[utility] as CssUtility[]
  let result = items
  if (search) {
    const terms = Array.isArray(search) ? search : [search]
    result = result.filter(item => {
      const props = Array.isArray(item.property) ? item.property : [item.property]
      return props.some(p => terms.includes(p))
    })
  }
  if (filter) result = result.filter(filter)
  return result
}

export const CssUtilitiesTable = ({
  utility,
  search,
  filter,
  example = undefined,
}: {
  utility: UtilityKey
  search?: string | string[]
  filter?: (item: CssUtility) => boolean
  example?: (item: CssUtility) => React.ReactNode
}): React.ReactElement => {
  const values = getValues(utility, search, filter)

  return (
    <section
      className="sb-unstyled pb-medium my-x-large bg-grey-2 radius px-medium"
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
            {example ? <th className="pt-medium"></th> : ''}
          </tr>
        </thead>
        <tbody>
          {values.map(item => (
            <tr key={item.class}>
              <td>
                <Clipboard label={item.class} />
              </td>
              <td>
                <pre className="doc-table-pre text-small">
                  {Array.isArray(item.property) ? item.property.join(', ') : item.property}
                  {item.property && item.value ? ': ' : ''}
                  {item.value}
                </pre>
              </td>
              {example ? <td>{example(item)}</td> : ''}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export const CssPropertyTable = ({
  keyValue,
  property = '',
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
      className="sb-unstyled pb-medium my-x-large bg-grey-2 radius px-medium"
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
                  {property || item.property}
                  {(property || item.property) && item.value ? ': ' : ''}
                  {item.value}
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
