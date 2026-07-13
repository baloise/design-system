import React from 'react'
import componentsData from '../../src/assets/data/components.json'
import { Clipboard } from './Clipboard'

type ComponentCssVariantsProps = {
  component: string
  subComponents?: string[]
}

type CssVariant = {
  name: string
  docs: string
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

const VariantsTable = ({ variants, heading }: { variants: CssVariant[]; heading?: string }): React.ReactElement => (
  <div className="mb-large">
    {heading && <h3 className="title text-xl mb-normal mt-large">{heading}</h3>}
    {variants.length === 0 ? (
      <div className="my-normal p-large bg-grey-light radius">
        <p className="text-small">No CSS variants defined.</p>
      </div>
    ) : (
      <table className="table w-full is-striped mb-normal">
        <thead>
          <tr>
            <th>Variant</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index}>
              <td>
                <Clipboard label={`.${variant.name}`} />
              </td>
              <td className="text-small">{variant.docs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)

export const ComponentCssVariants = ({ component, subComponents }: ComponentCssVariantsProps): React.ReactElement => {
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
    const variants = (componentInfo.variants || []) as CssVariant[]

    if (variants.length === 0) {
      return (
        <div className="sb-unstyled">
          <h2 className="title text-2xl mb-normal">CSS Variants</h2>
          <div className="my-large p-large bg-grey-light radius">
            <p className="text-small">No CSS variants defined for this component.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="sb-unstyled my-large">
        <h2 className="title text-2xl mb-normal">CSS Variants</h2>
        <p className="text-normal mb-normal">
          Apply these CSS variant classes to modify the appearance and behavior of the component.
        </p>
        <table className="table w-full is-striped mb-large">
          <thead>
            <tr>
              <th>Variant</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, index) => (
              <tr key={index}>
                <td>
                  <Clipboard label={`.${variant.name}`} />
                </td>
                <td className="text-small">{variant.docs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const allEntries = [component, ...subComponents].map(name => {
    const info = findComponent(name)
    const rawTag = name.startsWith('ds-') ? name.slice(3) : name
    return {
      heading: toPascalCase(rawTag),
      variants: info ? ((info.variants || []) as CssVariant[]) : [],
      notFound: !info,
    }
  })

  return (
    <div className="sb-unstyled my-large">
      <h2 className="title text-2xl mb-normal">CSS Variants</h2>
      <p className="text-normal mb-normal">
        Apply these CSS variant classes to modify the appearance and behavior of the components.
      </p>
      {allEntries.map((entry, index) => (
        <div key={index}>
          {entry.notFound && (
            <div className="my-large p-large bg-orange-2 radius text-orange-dark">
              Component not found: {entry.heading}
            </div>
          )}
          {!entry.notFound && <VariantsTable variants={entry.variants} heading={entry.heading} />}
        </div>
      ))}
    </div>
  )
}
