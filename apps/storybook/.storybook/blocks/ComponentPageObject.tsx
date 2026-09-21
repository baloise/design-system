import { Source } from '@storybook/addon-docs/blocks'
import React from 'react'
import componentsData from '../../src/assets/data/components.json'

type ComponentPageObjectProps = {
  component: string
}

interface POParam {
  name: string
  type: string
}
interface POMethod {
  name: string
  params: POParam[]
  docs: string
}
interface POLocator {
  name: string
  type: string
  docs: string
}
interface PageObjectData {
  class: string
  import: string
  locators: POLocator[]
  actions: POMethod[]
  assertions: POMethod[]
}

const findComponent = (name: string) => {
  const tag = name.startsWith('ds-') ? name : `ds-${name}`
  return (componentsData.components as Array<any>).find(c => c.tag === tag || c.tag === name)
}

const renderParams = (params: POParam[]): string =>
  params.length ? params.map(p => `${p.name}: ${p.type}`).join(', ') : '—'

const MethodTable = ({ title, methods }: { title: string; methods: POMethod[] }) => (
  <div className="mb-lg">
    <h3 className="ds-title text-xl mb-base mt-lg">{title}</h3>
    {methods.length === 0 ? (
      <p className="text-sm">None defined.</p>
    ) : (
      <table className="ds-table w-full is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Parameters</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((m, i) => (
            <tr key={i}>
              <td>
                <code>{m.name}()</code>
              </td>
              <td className="text-sm">{renderParams(m.params)}</td>
              <td className="text-sm">{m.docs || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)

const generateExampleTest = (tag: string, po: PageObjectData): string => {
  const varName = tag.replace(/^ds-/, '').replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase())
  const firstAction = po.actions[0]
  const firstAssertion = po.assertions[0]

  const actionLine = firstAction
    ? `await ${varName}.${firstAction.name}(${firstAction.params.map(p => `/* ${p.name}: ${p.type} */`).join(', ')})`
    : `// no actions defined`
  const assertionLine = firstAssertion
    ? `await ${varName}.${firstAssertion.name}(${firstAssertion.params.map(p => `/* ${p.name}: ${p.type} */`).join(', ')})`
    : `await ${varName}.assertToBeVisible()`

  return `import { ${po.class}, test, expect } from '${po.import}'

test('example', async ({ page }) => {
  await page.goto('https://example.com')

  const ${varName} = new ${po.class}(page.locator('${tag}'))

  ${actionLine}
  ${assertionLine}
})`
}

const InstallGuide = () => (
  <div className="sb-unstyled my-lg">
    <h2 className="ds-title text-2xl mb-base">Installation</h2>
    <p className="text-base mb-base">Install the Playwright helper package:</p>
    <Source dark language="bash" code="npm install @baloise/ds-playwright" />
    <p className="text-base mt-base mb-base">Replace the standard Playwright import in your test files:</p>
    <Source
      dark
      language="ts"
      code={`// Before\nimport { test, expect } from '@playwright/test'\n\n// After\nimport { test, expect } from '@baloise/ds-playwright'`}
    />
  </div>
)

export const ComponentPageObject = ({ component }: ComponentPageObjectProps): React.ReactElement => {
  const componentInfo = findComponent(component)

  if (!componentInfo) {
    return (
      <div className="sb-unstyled my-lg p-lg bg-orange-2 radius text-orange-dark">Component not found: {component}</div>
    )
  }

  const po: PageObjectData | undefined = componentInfo.pageObject
  const tag = component.startsWith('ds-') ? component : `ds-${component}`

  return (
    <div className="sb-unstyled">
      {po ? (
        <>
          <h2 className="ds-title text-2xl mb-base">Page Object</h2>
          <p className="text-base mb-base">
            Import <code>{po.class}</code> from <code>{po.import}</code> to interact with this component in Playwright
            tests.
          </p>

          {po.locators.length > 0 && (
            <>
              <h3 className="ds-title text-xl mb-base mt-lg">Locators</h3>
              <table className="ds-table w-full is-striped mb-base">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {po.locators.map((loc, i) => (
                    <tr key={i}>
                      <td>
                        <code>{loc.name}</code>
                      </td>
                      <td className="text-sm">{loc.type}</td>
                      <td className="text-sm">{loc.docs || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <MethodTable title="Actions" methods={po.actions} />
          <MethodTable title="Assertions" methods={po.assertions} />

          <h2 className="ds-title text-2xl mb-base mt-xl">Example Test</h2>
          <Source dark language="ts" code={generateExampleTest(tag, po)} />
        </>
      ) : (
        <div className="my-lg p-lg bg-grey-light radius">
          <p className="text-sm">No page object available for this component yet.</p>
        </div>
      )}
      <InstallGuide />
    </div>
  )
}
