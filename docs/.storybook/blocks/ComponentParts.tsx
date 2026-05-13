import { Source } from '@storybook/addon-docs/blocks'
import React from 'react'
import componentsData from '../../src/assets/data/components.json'
import { Clipboard } from './Clipboard'

type ComponentPartsProps = {
  component: string
  subComponents?: string[]
}

const toPascalCase = (tag: string): string =>
  tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

const findComponent = (name: string) => {
  const tag = name.startsWith('ds-') ? name : `ds-${name}`
  return (componentsData.components as Array<any>).find(c => c.tag === tag || c.tag === name)
}

const getParts = (componentInfo: any) =>
  (componentInfo.docsTags || [])
    .filter((tag: any) => tag.name === 'part')
    .map((tag: any) => {
      const text = tag.text || ''
      const [partName, ...rest] = text.split(' - ')
      return { name: partName.trim().replace(/`/g, ''), description: rest.join(' - ').trim() }
    })

const PartTable = ({
  componentTag,
  parts,
  heading,
}: {
  componentTag: string
  parts: Array<{ name: string; description: string }>
  heading?: string
}): React.ReactElement => (
  <div className="mb-large">
    {heading && <h3 className="title text-xl mb-normal mt-large">{heading}</h3>}
    {parts.length === 0 ? (
      <div className="my-normal p-large bg-grey-light radius">
        <p className="text-small">No shadow parts defined.</p>
      </div>
    ) : (
      <>
        <table className="table w-full is-striped mb-normal">
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
        <Source
          dark
          language="css"
          code={parts
            .slice(0, 2)
            .map(p => `${componentTag}::part(${p.name}) {\n  /* your styles */\n}`)
            .join('\n\n')}
        />
      </>
    )}
  </div>
)

export const ComponentParts = ({ component, subComponents }: ComponentPartsProps): React.ReactElement => {
  const componentInfo = findComponent(component)

  if (!componentInfo) {
    return (
      <div className="sb-unstyled my-large p-large bg-orange-2 radius text-orange-dark">
        Component not found: {component}
      </div>
    )
  }

  const hasSubComponents = subComponents && subComponents.length > 0

  if (!hasSubComponents) {
    const componentTag = component.startsWith('ds-') ? component : `ds-${component}`
    const parts = getParts(componentInfo)

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
        <Source
          dark
          language="css"
          code={parts
            .slice(0, 2)
            .map(p => `${componentTag}::part(${p.name}) {\n  /* your styles */\n}`)
            .join('\n\n')}
        />
      </div>
    )
  }

  const allEntries = [component, ...subComponents].map(name => {
    const info = findComponent(name)
    const tag = name.startsWith('ds-') ? name : `ds-${name}`
    const rawTag = name.startsWith('ds-') ? name.slice(3) : name
    return {
      heading: toPascalCase(rawTag),
      componentTag: tag,
      parts: info ? getParts(info) : [],
      notFound: !info,
    }
  })

  return (
    <div className="sb-unstyled my-large">
      <h2 className="title text-2xl mb-normal">CSS Shadow Parts</h2>
      <p className="text-normal mb-normal">
        Shadow parts are named elements inside a web component that can be styled from outside using the{' '}
        <code>::part()</code> selector. This lets you customize specific internals without breaking Shadow DOM
        encapsulation.
      </p>
      {allEntries.map((entry, index) =>
        entry.notFound ? (
          <div key={index} className="my-large p-large bg-orange-2 radius text-orange-dark">
            Component not found: {entry.heading}
          </div>
        ) : (
          <PartTable key={index} componentTag={entry.componentTag} parts={entry.parts} heading={entry.heading} />
        ),
      )}
    </div>
  )
}
