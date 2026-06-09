import { Source } from '@storybook/addon-docs/blocks'
import React from 'react'
import componentsData from '../../src/assets/data/components.json'
import tokensData from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import { Clipboard } from './Clipboard'

type ComponentDesignTokensProps = {
  component: string
  tokenType?: 'component' | 'alias'
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

const isColor = (value?: string) => (value ? /^#[0-9a-fA-F]{3,8}$/.test(value.trim()) : false)

// Extract alias tokens for a component by searching for tokens starting with the component name
function extractAliasTokens(
  componentName: string,
): Array<{
  name: string
  cssVarName: string
  value: string
  nativeValue: string
  inheritance: InheritanceEntry[]
  path: string[]
}> {
  const aliasLayer = (tokensData as any)?.['🔗 Alias'] ?? {}

  // Look for category keys that contain the component name
  const tokens: Array<{
    name: string
    cssVarName: string
    value: string
    nativeValue: string
    inheritance: InheritanceEntry[]
    path: string[]
  }> = []

  // Search through alias categories for matching tokens
  for (const [categoryKey, categoryValue] of Object.entries(aliasLayer)) {
    if (typeof categoryValue !== 'object' || !categoryValue) continue

    // Recursively flatten and find tokens with this component name
    const flattenTokens = (obj: any, path: string[] = []): void => {
      for (const [key, val] of Object.entries(obj)) {
        if (typeof val === 'object' && val !== null) {
          if ('$value' in val) {
            // Found a token
            const fullPath = [...path, key]
            const cssVar = (val as any).name || `ds-alias-${fullPath.join('-').toLowerCase()}`
            if (cssVar.includes(componentName.toLowerCase())) {
              const nativeValue = (val as any).$value || ''
              tokens.push({
                name: (val as any).name || cssVar,
                cssVarName: `--${cssVar}`,
                value: nativeValue,
                nativeValue: nativeValue,
                inheritance: [],
                path: fullPath,
              })
            }
          } else {
            flattenTokens(val, [...path, key])
          }
        }
      }
    }

    flattenTokens(categoryValue)
  }

  return tokens
}

export const ComponentDesignTokens = ({
  component,
  tokenType = 'component',
}: ComponentDesignTokensProps): React.ReactElement => {
  const componentName = component.replace(/^ds-/, '').toLowerCase()

  let tokens: Token[] = []
  let title = 'Design Tokens'
  let description =
    'Design tokens define the default appearance of components. Override them on <code>:root</code> to apply a consistent theme globally — unlike CSS variables, which only affect individual instances.'

  if (tokenType === 'alias') {
    // Extract alias tokens for this component
    const aliasTokens = extractAliasTokens(componentName)
    tokens = aliasTokens as Token[]
    title = 'Alias Tokens'
    description =
      'Alias tokens provide semantic names for design decisions. These are the foundation tokens that this component uses, and changing them cascades to all instances.'
  } else {
    // Original component tokens behavior
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

    tokens = (componentInfo.tokens || []) as Token[]
  }

  if (tokens.length === 0) {
    return (
      <div className="sb-unstyled">
        <h2 className="title text-2xl mb-normal">{title}</h2>
        <div className="my-large p-large bg-grey-light radius">
          <p className="text-small">
            No {tokenType === 'alias' ? 'alias' : 'component'} tokens defined for this component.
          </p>
        </div>
      </div>
    )
  }

  const exampleTokens = tokens.slice(0, 2)
  const exampleCode = `:root {\n${exampleTokens.map(t => `  ${t.cssVarName}: /* your value */;`).join('\n')}\n}`

  return (
    <div className="sb-unstyled my-large">
      <h2 className="title text-2xl mb-normal">{title}</h2>
      <p className="text-normal mb-normal" dangerouslySetInnerHTML={{ __html: description }} />
      <table className="table  w-full mb-large">
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
          const bg = index % 2 === 0 ? 'var(--ds-global-color-white)' : 'var(--ds-global-color-grey-2)'

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
              <tr style={{ backgroundColor: bg, borderBottom: '2px solid var(--ds-global-color-grey-3)' }}>
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
