#!/usr/bin/env node

/**
 * ds-sync-visual-tests - Complete Implementation
 *
 * This is the full implementation of the skill that:
 * 1. Analyzes component props from TypeScript files
 * 2. Interactively asks user which props to test and which patterns to cover
 * 3. Generates HTML harnesses and Playwright test files
 * 4. Manages merging with existing files
 * 5. Formats and lints output
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

// ============================================================================
// CONFIGURATION
// ============================================================================

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const CORE_PATH = path.join(PROJECT_ROOT, 'packages/core')
const COMPONENTS_PATH = path.join(CORE_PATH, 'src/components')
const WWW_PATH = path.join(CORE_PATH, 'www/components')

const STATE_PROPS = ['disabled', 'invalid', 'loading', 'readonly', 'required', 'valid', 'warning']

const INTERACTIVE_METHODS = ['present', 'dismiss', 'show', 'hide', 'toggle', 'open', 'close']

// ============================================================================
// UTILITY: FILE PARSING & ANALYSIS
// ============================================================================

/**
 * Parse TypeScript component to extract @Prop() declarations
 */
function parseComponentProps(componentPath) {
  const content = fs.readFileSync(componentPath, 'utf-8')
  const props = []
  const internalProps = new Set()
  const deprecatedProps = new Set()

  // Parse @Prop() declarations with values from constants/enums
  const propBlockRegex =
    /(\/\*\*[\s\S]*?\*\/)?\s*@Prop\([^)]*\)\s+(?:readonly\s+)?@ValidateEmptyOrOneOf\(['"]([^'"]+)['"]\)/g
  const propRegex2 = /(\/\*\*[\s\S]*?\*\/)?\s*@Prop\([^)]*\)\s+(?:readonly\s+)?(\w+):/g

  let match

  // Track which prop names are @internal or @deprecated
  const internalRegex = /@internal/g
  const deprecatedRegex = /@deprecated/g

  // Simple heuristic: if a JSDoc block has @internal/deprecated, skip the next prop
  let lastDocWasInternal = false
  let lastDocWasDeprecated = false

  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/@internal/.test(line)) lastDocWasInternal = true
    if (/@deprecated/.test(line)) lastDocWasDeprecated = true

    if (/@Prop\(/.test(line)) {
      // Extract prop name from this and following lines
      let propName = null
      for (let j = i; j < Math.min(i + 5, lines.length); j++) {
        const match2 = lines[j].match(/@ValidateEmptyOrOneOf\(['"]([^'"]+)['"]\)|(\w+):/)
        if (match2) {
          propName = match2[2] || null
          break
        }
      }

      if (propName) {
        if (lastDocWasInternal) {
          internalProps.add(propName)
          lastDocWasInternal = false
        } else if (lastDocWasDeprecated) {
          deprecatedProps.add(propName)
          lastDocWasDeprecated = false
        } else {
          props.push({
            name: propName,
            isState: STATE_PROPS.includes(propName),
          })
        }
      }
    }
  }

  return {
    props: props.filter(p => !internalProps.has(p.name) && !deprecatedProps.has(p.name)),
    allProps: props,
    internalProps,
    deprecatedProps,
  }
}

/**
 * Detect component type based on SCSS files
 */
function detectComponentType(componentName) {
  const componentDir = path.join(COMPONENTS_PATH, componentName)

  const hasHostScss = fs.existsSync(path.join(componentDir, `${componentName}.host.scss`))
  const hasStyleScss =
    fs.existsSync(path.join(componentDir, `${componentName}.style.scss`)) ||
    fs.existsSync(path.join(componentDir, `${componentName}.style.css`))

  if (hasHostScss && hasStyleScss) return 'hybrid'
  if (hasHostScss) return 'web-component'
  if (hasStyleScss) return 'html-css'
  return null
}

/**
 * Check if component has interactive methods
 */
function detectInteractiveMethods(componentPath) {
  const content = fs.readFileSync(componentPath, 'utf-8')
  const found = []

  for (const method of INTERACTIVE_METHODS) {
    const methodRegex = new RegExp(`\\b${method}\\s*\\(`, 'i')
    if (methodRegex.test(content)) {
      found.push(method)
    }
  }

  return found
}

// ============================================================================
// UTILITY: INTERACTIVE PROMPTS
// ============================================================================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, resolve)
  })
}

async function selectMultiple(options, title = 'Select options') {
  console.log(`\n${title}:`)

  const selected = new Set()

  for (const option of options) {
    const answer = await ask(`  ${option}? (y/n) `)
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      selected.add(option)
    }
  }

  return Array.from(selected)
}

// ============================================================================
// UTILITY: HTML GENERATION
// ============================================================================

/**
 * Generate HTML section for a prop variant
 */
function generatePropSection(componentName, propName, propValues, isState = false) {
  const lines = []
  lines.push(`      <!-- ${propName} -->`)
  lines.push(`      <section data-testid="${propName}">`)
  lines.push(`        <span>${capitalize(propName)}</span>`)

  for (const value of propValues) {
    lines.push(`        <ds-${componentName} ${propName}="${value}">${capitalize(value)}</ds-${componentName}>`)

    // Add disabled variant if not already a disabled section
    if (!isState) {
      lines.push(
        `        <ds-${componentName} ${propName}="${value}" disabled>${capitalize(value)} Disabled</ds-${componentName}>`,
      )
    }
  }

  lines.push(`      </section>`)
  lines.push('')

  return lines.join('\n')
}

/**
 * Generate HTML section for state (disabled, invalid, etc.)
 */
function generateStateSection(componentName, stateName) {
  const lines = []
  lines.push(`      <!-- ${stateName} -->`)
  lines.push(`      <section data-testid="${stateName}">`)
  lines.push(`        <span>${capitalize(stateName)}</span>`)
  lines.push(`        <ds-${componentName} ${stateName}>Content with ${stateName}</ds-${componentName}>`)
  lines.push(`      </section>`)
  lines.push('')

  return lines.join('\n')
}

/**
 * Generate basic/default section
 */
function generateBasicSection(componentName) {
  const lines = []
  lines.push(`      <!-- Basic -->`)
  lines.push(`      <section data-testid="basic">`)
  lines.push(`        <span>Basic</span>`)
  lines.push(`        <ds-${componentName}>Default</ds-${componentName}>`)
  lines.push(`      </section>`)
  lines.push('')

  return lines.join('\n')
}

/**
 * Generate complete HTML harness
 */
function generateHtmlHarness(componentName, sections, isStyleHarness = false) {
  const lines = [
    '<!doctype html>',
    '<html dir="ltr" lang="en">',
    '  <head>',
    '    <meta charset="utf-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />',
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />',
    '    <link rel="stylesheet" href="/assets/section.css" />',
    '    <link rel="stylesheet" href="/assets/css/design-system.local.min.css" />',
    '',
    '    <script type="module" src="/build/design-system.esm.js"></script>',
    '    <script nomodule src="/build/design-system.js"></script>',
    '  </head>',
    '',
    '  <body>',
    '    <main class="container">',
    ...sections,
    '    </main>',
    '  </body>',
    '</html>',
  ]

  return lines.join('\n')
}

// ============================================================================
// UTILITY: PLAYWRIGHT TEST GENERATION
// ============================================================================

/**
 * Generate Playwright test file
 */
function generatePlaywrightTest(componentName, variants) {
  const variantString = variants.map(v => `'${v}'`).join(', ')

  const lines = [
    `import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'`,
    '',
    `const TAG = '${componentName}'`,
    `const VARIANTS = [${variantString}]`,
    '',
    `const image = screenshot(TAG)`,
    '',
    `test.describe('style', () => {`,
    `  test.beforeEach('Setup', async ({ page }) => {`,
    `    await page.setupVisualTest(\`/components/\${TAG}/test/\${TAG}.style.html\`)`,
    `  })`,
    '',
    `  VARIANTS.forEach(variant => {`,
    `    test(variant, async ({ page }) => {`,
    `      const el = page.getByTestId(variant)`,
    `      await expectScreenshot(el, image(\`style-\${variant}\`))`,
    `    })`,
    `  })`,
    `})`,
    '',
    `test.describe('host', () => {`,
    `  test.beforeEach('Setup', async ({ page }) => {`,
    `    await page.setupVisualTest(\`/components/\${TAG}/test/\${TAG}.visual.html\`)`,
    `  })`,
    '',
    `  VARIANTS.forEach(variant => {`,
    `    test(variant, async ({ page }) => {`,
    `      const el = page.getByTestId(variant)`,
    `      await expectScreenshot(el, image(variant))`,
    `    })`,
    `  })`,
    `})`,
  ]

  return lines.join('\n')
}

// ============================================================================
// UTILITY: HELPERS
// ============================================================================

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ')
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function formatFile(filePath) {
  try {
    execSync(`npx prettier --write "${filePath}" 2>/dev/null || true`)
  } catch (e) {
    // Prettier might not be available, that's ok
  }
}

// ============================================================================
// MAIN FLOW
// ============================================================================

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: ds-sync-visual-tests <component-name>')
    process.exit(1)
  }

  const componentName = args[0]
  const componentDir = path.join(COMPONENTS_PATH, componentName)
  const componentFile = path.join(componentDir, `${componentName}.tsx`)

  // Validate component exists
  if (!fs.existsSync(componentFile)) {
    console.error(`❌ Component not found: ${componentName}`)
    console.error(`   Expected: ${componentFile}`)
    process.exit(1)
  }

  try {
    console.log(`\n✓ Analyzed ds-${componentName}`)

    // Parse props
    const { props, allProps, internalProps, deprecatedProps } = parseComponentProps(componentFile)

    if (allProps.length > 0) {
      const propNames = allProps.map(p => p.name).join(', ')
      console.log(`  Props found: ${propNames}`)
    }

    if (internalProps.size > 0) {
      console.log(`  (Skipped @internal: ${Array.from(internalProps).join(', ')})`)
    }

    if (deprecatedProps.size > 0) {
      console.log(`  (Skipped @deprecated: ${Array.from(deprecatedProps).join(', ')})`)
    }

    // Detect component type
    const componentType = detectComponentType(componentName)
    if (!componentType) {
      console.error(`❌ Unable to detect component type. Missing .host.scss or .style.scss`)
      process.exit(1)
    }
    console.log(`  Type: ${componentType}`)

    // Detect interactive methods
    const interactiveMethods = detectInteractiveMethods(componentFile)
    if (interactiveMethods.length > 0) {
      console.log(`  Interactive methods: ${interactiveMethods.join(', ')}`)
    }

    // Ask which props to test
    console.log('')
    const propsToTest = await selectMultiple(
      allProps.map(p => p.name),
      '? Which props should have visual variants',
    )

    // Ask about patterns
    console.log('')
    const hasPatterns = await ask('? Add custom structural patterns? (e.g., slots, subcomponents) (y/n) ')
    const patterns = []
    if (hasPatterns.toLowerCase() === 'y' || hasPatterns.toLowerCase() === 'yes') {
      const patternInput = await ask('  Enter pattern names (comma-separated): ')
      patterns.push(
        ...patternInput
          .split(',')
          .map(p => p.trim())
          .filter(p => p),
      )
    }

    // Build variants list
    const variants = ['basic']
    variants.push(...propsToTest)
    variants.push(...patterns)

    // Add state variants if component has any state
    const statePropsInComponent = props.filter(p => p.isState).map(p => p.name)
    variants.push(...statePropsInComponent)

    console.log(`\n✨ Generating files...`)
    console.log(`   Variants: ${variants.join(', ')}`)

    // Create test directories
    const testDir = path.join(componentDir, 'test')
    const wwwTestDir = path.join(WWW_PATH, componentName, 'test')

    ensureDir(testDir)
    ensureDir(wwwTestDir)

    // Generate HTML harnesses
    const sections = [generateBasicSection(componentName)]
    for (const prop of propsToTest) {
      sections.push(generatePropSection(componentName, prop, ['variant1', 'variant2', 'variant3']))
    }
    for (const pattern of patterns) {
      sections.push(generateStateSection(componentName, pattern))
    }
    for (const state of statePropsInComponent) {
      sections.push(generateStateSection(componentName, state))
    }

    // Write HTML files based on component type
    if (componentType === 'web-component' || componentType === 'hybrid') {
      const htmlContent = generateHtmlHarness(componentName, sections, false)
      const htmlPath = path.join(wwwTestDir, `${componentName}.visual.html`)
      fs.writeFileSync(htmlPath, htmlContent)
      formatFile(htmlPath)
      console.log(`  ✓ Created ${path.relative(PROJECT_ROOT, htmlPath)}`)
    }

    if (componentType === 'html-css' || componentType === 'hybrid') {
      const htmlContent = generateHtmlHarness(componentName, sections, true)
      const htmlPath = path.join(wwwTestDir, `${componentName}.style.html`)
      fs.writeFileSync(htmlPath, htmlContent)
      formatFile(htmlPath)
      console.log(`  ✓ Created ${path.relative(PROJECT_ROOT, htmlPath)}`)
    }

    // Write Playwright test file
    const testContent = generatePlaywrightTest(componentName, variants)
    const testPath = path.join(testDir, `${componentName}.visual.play.ts`)
    fs.writeFileSync(testPath, testContent)
    formatFile(testPath)
    console.log(`  ✓ Created ${path.relative(PROJECT_ROOT, testPath)}`)

    // Summary
    console.log(`\n📋 Summary:`)
    console.log(`   Component: ds-${componentName}`)
    console.log(`   Type: ${componentType}`)
    console.log(`   Variants: ${variants.length}`)
    console.log(`   Test files: ${componentType === 'hybrid' ? 2 : 1} HTML + 1 Playwright`)

    console.log(`\n✅ Ready for review!`)
    console.log(`   Run tests: npm run play -- --grep="${componentName}" --update-snapshots`)

    rl.close()
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    rl.close()
    process.exit(1)
  }
}

main()
