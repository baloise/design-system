#!/usr/bin/env node

/**
 * ds-sync-a11y-tests — Full Implementation
 *
 * Generates WCAG AA accessibility test files with:
 * - Default test
 * - Describe blocks per enum category
 * - Form state tests (disabled, invalid, required, readonly, checked)
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const CORE_PATH = path.join(PROJECT_ROOT, 'packages/core')
const COMPONENTS_PATH = path.join(CORE_PATH, 'src/components')

// ============================================================================
// ANALYSIS
// ============================================================================

function analyzeComponent(componentName) {
  const componentDir = path.join(COMPONENTS_PATH, componentName)
  const componentFile = path.join(componentDir, `${componentName}.tsx`)
  const interfacesFile = path.join(componentDir, `${componentName}.interfaces.ts`)

  if (!fs.existsSync(componentFile)) {
    throw new Error(`Component file not found: ${componentFile}`)
  }

  if (!fs.existsSync(interfacesFile)) {
    throw new Error(`Interfaces file not found: ${interfacesFile}`)
  }

  const componentContent = fs.readFileSync(componentFile, 'utf-8')
  const interfacesContent = fs.readFileSync(interfacesFile, 'utf-8')

  // Detect form component
  const isFormComponent =
    componentContent.includes('FormControlInterface') ||
    componentContent.includes('FormControl') ||
    /\b(?:disabled|invalid|required|readonly)\s*:/.test(componentContent)

  // Detect checkbox/radio (for 'checked' state)
  const isCheckable = componentName === 'checkbox' || componentName === 'radio'

  // Extract enum constants
  const enumRegex = /export const ([A-Z_]+) = \[([\s\S]*?)\] as const/g
  const enums = {}
  let match

  while ((match = enumRegex.exec(interfacesContent)) !== null) {
    const constName = match[1]
    const constValues = match[2]
      .split(',')
      .map(v => {
        const m = v.trim().match(/'([^']*)'/)
        return m ? m[1] : null
      })
      .filter(v => v !== '' && v !== null)

    if (constValues.length > 0) {
      enums[constName] = constValues
    }
  }

  // Extract JSDoc
  const jsDocMatch = componentContent.match(/\/\*\*\s*([\s\S]*?)\*\/[\s\n]*export class/)
  const jsDoc = jsDocMatch ? jsDocMatch[1].trim() : ''

  return {
    componentName,
    isFormComponent,
    isCheckable,
    enums,
    jsDoc,
  }
}

// ============================================================================
// TEST GENERATION
// ============================================================================

function getDefaultContent(componentName, isFormComponent) {
  // Sensible defaults per component type
  const defaults = {
    button: 'Click me',
    input: 'label="Label"',
    checkbox: 'label="Check me"',
    radio: 'label="Choose"',
    select: 'label="Select"',
    textarea: 'label="Message"',
    badge: '42',
    tag: 'Tag',
    icon: 'name="alert"',
    text: 'Text content',
    divider: '', // self-closing
    hint: 'Hint text',
    modal: 'Modal content',
    drawer: 'Drawer content',
    popup: 'Popup content',
  }

  return defaults[componentName] || (isFormComponent ? 'label="Label"' : 'Content')
}

function generateDefaultTest(componentName, defaultContent) {
  const content = defaultContent ? `>${defaultContent}<` : ' />'
  const closing = defaultContent ? `</ds-${componentName}>` : ''

  return `test('default', async ({ page, a11y }) => {
  await page.mount(\`<ds-${componentName}${content}${closing}\`)
  await a11y('ds-${componentName}')
})`
}

function generateEnumDescribeBlock(componentName, enumName, enumValues, defaultContent) {
  const blockName = enumNameToBlockName(enumName)
  const propName = enumNameToPropName(enumName)

  const testCases = enumValues
    .map(value => {
      const testName = value
      const content = defaultContent ? `>${defaultContent}</ds-${componentName}>` : ' />'
      return `    test('${testName}', async ({ page, a11y }) => {
      await page.mount(\`<ds-${componentName} ${propName}="${value}"${content}\`)
      await a11y('ds-${componentName}')
    })`
    })
    .join('\n\n')

  return `test.describe('${blockName}', () => {
  const ${enumName.toUpperCase()} = [${enumValues.map(v => `'${v}'`).join(', ')}]
  ${enumName.toUpperCase()}.forEach(value => {
    test(value, async ({ page, a11y }) => {
      await page.mount(\`<ds-${componentName} ${propName}="\${value}"${defaultContent ? `>${defaultContent}</ds-${componentName}>` : ' />'}\`)
      await a11y('ds-${componentName}')
    })
  })
})`
}

function generateFormStateTests(componentName, defaultContent, isCheckable) {
  const lines = []

  // Disabled
  lines.push(`test('disabled', async ({ page, a11y }) => {
  await page.mount(\`<ds-${componentName}${defaultContent ? ' ' + defaultContent : ''} disabled${defaultContent ? `></ds-${componentName}>` : ' />'}\`)
  await a11y('ds-${componentName}')
})`)

  // Invalid
  lines.push(`test('invalid', async ({ page, a11y }) => {
  await page.mount(\`<ds-${componentName}${defaultContent ? ' ' + defaultContent : ''} invalid invalid-text="Error"${defaultContent ? `></ds-${componentName}>` : ' />'}\`)
  await a11y('ds-${componentName}')
})`)

  // Required
  lines.push(`test('required', async ({ page, a11y }) => {
  await page.mount(\`<ds-${componentName}${defaultContent ? ' ' + defaultContent : ''} required${defaultContent ? `></ds-${componentName}>` : ' />'}\`)
  await a11y('ds-${componentName}')
})`)

  // Readonly
  lines.push(`test('readonly', async ({ page, a11y }) => {
  await page.mount(\`<ds-${componentName}${defaultContent ? ' ' + defaultContent : ''} readonly${defaultContent ? `></ds-${componentName}>` : ' />'}\`)
  await a11y('ds-${componentName}')
})`)

  // Checked (for checkbox/radio)
  if (isCheckable) {
    lines.push(`test('checked', async ({ page, a11y }) => {
  await page.mount(\`<ds-${componentName}${defaultContent ? ' ' + defaultContent : ''} checked${defaultContent ? `></ds-${componentName}>` : ' />'}\`)
  await a11y('ds-${componentName}')
})`)
  }

  return lines.join('\n\n')
}

function enumNameToBlockName(enumName) {
  // BADGE_COLORS -> colors
  return enumName.split('_').slice(1).join('_').toLowerCase()
}

function enumNameToPropName(enumName) {
  // BADGE_COLORS -> color, INPUT_INPUT_TYPES -> input-type
  const parts = enumName.split('_').slice(1)
  return parts.map(p => p.toLowerCase()).join('-')
}

function generateTestFile(componentName, analysis, defaultContent) {
  const lines = [
    `import { test } from '@baloise/ds-playwright'`,
    ``,
    generateDefaultTest(componentName, defaultContent),
  ]

  // Add enum describe blocks
  for (const [enumName, values] of Object.entries(analysis.enums)) {
    lines.push('')
    lines.push(generateEnumDescribeBlock(componentName, enumName, values, defaultContent))
  }

  // Add form state tests
  if (analysis.isFormComponent) {
    lines.push('')
    lines.push(generateFormStateTests(componentName, defaultContent, analysis.isCheckable))
  }

  return lines.join('\n') + '\n'
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
    // Prettier might not be available
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: ds-sync-a11y-tests <component-name>')
    process.exit(1)
  }

  const componentName = args[0]

  try {
    console.log(`\n✓ Analyzing ds-${componentName}`)

    const analysis = analyzeComponent(componentName)

    console.log(`  Type: ${analysis.isFormComponent ? 'Form component' : 'Non-form component'}`)

    // Summarize enums
    const enumCount = Object.values(analysis.enums).reduce((sum, vals) => sum + vals.length, 0)
    if (enumCount > 0) {
      console.log(`  Enum variants: ${enumCount}`)
    }

    // Get default content
    const defaultContent = getDefaultContent(componentName, analysis.isFormComponent)

    // Generate test file
    console.log(`\n✨ Generating accessibility tests...`)

    const testContent = generateTestFile(componentName, analysis, defaultContent)

    // Write test file
    const testDir = path.join(COMPONENTS_PATH, componentName, 'test')
    ensureDir(testDir)

    const testPath = path.join(testDir, `${componentName}.a11y.play.ts`)
    fs.writeFileSync(testPath, testContent)
    formatFile(testPath)

    const relPath = path.relative(PROJECT_ROOT, testPath)
    console.log(`  ✓ Created ${relPath}`)

    // Summary
    const testCount = 1 + enumCount + (analysis.isFormComponent ? 5 + (analysis.isCheckable ? 1 : 0) : 0)

    console.log(`\n📋 Summary:`)
    console.log(`   Component: ds-${componentName}`)
    console.log(`   Type: ${analysis.isFormComponent ? 'Form component' : 'Non-form component'}`)
    console.log(`   Total tests: ${testCount}`)
    console.log(
      `   Coverage: default + ${Object.keys(analysis.enums).length} enum categories${analysis.isFormComponent ? ' + form states' : ''}`,
    )

    console.log(`\n✅ Ready for review!`)
    console.log(`   Run tests: npm run play -- --grep="${componentName}" --grep="a11y"`)
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
