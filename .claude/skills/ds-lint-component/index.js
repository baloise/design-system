#!/usr/bin/env node

/**
 * ds-lint-component — Entry point
 * Audits Stencil component against design system style guide
 */

const fs = require('fs')
const path = require('path')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const COMPONENTS_PATH = path.join(PROJECT_ROOT, 'packages/core/src/components')

/**
 * Quick analysis to report violations
 */
function analyzeComponent(componentName) {
  const componentDir = path.join(COMPONENTS_PATH, componentName)
  const componentFile = path.join(componentDir, `${componentName}.tsx`)
  const interfacesFile = path.join(componentDir, `${componentName}.interfaces.ts`)
  const hostScssFile = path.join(componentDir, `${componentName}.host.scss`)
  const styleScssFile = path.join(componentDir, `${componentName}.style.scss`)

  if (!fs.existsSync(componentFile)) {
    throw new Error(`Component file not found: ${componentFile}`)
  }

  const content = fs.readFileSync(componentFile, 'utf-8')

  // Quick checks
  const violations = []

  // Check for relative imports
  if (content.includes("from '../../utils") || content.includes('from "../../utils')) {
    violations.push('0. Relative imports from utils (use @utils)')
  }
  if (content.includes("from '../../global") || content.includes('from "../../global')) {
    violations.push('0. Relative imports from global (use @global)')
  }

  // Check for validateProps
  if (!content.includes('validateProps')) {
    violations.push('4. Missing validateProps() method')
  }

  // Check 9: DsComponentInterface + Logger contract
  const hasDsComponentInterface = content.includes('DsComponentInterface')
  const hasLogger = content.includes('@Logger')
  const hasCreateLogger = content.includes('createLogger')

  if (!hasDsComponentInterface) {
    violations.push('9. Missing DsComponentInterface implementation')
  }

  if (!hasLogger || !hasCreateLogger) {
    violations.push('9. Missing @Logger decorator or createLogger method')
  }

  // Check for section dividers
  const requiredSections = ['PUBLIC PROPERTY API', 'LIFECYCLE', 'PROPERTY VALIDATION']
  for (const section of requiredSections) {
    if (!content.includes(section)) {
      violations.push(`11. Missing section divider: ${section}`)
      break
    }
  }

  // Check component tag
  const tagMatch = content.match(/@Component\(\{[^}]*tag:\s*['"]([^'"]+)['"]/)
  if (tagMatch && !tagMatch[1].startsWith('ds-')) {
    violations.push('16. Component tag missing ds- prefix')
  }

  // Check for ds prefix on events
  if (content.includes('@Event()') && content.includes('EventEmitter')) {
    const eventRegex = /@Event\(\)[^]*?(\w+):\s*EventEmitter/g
    let match
    while ((match = eventRegex.exec(content)) !== null) {
      if (!match[1].startsWith('ds')) {
        violations.push(`8. Event '${match[1]}' missing ds prefix`)
        break
      }
    }
  }

  return {
    componentName,
    violations,
    hasInterfacesFile: fs.existsSync(interfacesFile),
    hasHostScss: fs.existsSync(hostScssFile),
    hasStyleScss: fs.existsSync(styleScssFile),
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: ds-lint-component <component-name>')
    process.exit(1)
  }

  const componentName = args[0]

  try {
    console.log(`\n✓ Scanning ds-${componentName}`)

    const analysis = analyzeComponent(componentName)

    if (analysis.violations.length === 0) {
      console.log(`✅ No style guide violations found in ${componentName}.tsx`)
    } else {
      console.log(`\n⚠️  Violations found (${analysis.violations.length}):`)
      analysis.violations.forEach((v, i) => {
        console.log(`  ${i + 1}. ${v}`)
      })
    }

    if (analysis.hasInterfacesFile) {
      console.log(`   ℹ️  Check: ${componentName}.interfaces.ts`)
    }

    if (analysis.hasHostScss || analysis.hasStyleScss) {
      console.log(`   ⚠️  Check SCSS files for attribute selectors (use CSS classes instead)`)
    }

    console.log(`\n✨ Skill ready to audit and fix!`)
    console.log(`   Next: implement full linting with auto-fixes`)
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
