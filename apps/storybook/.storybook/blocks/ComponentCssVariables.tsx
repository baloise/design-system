import { Source } from '@storybook/addon-docs/blocks'
import React from 'react'
import componentsData from '../../src/assets/data/components.json'
import { Clipboard } from './Clipboard'

type ComponentCssVariablesProps = {
  component: string
  subComponents?: string[]
}

type CssStyle = {
  name: string
  annotation: string
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

const StyleTable = ({
  componentTag,
  styles,
  heading,
}: {
  componentTag: string
  styles: CssStyle[]
  heading?: string
}): React.ReactElement => (
  <div className="mb-lg">
    {heading && <h3 className="ds-title text-xl mb-base mt-lg">{heading}</h3>}
    {styles.length === 0 ? (
      <div className="my-base p-lg bg-grey-light radius">
        <p className="text-sm">No CSS variables defined.</p>
      </div>
    ) : (
      <>
        <table className="ds-table w-full is-striped mb-base">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {styles.map((style, index) => (
              <tr key={index}>
                <td>
                  <Clipboard label={style.name} />
                </td>
                <td className="text-sm">{style.docs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Source
          dark
          language="css"
          code={`${componentTag} {\n${styles
            .slice(0, 2)
            .map(s => `  ${s.name}: /* your value */;`)
            .join('\n')}\n}`}
        />
      </>
    )}
  </div>
)

export const ComponentCssVariables = ({ component, subComponents }: ComponentCssVariablesProps): React.ReactElement => {
  const componentInfo = findComponent(component)

  if (!componentInfo) {
    return (
      <div className="sb-unstyled my-lg p-lg bg-orange-2 radius text-orange-dark">Component not found: {component}</div>
    )
  }

  const hasSubComponents = subComponents && subComponents.length > 0

  if (!hasSubComponents) {
    const componentTag = component.startsWith('ds-') ? component : `ds-${component}`
    const styles = (componentInfo.styles || []) as CssStyle[]

    if (styles.length === 0) {
      return (
        <div className="sb-unstyled">
          <h2 className="ds-title text-2xl mb-base">CSS Variables</h2>
          <div className="my-lg p-lg bg-grey-light radius">
            <p className="text-sm">No CSS variables defined for this component.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="sb-unstyled my-lg">
        <h2 className="ds-title text-2xl mb-base">CSS Variables</h2>
        <p className="text-base mb-base">
          Use these CSS variables to adjust the appearance of individual component instances. For global theming, use
          design tokens instead.
        </p>
        <table className="ds-table w-full is-striped mb-lg">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {styles.map((style, index) => (
              <tr key={index}>
                <td>
                  <Clipboard label={style.name} />
                </td>
                <td className="text-sm">{style.docs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-base mb-sm">
          Set variables directly on the element to override styles for a specific instance:
        </p>
        <Source
          dark
          language="css"
          code={`${componentTag} {\n${styles
            .slice(0, 2)
            .map(s => `  ${s.name}: /* your value */;`)
            .join('\n')}\n}`}
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
      styles: info ? ((info.styles || []) as CssStyle[]) : [],
      notFound: !info,
    }
  })

  return (
    <div className="sb-unstyled my-lg">
      <h2 className="ds-title text-2xl mb-base">CSS Variables</h2>
      <p className="text-base mb-base">
        Use these CSS variables to adjust the appearance of individual component instances. For global theming, use
        design tokens instead.
      </p>
      {allEntries.map((entry, index) =>
        entry.notFound ? (
          <div key={index} className="my-lg p-lg bg-orange-2 radius text-orange-dark">
            Component not found: {entry.heading}
          </div>
        ) : (
          <StyleTable key={index} componentTag={entry.componentTag} styles={entry.styles} heading={entry.heading} />
        ),
      )}
    </div>
  )
}
