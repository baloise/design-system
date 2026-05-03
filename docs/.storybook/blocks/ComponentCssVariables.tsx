import { Source } from '@storybook/addon-docs/blocks'
import React from 'react'
import componentsData from '../../src/assets/data/components.json'
import { Clipboard } from './Clipboard'

type ComponentCssVariablesProps = {
  component: string
}

type CssStyle = {
  name: string
  annotation: string
  docs: string
}

export const ComponentCssVariables = ({ component }: ComponentCssVariablesProps): React.ReactElement => {
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

  const styles = (componentInfo.styles || []) as CssStyle[]

  if (styles.length === 0) {
    return (
      <div className="sb-unstyled">
        <h2 className="title text-2xl mb-normal">CSS Variables</h2>
        <div className="my-large p-large bg-grey-light radius">
          <p className="text-small">No CSS variables defined for this component.</p>
        </div>
      </div>
    )
  }

  const exampleVars = styles.slice(0, 2)
  const exampleCode = `${componentTag} {\n${exampleVars.map(s => `  ${s.name}: /* your value */;`).join('\n')}\n}`

  return (
    <div className="sb-unstyled my-large">
      <h2 className="title text-2xl mb-normal">CSS Variables</h2>
      <p className="text-normal mb-normal">
        Use these CSS variables to adjust the appearance of individual component instances. For global theming, use
        design tokens instead.
      </p>
      <table className="table w-full is-striped mb-large">
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
              <td className="text-small">{style.docs}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-normal mb-small">
        Set variables directly on the element to override styles for a specific instance:
      </p>
      <Source dark language="css" code={exampleCode} />
    </div>
  )
}
