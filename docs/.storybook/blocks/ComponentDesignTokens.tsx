import { Source } from '@storybook/addon-docs/blocks'
import React from 'react'
import componentsData from '../../src/assets/data/components.json'
import { Clipboard } from './Clipboard'

type ComponentDesignTokensProps = {
  component: string
}

type InheritanceEntry = {
  cssVar: string
  figmaName: string
}

type Token = {
  name: string
  cssVarName: string
  value: string
  nativeValue: string
  inheritance: InheritanceEntry[]
  path: string[]
}

const isColor = (value: string) => /^#[0-9a-fA-F]{3,8}$/.test(value.trim())

export const ComponentDesignTokens = ({ component }: ComponentDesignTokensProps): React.ReactElement => {
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

  const tokens = (componentInfo.tokens || []) as Token[]

  if (tokens.length === 0) {
    return (
      <div className="sb-unstyled">
        <h2 className="title text-2xl mb-normal">Design Tokens</h2>
        <div className="my-large p-large bg-grey-light radius">
          <p className="text-small">No design tokens defined for this component.</p>
        </div>
      </div>
    )
  }

  const exampleTokens = tokens.slice(0, 2)
  const exampleCode = `:root {\n${exampleTokens.map(t => `  ${t.cssVarName}: /* your value */;`).join('\n')}\n}`

  return (
    <div className="sb-unstyled my-large">
      <h2 className="title text-2xl mb-normal">Design Tokens</h2>
      <p className="text-normal mb-normal">
        Design tokens define the default appearance of components. Override them on <code>:root</code> to apply a
        consistent theme globally — unlike CSS variables, which only affect individual instances.
      </p>
      <table className="table w-full mb-large">
        <thead>
          <tr>
            <th>CSS Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        {tokens.map((token, index) => {
          const color = isColor(token.nativeValue)
          // Show the inheritance chain up to (not including) the component token itself
          const chain = (token.inheritance || []).slice(0, -1)
          const bg = index % 2 === 0 ? 'var(--ds-color-white)' : 'var(--ds-color-grey-2)'

          return (
            <tbody key={index}>
              <tr style={{ backgroundColor: bg }}>
                <td style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '4px', paddingTop: '12px' }}>
                  <Clipboard label={token.cssVarName} />
                </td>
                <td style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '4px', paddingTop: '12px' }}>
                  <div className="flex gap-small align-items-center">
                    {color && (
                      <div
                        className="radius flex-shrink-0"
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: token.nativeValue,
                          border: '1px solid var(--ds-color-grey-3)',
                        }}
                      />
                    )}
                    <Clipboard label={token.nativeValue} />
                    {/* <code className="text-small">{token.nativeValue}</code> */}
                  </div>
                </td>
              </tr>
              <tr style={{ backgroundColor: bg }}>
                <td className="text-x-small text-primary-light" style={{ paddingTop: '4px', paddingBottom: '12px' }}>
                  {token.name}
                </td>
                <td className="text-x-small text-primary-light" style={{ paddingTop: '4px', paddingBottom: '12px' }}>
                  {chain.map((entry, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span className="mx-x-small">→</span>}
                      <span title={entry.cssVar}>{entry.figmaName}</span>
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
      <p className="text-normal mb-small">Override globally by setting tokens on the :root selector:</p>
      <Source dark language="css" code={exampleCode} />
    </div>
  )
}
