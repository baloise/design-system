import { Source } from '@storybook/addon-docs/blocks'
import React from 'react'
import componentsData from '../../src/assets/data/components.json'
import { Clipboard } from './Clipboard'

type ComponentPartsProps = {
  component: string
}

export const ComponentParts = ({ component }: ComponentPartsProps): React.ReactElement => {
  const componentTag = component.startsWith('ds-') ? component : `ds-${component}`

  const componentInfo = (componentsData.components as Array<any>).find(
    comp => comp.tag === componentTag || comp.tag === component,
  )

  if (!componentInfo) {
    return (
      <div className="sb-unstyled my-large p-large bg-orange-2 radius text-orange-dark">
        Component not found: {component}
      </div>
    )
  }

  const parts = (componentInfo.docsTags || [])
    .filter((tag: any) => tag.name === 'part')
    .map((tag: any) => {
      const text = tag.text || ''
      const [partName, ...rest] = text.split(' - ')
      const description = rest.join(' - ').trim()
      return {
        name: partName.trim().replace(/`/g, ''),
        description,
      }
    })

  if (parts.length === 0) {
    return (
      <div className="sb-unstyled">
        <h2 className="title text-2xl mb-normal">CSS Shadow Parts</h2>
        <div className="my-large p-large bg-grey-light radius">
          <p className="text-small">No shadow parts defined for this component.</p>
        </div>
      </div>
    )
  }

  const exampleParts = parts.slice(0, 2)
  const exampleCode = exampleParts.map(p => `${componentTag}::part(${p.name}) {\n  /* your styles */\n}`).join('\n\n')

  return (
    <div className="sb-unstyled my-large">
      <h2 className="title text-2xl mb-normal">CSS Shadow Parts</h2>
      <p className="text-normal mb-normal">
        Shadow parts are named elements inside a web component that can be styled from outside using the{' '}
        <code>::part()</code> selector. This lets you customize specific internals without breaking Shadow DOM
        encapsulation.
      </p>
      <table className="table w-full is-striped mb-large">
        <thead>
          <tr>
            <th>Part</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part, index) => (
            <tr key={index}>
              <td>
                <Clipboard label={part.name} />
              </td>
              <td className="text-small">{part.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-normal mb-small">Target a part directly in your stylesheet:</p>
      <Source dark language="css" code={exampleCode} />
    </div>
  )
}
