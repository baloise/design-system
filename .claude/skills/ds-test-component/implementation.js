const fs = require('fs')
const path = require('path')
const { globSync } = require('glob')

const REPO_ROOT = path.resolve(__dirname, '../../..')

async function testComponent(componentName) {
  const componentPath = path.join(REPO_ROOT, 'packages/core/src/components', componentName)

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component not found: ${componentName}`)
  }

  const tsxFiles = globSync(`${componentPath}/**/*.tsx`).filter(
    f => !f.includes('.spec.') && !f.includes('.visual.') && !f.includes('.a11y.'),
  )

  if (tsxFiles.length === 0) {
    throw new Error(`No .tsx files found in ${componentName}`)
  }

  console.log(`\n📋 Preparing to generate tests for: ${componentName}\n`)

  // Parse component
  const componentInfo = parseComponent(tsxFiles[0])

  console.log(`Detected:
  • Props: ${componentInfo.props.length} (${componentInfo.enumProps.length} enums, ${componentInfo.stateProps.length} states)
  • Events: ${componentInfo.events.length}
  • Slots: ${componentInfo.slots.length}
  • Parts: ${componentInfo.parts.length}
  • Utils: ${componentInfo.hasUtils ? 'Yes' : 'No'}\n`)

  // Show checklists
  const visualProps = await promptVisualProps(componentInfo.enumProps, componentInfo.stateProps)
  const slotsToDemo = await promptSlots(componentInfo.slots)

  // Generate files
  const files = generateTestFiles(componentName, componentInfo, visualProps, slotsToDemo)

  // Report
  reportGeneration(componentName, files)
}

function parseComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')

  return {
    path: filePath,
    props: extractProps(content),
    enumProps: extractEnumProps(content),
    stateProps: extractStateProps(content),
    events: extractEvents(content),
    slots: extractSlots(content),
    parts: extractParts(content),
    hasUtils: checkHasUtils(filePath),
  }
}

function extractProps(content) {
  const propPattern = /@Prop\s*\({[^}]*}\)?\s*readonly\s+(\w+)\s*:\s*([^\s=]+)/g
  const props = []
  let match

  while ((match = propPattern.exec(content)) !== null) {
    props.push({ name: match[1], type: match[2] })
  }

  return props
}

function extractEnumProps(content) {
  // Simplified: look for props with pipe-separated values (enums)
  const props = extractProps(content)
  return props.filter(p => p.type.includes('|') || (p.type !== 'string' && p.type !== 'boolean' && p.type !== 'number'))
}

function extractStateProps(content) {
  const stateNames = ['disabled', 'loading', 'invalid', 'checked', 'selected', 'open', 'readonly', 'required']
  const props = extractProps(content)
  return props.filter(p => stateNames.includes(p.name))
}

function extractEvents(content) {
  const eventPattern = /@Event\s*\(\)\s*(\w+)/g
  const events = []
  let match

  while ((match = eventPattern.exec(content)) !== null) {
    events.push(match[1])
  }

  return events
}

function extractSlots(content) {
  const slotPattern = /<slot\s+(?:name="([^"]+)")?\s*\/>/g
  const slots = []
  let match
  const seen = new Set()

  // Add default slot
  if (/<slot\s*\/>/.test(content)) {
    slots.push({ name: 'default', type: 'default' })
    seen.add('default')
  }

  while ((match = slotPattern.exec(content)) !== null) {
    const name = match[1] || 'default'
    if (!seen.has(name)) {
      slots.push({ name, type: 'named' })
      seen.add(name)
    }
  }

  return slots
}

function extractParts(content) {
  const partPattern = /@part\s+(\w+)/g
  const parts = []
  let match

  while ((match = partPattern.exec(content)) !== null) {
    parts.push(match[1])
  }

  return parts
}

function checkHasUtils(filePath) {
  const dir = path.dirname(filePath)
  const utilFile = path.join(dir, path.basename(filePath, '.tsx') + '.util.ts')
  return fs.existsSync(utilFile)
}

async function promptVisualProps(enumProps, stateProps) {
  // For now, return all (interactive prompts would be implemented in actual CLI)
  return {
    enums: enumProps,
    states: stateProps,
  }
}

async function promptSlots(slots) {
  // For now, return all (interactive prompts would be implemented)
  return slots
}

function generateTestFiles(componentName, componentInfo, visualProps, slotsToDemo) {
  const testDir = path.join(REPO_ROOT, 'packages/core/src/components', componentName, 'test')

  const poDir = path.join(REPO_ROOT, 'packages/playwright/src/lib/components')

  const files = []

  // Generate visual.html
  const visualHtml = generateVisualHtml(componentName, visualProps, slotsToDemo)
  const visualHtmlPath = path.join(testDir, `${componentName}.visual.html`)
  // fs.writeFileSync(visualHtmlPath, visualHtml); // Would write in real implementation
  files.push({ path: visualHtmlPath, content: visualHtml, type: 'visual' })

  // Generate visual.play.ts
  const visualPlayTs = generateVisualPlayTs(componentName, visualProps, slotsToDemo)
  const visualPlayTsPath = path.join(testDir, `${componentName}.visual.play.ts`)
  files.push({ path: visualPlayTsPath, content: visualPlayTs, type: 'visual' })

  // Generate a11y.play.ts
  const a11yPlayTs = generateA11yPlayTs(componentName, visualProps, slotsToDemo)
  const a11yPlayTsPath = path.join(testDir, `${componentName}.a11y.play.ts`)
  files.push({ path: a11yPlayTsPath, content: a11yPlayTs, type: 'a11y' })

  // Generate component.play.ts
  const componentPlayTs = generateComponentPlayTs(componentName, componentInfo)
  const componentPlayTsPath = path.join(testDir, `${componentName}.component.play.ts`)
  files.push({ path: componentPlayTsPath, content: componentPlayTs, type: 'component' })

  // Generate page object
  const poTs = generatePageObject(componentName, componentInfo)
  const poTsPath = path.join(poDir, `${componentName}.po.ts`)
  files.push({ path: poTsPath, content: poTs, type: 'page-object' })

  // Generate util tests if applicable
  if (componentInfo.hasUtils) {
    const utilSpecTs = generateUtilSpecTs(componentName)
    const utilSpecTsPath = path.join(testDir, `${componentName}.util.spec.ts`)
    files.push({ path: utilSpecTsPath, content: utilSpecTs, type: 'util' })
  }

  return files
}

function generateVisualHtml(componentName, visualProps, slotsToDemo) {
  return `<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <link rel="stylesheet" href="/assets/section.css" />
    <link rel="stylesheet" href="/assets/css/design-system.local.min.css" />
    <script type="module" src="/build/design-system.esm.js"></script>
    <script nomodule src="/build/design-system.js"></script>
  </head>
  <body>
    <main class="container">
      <!-- Basic -->
      <section data-testid="basic">
        <span>Basic</span>
        <ds-${componentName}>Default Content</ds-${componentName}>
      </section>

      <!-- Variants generated from props would go here -->
      <!-- States: disabled, loading, invalid, etc. -->
      <!-- Slots: icon, label, badge, etc. -->
    </main>
  </body>
</html>`
}

function generateVisualPlayTs(componentName, visualProps, slotsToDemo) {
  return `import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = '${componentName}'
const VARIANTS = [
  'basic',
  // Add more variants
]

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(\`/components/\${TAG}/test/\${TAG}.style.html\`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(\`style-\${variant}\`))
    })
  })
})

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(\`/components/\${TAG}/test/\${TAG}.visual.html\`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
`
}

function generateA11yPlayTs(componentName, visualProps, slotsToDemo) {
  return `import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(\`<ds-${componentName}>Content</ds-${componentName}>\`)
  await a11y('ds-${componentName}')
})

// Add comprehensive a11y tests for all variants, colors, states
`
}

function generateComponentPlayTs(componentName, componentInfo) {
  let content = `import { Ds${componentName.charAt(0).toUpperCase() + componentName.slice(1)}, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
`

  // Event tests
  if (componentInfo.events.length > 0) {
    content += `\n  test.describe('events', () => {`
    componentInfo.events.forEach(event => {
      content += `
    test('should fire ${event} event', async ({ page }) => {
      await page.mount(\`<ds-${componentName}>Content</ds-${componentName}>\`)
      const ds${componentName.charAt(0).toUpperCase() + componentName.slice(1)} = new Ds${componentName.charAt(0).toUpperCase() + componentName.slice(1)}(page.locator('ds-${componentName}'))
      const spy = await ds${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.el.spyOnEvent('${event}')

      // TODO: trigger action that fires ${event}

      expect(spy).toHaveReceivedEventTimes(1)
    })`
    })
    content += `\n  })\n`
  }

  // State tests
  if (componentInfo.stateProps.length > 0) {
    content += `\n  test.describe('states', () => {`
    componentInfo.stateProps.forEach(state => {
      content += `
    test('should handle ${state} state', async ({ page }) => {
      await page.mount(\`<ds-${componentName} ${state}>Content</ds-${componentName}>\`)
      const ds${componentName.charAt(0).toUpperCase() + componentName.slice(1)} = new Ds${componentName.charAt(0).toUpperCase() + componentName.slice(1)}(page.locator('ds-${componentName}'))

      // TODO: add assertions for ${state} state
    })`
    })
    content += `\n  })\n`
  }

  content += `})
`

  return content
}

function generatePageObject(componentName, componentInfo) {
  const className = componentName.charAt(0).toUpperCase() + componentName.slice(1)

  let content = `import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class Ds${className} extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

`

  // Part locators
  if (componentInfo.parts.length > 0) {
    componentInfo.parts.forEach(part => {
      content += `  readonly ${part} = this.el.locator('[part="${part}"]')\n`
    })
    content += '\n'
  }

  // Action methods
  content += `  async click() {
    await this.el.click()
  }

`

  // State assertions
  if (componentInfo.stateProps.length > 0) {
    componentInfo.stateProps.forEach(state => {
      const methodName = state.charAt(0).toUpperCase() + state.slice(1)
      content += `  async assertToBe${methodName}() {
    await expect(this.el).toHaveAttribute('${state}')
  }

`
    })
  }

  content += `  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
`

  return content
}

function generateUtilSpecTs(componentName) {
  return `import { describe, it, expect } from 'vitest'
// import { someUtil } from './${componentName}.util'

describe('${componentName} utils', () => {
  // Add comprehensive unit tests here
  // Include happy paths, edge cases, and type variations
})
`
}

function reportGeneration(componentName, files) {
  console.log(`📝 Test files to be generated:\n`)

  files.forEach(file => {
    const lines = file.content.split('\n').length
    console.log(`  ✓ ${path.basename(file.path)} (${lines} lines, ${file.type})`)
  })

  console.log(`\n✅ Ready to generate ${files.length} test files`)
  console.log(`\nNext steps:\n`)
  console.log(`  1. Review the generated files`)
  console.log(`  2. Fill in event handlers and state assertions`)
  console.log(`  3. Run visual tests: pnpm play -- --grep "${componentName}"`)
  console.log(`  4. Run a11y tests: pnpm play -- --grep "a11y"`)
  console.log(`  5. Run unit tests: pnpm test -- ${componentName}.util.spec.ts\n`)
}

module.exports = {
  testComponent,
}
