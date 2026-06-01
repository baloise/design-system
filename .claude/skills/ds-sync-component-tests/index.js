#!/usr/bin/env node

/**
 * ds-sync-component-tests — Entry point
 * Analyzes component and initiates TDD test generation
 */

const fs = require('fs')
const path = require('path')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const CORE_PATH = path.join(PROJECT_ROOT, 'packages/core')
const COMPONENTS_PATH = path.join(CORE_PATH, 'src/components')

/**
 * Analyze component structure
 */
function analyzeComponent(componentName) {
  const componentDir = path.join(COMPONENTS_PATH, componentName)
  const componentFile = path.join(componentDir, `${componentName}.tsx`)

  if (!fs.existsSync(componentFile)) {
    throw new Error(`Component file not found: ${componentFile}`)
  }

  const content = fs.readFileSync(componentFile, 'utf-8')

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
  const props = []
  while ((match = propRegex.exec(content)) !== null) {
    props.push(match[1])
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
    /\b(?:name|value|disabled|invalid|required)\s*:/.test(content)

  // Check if util file exists
  const utilFile = path.join(componentDir, `${componentName}.util.ts`)
  const hasUtil = fs.existsSync(utilFile)

  return {
    componentName,
    events,
    props,
    methods,
    isFormComponent,
    hasUtil,
  }
}

/**
 * Main entry point
 */
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

    if (analysis.events.length > 0) {
      console.log(`  Events: ${analysis.events.map(e => e.name).join(', ')}`)
    }

    if (analysis.props.length > 0) {
      console.log(`  Props: ${analysis.props.slice(0, 5).join(', ')}${analysis.props.length > 5 ? ', ...' : ''}`)
    }

    if (analysis.methods.length > 0) {
      console.log(`  Methods: ${analysis.methods.join(', ')}`)
    }

    console.log(`  Type: ${analysis.isFormComponent ? 'Form component' : 'Non-form component'}`)
    console.log(`  Util file: ${analysis.hasUtil ? 'yes' : 'no'}`)

    console.log(`\n✨ Skill ready to generate TDD tests!`)
    console.log(`   Component: ds-${componentName}`)
    console.log(`   Events to test: ${analysis.events.length}`)
    console.log(`   Form component: ${analysis.isFormComponent ? 'yes' : 'no'}`)
    console.log('\n   Next: implement interactive selection and file generation')
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
