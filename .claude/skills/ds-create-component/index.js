#!/usr/bin/env node

/**
 * ds-create-component — Entry point
 * Generates a new design system component with scaffolding
 */

const path = require('path')
const { execSync } = require('child_process')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: ds-create-component <component-name>')
    console.error('\nExample: ds-create-component button')
    process.exit(1)
  }

  const componentName = args[0]

  try {
    // Run implementation
    console.log(`\n🚀 Generating ds-${componentName}...\n`)

    const implementationPath = path.join(__dirname, 'implementation.js')
    execSync(`node "${implementationPath}" "${componentName}"`, {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
    })

    console.log(`\n✅ Skill ready to orchestrate test generation!`)
    console.log(`\nNext: Run the test generation skills:`)
    console.log(`  /ds-sync-component-tests ${componentName}`)
    console.log(`  /ds-sync-visual-tests ${componentName}`)
    console.log(`  /ds-sync-a11y-tests ${componentName}`)
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
