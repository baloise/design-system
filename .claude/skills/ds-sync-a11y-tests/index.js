#!/usr/bin/env node

/**
 * ds-sync-a11y-tests — Entry point
 * Analyzes component and generates accessibility test files
 */

const fs = require('fs')
const path = require('path')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const CORE_PATH = path.join(PROJECT_ROOT, 'packages/core')
const COMPONENTS_PATH = path.join(CORE_PATH, 'src/components')

/**
 * Parse component file to extract info
 */
function analyzeComponent(componentName) {
  const componentDir = path.join(COMPONENTS_PATH, componentName)
  const componentFile = path.join(componentDir, `${componentName}.tsx`)
  const interfacesFile = path.join(componentDir, `${componentName}.interfaces.ts`)

  // Validate files exist
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
    /\b(?:disabled|invalid|required|readonly|checked)\s*:/.test(componentContent)

  // Extract enum constants from interfaces
  const enumRegex = /export const ([A-Z_]+) = \[([\s\S]*?)\] as const/g
  const enums = {}
  let match

  while ((match = enumRegex.exec(interfacesContent)) !== null) {
    const constName = match[1]
    const constValues = match[2]
      .split(',')
      .map(v => v.trim().match(/'([^']*)'/)?.[1])
      .filter(v => v !== '' && v !== undefined)

    enums[constName] = constValues
  }

  // Extract JSDoc for component
  const jsDocMatch = componentContent.match(/\/\*\*\s*([\s\S]*?)\*\//m)
  const jsDoc = jsDocMatch ? jsDocMatch[1] : ''

  return {
    componentName,
    isFormComponent,
    enums,
    jsDoc,
    interfacesFile,
  }
}

/**
 * Main entry point
 */
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

    // Count enum values (skip empty strings)
    let enumCount = 0
    const enumSummary = []
    for (const [constName, values] of Object.entries(analysis.enums)) {
      if (values.length > 0) {
        enumSummary.push(`${constName}: ${values.length}`)
        enumCount += values.length
      }
    }

    if (enumSummary.length > 0) {
      console.log(`  Enums: ${enumSummary.join(', ')}`)
    }

    console.log(`\n✨ Skill ready to generate tests!`)
    console.log(`   Component: ds-${componentName}`)
    console.log(`   Form component: ${analysis.isFormComponent ? 'Yes' : 'No'}`)
    console.log(`   Enum variants: ${enumCount}`)
    console.log('\n   Next: implement interactive prompts and test generation')
  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
