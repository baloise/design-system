#!/usr/bin/env node

/**
 * ds-sync-component-tests — Full Implementation
 *
 * Generates TDD test infrastructure:
 * - Page Object with typed actions/assertions
 * - Component interaction tests with event spies
 * - Util unit tests with branch coverage
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const CORE_PATH = path.join(PROJECT_ROOT, 'packages/core')
const COMPONENTS_PATH = path.join(CORE_PATH, 'src/components')
const PLAYWRIGHT_PATH = path.join(PROJECT_ROOT, 'packages/playwright/src/lib/components')

// ============================================================================
// ANALYSIS
// ============================================================================

function analyzeComponent(componentName) {
  const componentDir = path.join(COMPONENTS_PATH, componentName)
  const componentFile = path.join(componentDir, `${componentName}.tsx`)
  const interfacesFile = path.join(componentDir, `${componentName}.interfaces.ts`)
  const utilFile = path.join(componentDir, `${componentName}.util.ts`)

  if (!fs.existsSync(componentFile)) {
    throw new Error(`Component file not found: ${componentFile}`)
  }

  const content = fs.readFileSync(componentFile, 'utf-8')
  const interfacesContent = fs.existsSync(interfacesFile) ? fs.readFileSync(interfacesFile, 'utf-8') : ''

  // Extract @Event() declarations
  const eventRegex = /@Event\(\)\s+(\w+)!:\s*EventEmitter<(\w+)>/g
  const events = []
  let match
  while ((match = eventRegex.exec(content)) !== null) {
    events.push({
      name: match[1],
      detailType: match[2],
    })
  }

  // Extract @Prop() declarations
  const propRegex = /@Prop\([^)]*\)\s+(?:readonly\s+)?(\w+):/g
  const props = new Set()
  while ((match = propRegex.exec(content)) !== null) {
    props.add(match[1])
  }

  // Extract @Method() declarations
  const methodRegex = /@Method\(\)\s+async\s+(\w+)/g
  const methods = []
  while ((match = methodRegex.exec(content)) !== null) {
    methods.push(match[1])
  }

  // Detect form component
  const isFormComponent =
    content.includes('FormControlInterface') ||
    content.includes('FormControl') ||
    props.has('name') ||
    props.has('value')

  // Detect shadow parts
  const shadowPartRegex = /\[part="([^"]+)"\]/g
  const shadowParts = new Set()
  while ((match = shadowPartRegex.exec(content)) !== null) {
    shadowParts.add(match[1])
  }

  // Check for util file
  const hasUtil = fs.existsSync(utilFile)
  let utilFunctions = []
  if (hasUtil) {
    const utilContent = fs.readFileSync(utilFile, 'utf-8')
    const utilRegex = /export\s+(?:function|const)\s+(\w+)/g
    while ((match = utilRegex.exec(utilContent)) !== null) {
      utilFunctions.push(match[1])
    }
  }

  return {
    componentName,
    events,
    props: Array.from(props),
    methods,
    isFormComponent,
    shadowParts: Array.from(shadowParts),
    hasUtil,
    utilFunctions,
  }
}

// ============================================================================
// PAGE OBJECT GENERATION
// ============================================================================

function generatePageObject(componentName, analysis) {
  const className = `Ds${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`

  const lines = [
    `import { expect, Locator } from '@playwright/test'`,
    `import { E2ELocator } from '../page/utils'`,
    `import { PageObject } from './page-object'`,
    ``,
    `export class ${className} extends PageObject {`,
  ]

  // Add locator declarations
  if (analysis.shadowParts.length > 0) {
    for (const part of analysis.shadowParts) {
      const propName = part.replace(/-/g, '_')
      lines.push(`  readonly ${propName}: Locator`)
    }
  }

  lines.push(``, `  constructor(el: E2ELocator) {`, `    super(el)`)

  // Initialize locators
  if (analysis.shadowParts.length > 0) {
    for (const part of analysis.shadowParts) {
      const propName = part.replace(/-/g, '_')
      lines.push(`    this.${propName} = el.locator('[part="${part}"]')`)
    }
  }

  lines.push(`  }`, ``)

  // Action methods
  const actionMethods = generateActionMethods(analysis)
  lines.push(...actionMethods)

  // Assertion methods
  const assertionMethods = generateAssertionMethods(analysis)
  lines.push(...assertionMethods)

  lines.push(`}`)

  return lines.join('\n')
}

function generateActionMethods(analysis) {
  const methods = []

  methods.push(`  // Action methods`)

  // Click
  methods.push(`  async click() {`)
  methods.push(`    await this.el.click()`)
  methods.push(`  }`)
  methods.push(``)

  // Focus/Blur
  methods.push(`  async focus() {`)
  methods.push(`    await this.el.focus()`)
  methods.push(`  }`)
  methods.push(``)

  methods.push(`  async blur() {`)
  methods.push(`    await this.el.blur()`)
  methods.push(`  }`)
  methods.push(``)

  // Check/Uncheck (if relevant)
  if (analysis.props.includes('checked')) {
    methods.push(`  async check() {`)
    methods.push(`    await this.el.check()`)
    methods.push(`  }`)
    methods.push(``)

    methods.push(`  async uncheck() {`)
    methods.push(`    await this.el.uncheck()`)
    methods.push(`  }`)
    methods.push(``)
  }

  // Fill (if form component)
  if (analysis.isFormComponent) {
    methods.push(`  async fill(value: string) {`)
    methods.push(`    const input = this.el.locator('[part="input"]')`)
    methods.push(`    await input.fill(value)`)
    methods.push(`  }`)
    methods.push(``)
  }

  return methods
}

function generateAssertionMethods(analysis) {
  const methods = []

  methods.push(`  // Assertion methods`)

  methods.push(`  async assertToBeVisible() {`)
  methods.push(`    await expect(this.el).toBeVisible()`)
  methods.push(`  }`)
  methods.push(``)

  methods.push(`  async assertToBeDisabled() {`)
  methods.push(`    await expect(this.el).toHaveAttribute('disabled')`)
  methods.push(`  }`)
  methods.push(``)

  methods.push(`  async assertToBeEnabled() {`)
  methods.push(`    await expect(this.el).not.toHaveAttribute('disabled')`)
  methods.push(`  }`)
  methods.push(``)

  if (analysis.props.includes('checked')) {
    methods.push(`  async assertToBeChecked() {`)
    methods.push(`    await expect(this.el).toHaveAttribute('checked')`)
    methods.push(`  }`)
    methods.push(``)

    methods.push(`  async assertToBeUnchecked() {`)
    methods.push(`    await expect(this.el).not.toHaveAttribute('checked')`)
    methods.push(`  }`)
    methods.push(``)
  }

  if (analysis.props.includes('value')) {
    methods.push(`  async assertValue(value: string) {`)
    methods.push(`    const input = this.el.locator('[part="input"]')`)
    methods.push(`    await expect(input).toHaveValue(value)`)
    methods.push(`  }`)
    methods.push(``)
  }

  methods.push(`  async assertToContainText(text: string) {`)
  methods.push(`    await expect(this.el).toContainText(text)`)
  methods.push(`  }`)

  return methods
}

// ============================================================================
// COMPONENT TEST GENERATION
// ============================================================================

function generateComponentTest(componentName, analysis) {
  const className = `Ds${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`

  const lines = [`import { ${className}, expect, test } from '@baloise/ds-playwright'`, ``]

  // Event tests
  for (const event of analysis.events) {
    lines.push(`test.describe('${event.name}', () => {`)
    lines.push(`  test('should fire ${event.name} with correct detail', async ({ page }) => {`)
    lines.push(`    await page.mount(\`<ds-${componentName}>${componentName}</ds-${componentName}>\`)`)
    lines.push(`    const component = new ${className}(page.locator('ds-${componentName}'))`)
    lines.push(`    const spy = await component.el.spyOnEvent('${event.name}')`)
    lines.push(``)
    lines.push(`    // TODO: Trigger action that fires ${event.name}`)
    lines.push(`    // await component.click()`)
    lines.push(``)
    lines.push(`    expect(spy).toHaveReceivedEventTimes(1)`)
    lines.push(`    // TODO: Define expected detail for ${event.detailType}`)
    lines.push(`    // expect(spy).toHaveReceivedEventDetail({ ... })`)
    lines.push(`  })`)
    lines.push(`})`)
    lines.push(``)
  }

  // Disabled test
  if (analysis.props.includes('disabled')) {
    lines.push(`test.describe('disabled', () => {`)
    lines.push(`  test('native input should be disabled', async ({ page }) => {`)
    lines.push(`    await page.mount(\`<ds-${componentName} disabled>${componentName}</ds-${componentName}>\`)`)
    lines.push(`    const component = new ${className}(page.locator('ds-${componentName}'))`)
    lines.push(`    const spy = await component.el.spyOnEvent('dsChange')`)
    lines.push(``)
    lines.push(`    await component.assertToBeDisabled()`)
    lines.push(`    expect(spy).toHaveReceivedEventTimes(0)`)
    lines.push(`  })`)
    lines.push(`})`)
    lines.push(``)
  }

  // Readonly test
  if (analysis.props.includes('readonly')) {
    lines.push(`test.describe('readonly', () => {`)
    lines.push(`  test('should be readonly', async ({ page }) => {`)
    lines.push(`    await page.mount(\`<ds-${componentName} readonly>${componentName}</ds-${componentName}>\`)`)
    lines.push(`    const component = new ${className}(page.locator('ds-${componentName}'))`)
    lines.push(``)
    lines.push(`    // TODO: Add readonly assertions`)
    lines.push(`  })`)
    lines.push(`})`)
    lines.push(``)
  }

  // Form reset test
  if (analysis.isFormComponent && analysis.props.includes('value')) {
    lines.push(`test.describe('form reset', () => {`)
    lines.push(`  test('should reset to initial state', async ({ page }) => {`)
    lines.push(`    await page.mount(\``)
    lines.push(`      <form>`)
    lines.push(`        <ds-${componentName} name="field" value="initial">${componentName}</ds-${componentName}>`)
    lines.push(`        <button type="reset" data-testid="reset">Reset</button>`)
    lines.push(`      </form>`)
    lines.push(`    \`)`)
    lines.push(`    const component = new ${className}(page.locator('ds-${componentName}'))`)
    lines.push(``)
    lines.push(`    await component.fill('changed')`)
    lines.push(`    await page.getByTestId('reset').click()`)
    lines.push(``)
    lines.push(`    await component.assertValue('initial')`)
    lines.push(`  })`)
    lines.push(`})`)
    lines.push(``)
  }

  // Method tests
  for (const method of analysis.methods) {
    lines.push(`test.describe('${method}', () => {`)
    lines.push(`  test('should call ${method} and update state', async ({ page }) => {`)
    lines.push(`    await page.mount(\`<ds-${componentName}>${componentName}</ds-${componentName}>\`)`)
    lines.push(`    const component = new ${className}(page.locator('ds-${componentName}'))`)
    lines.push(``)
    lines.push(`    // TODO: Call component.el.evaluate((el) => el.${method}())`)
    lines.push(`    // TODO: Assert state changed`)
    lines.push(`  })`)
    lines.push(`})`)
    lines.push(``)
  }

  return lines.join('\n')
}

// ============================================================================
// UTIL TEST GENERATION
// ============================================================================

function generateUtilTest(componentName, utilFunctions) {
  const lines = [`import { /* TODO: import functions */ } from '../${componentName}.util'`, ``]

  for (const func of utilFunctions) {
    lines.push(`describe('${func}', () => {`)
    lines.push(`  it('TODO: happy path', () => {`)
    lines.push(`    // TODO: Define expected output`)
    lines.push(`    expect(${func}(/* args */)).toBe(/* expected */)`)
    lines.push(`  })`)
    lines.push(``)
    lines.push(`  it('TODO: handles edge case - empty/zero/negative', () => {`)
    lines.push(`    // TODO: Define expected output for edge case`)
    lines.push(`    expect(${func}(/* edge case */)).toBe(/* expected */)`)
    lines.push(`  })`)
    lines.push(`})`)
    lines.push(``)
  }

  return lines.join('\n')
}

// ============================================================================
// FILE OPERATIONS
// ============================================================================

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function formatFile(filePath) {
  try {
    execSync(`npx prettier --write "${filePath}" 2>/dev/null || true`)
  } catch (e) {
    // Prettier might fail, that's ok
  }
}

function updateComponentIndex(componentName) {
  const indexPath = path.join(PLAYWRIGHT_PATH, 'index.ts')

  if (!fs.existsSync(indexPath)) {
    // Create index.ts if it doesn't exist
    fs.writeFileSync(indexPath, `export * from './${componentName}.po'\n`)
    return
  }

  let content = fs.readFileSync(indexPath, 'utf-8')

  // Check if export already exists
  if (content.includes(`from './${componentName}.po'`)) {
    return // Already exported
  }

  // Add export at the end
  if (!content.endsWith('\n')) {
    content += '\n'
  }

  content += `export * from './${componentName}.po'\n`

  fs.writeFileSync(indexPath, content)
  formatFile(indexPath)
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: ds-sync-component-tests <component-name>')
    process.exit(1)
  }

  const componentName = args[0]

  try {
    console.log(`\n✓ Analyzing ds-${componentName}`)

    const analysis = analyzeComponent(componentName)

    console.log(`  Events: ${analysis.events.length}`)
    console.log(`  Props: ${analysis.props.length}`)
    console.log(`  Methods: ${analysis.methods.length}`)
    console.log(`  Type: ${analysis.isFormComponent ? 'Form component' : 'Non-form component'}`)
    console.log(`  Util file: ${analysis.hasUtil ? 'yes' : 'no'}`)

    console.log(`\n✨ Generating TDD test infrastructure...`)

    // Generate Page Object
    console.log(`  Generating Page Object...`)
    const poContent = generatePageObject(componentName, analysis)
    const poPath = path.join(PLAYWRIGHT_PATH, `${componentName}.po.ts`)
    ensureDir(path.dirname(poPath))
    fs.writeFileSync(poPath, poContent)
    formatFile(poPath)
    console.log(`  ✓ Created ${path.relative(PROJECT_ROOT, poPath)}`)

    // Generate Component Test
    console.log(`  Generating Component Test...`)
    const testContent = generateComponentTest(componentName, analysis)
    const testPath = path.join(COMPONENTS_PATH, componentName, 'test', `${componentName}.component.play.ts`)
    ensureDir(path.dirname(testPath))
    fs.writeFileSync(testPath, testContent)
    formatFile(testPath)
    console.log(`  ✓ Created ${path.relative(PROJECT_ROOT, testPath)}`)

    // Generate Util Test (if util exists)
    if (analysis.hasUtil) {
      console.log(`  Generating Util Test...`)
      const utilTestContent = generateUtilTest(componentName, analysis.utilFunctions)
      const utilTestPath = path.join(COMPONENTS_PATH, componentName, 'test', `${componentName}.util.spec.ts`)
      fs.writeFileSync(utilTestPath, utilTestContent)
      formatFile(utilTestPath)
      console.log(`  ✓ Created ${path.relative(PROJECT_ROOT, utilTestPath)}`)
    }

    // Update index.ts
    console.log(`  Updating components index...`)
    updateComponentIndex(componentName)
    console.log(`  ✓ Updated ${path.relative(PROJECT_ROOT, path.join(PLAYWRIGHT_PATH, 'index.ts'))}`)

    // Summary
    console.log(`\n📋 Summary:`)
    console.log(`   Component: ds-${componentName}`)
    console.log(`   Type: ${analysis.isFormComponent ? 'Form component' : 'Non-form component'}`)
    console.log(`   Page Object: ✓`)
    console.log(
      `   Component Test: ✓ (${analysis.events.length} events + ${analysis.methods.length} methods + form reset)`,
    )
    if (analysis.hasUtil) {
      console.log(`   Util Test: ✓ (${analysis.utilFunctions.length} functions)`)
    }

    console.log(`\n⚠️  Coverage verification:`)
    console.log(`   TODO: Fill in event detail types`)
    console.log(`   TODO: Fill in expected output values`)
    console.log(`   TODO: Add edge case coverage`)

    console.log(`\n✅ Ready for TDD!`)
    console.log(`   Next: Fill TODOs, run tests, implement to make them pass`)
    console.log(`   Run: npm run play -- --grep="${componentName}"`)
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
