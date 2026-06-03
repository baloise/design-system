/**
 * ds-create-component skill entry point
 *
 * This is the main interface that Claude Code calls when the user invokes /ds-create-component.
 * It orchestrates the questionnaire and passes control to the implementation.
 */

const implementation = require('./implementation')

async function main() {
  console.log('🧩 Creating a new design system component...\n')

  // Collect user input via questionnaire
  const userResponses = await gatherUserInput()

  // Generate component files
  const result = await implementation.createComponent(userResponses)

  if (result.status === 'warn') {
    console.warn(`\n⚠️  ${result.message}`)
    console.log('Continue anyway? (yes/no)')
    // User responds yes/no to continue

    return // Wait for confirmation
  }

  if (result.status === 'ready') {
    // Write files to disk
    writeComponentFiles(result.componentName, result.files, result.subcomponents)

    // Register in index.ts
    registerComponentInIndex(result.componentName, result.subcomponents)

    // Print token warnings
    if (result.tokenWarnings.length > 0) {
      console.log('\n⚠️  TOKEN WARNINGS:\n')
      result.tokenWarnings.forEach(warning => {
        console.log(`  ${warning.token}`)
        console.log(`  → ${warning.message}`)
      })
    }

    // Print migration notes
    if (result.migrationNotes.length > 0) {
      console.log('\n📋 MIGRATION NOTES:\n')
      result.migrationNotes.forEach(note => {
        console.log(`  ${note.message}`)
      })
    }

    // Success
    console.log(`\n✅ Component created: packages/core/src/components/${result.componentName}/`)
    console.log('\nNext steps:')
    console.log('  1. Review the generated component files')
    console.log('  2. Refine render() logic and add your component-specific code')
    console.log('  3. Update SCSS variants if needed')
    console.log('  4. Run: npm run play')
    console.log('  5. Create tests with /ds-sync-component-tests')
  }
}

/**
 * Gather user input via interactive questionnaire
 * This runs in Claude Code's terminal
 */
async function gatherUserInput() {
  const responses = {}

  // Q1: Component name
  const componentName = await prompt('Component name (e.g., "button"):')
  if (!componentName) throw new Error('Component name is required')
  responses.componentName = componentName.toLowerCase()

  // Q2: Component purpose
  const purpose = await prompt('Component purpose (e.g., "Renders a clickable element"):')
  responses.purpose = purpose || 'A new component'

  // Q3: Migration?
  const isMigration = await promptYesNo('Migrating from old design system?')
  responses.isMigration = isMigration

  if (isMigration) {
    const oldName = await prompt('Old component name (on main branch):')
    responses.oldComponentName = oldName || responses.componentName
  }

  // Q4: Props
  const propsInput = await prompt(`Props (comma-separated, e.g., "label: string = '', disabled: boolean = false"):`)
  responses.props = parsePropInput(propsInput)

  // Q5: Events
  const eventsInput = await prompt('Events (comma-separated, e.g., "dsClick, dsChange"):')
  responses.events = parseEventInput(eventsInput)

  // Q6: Subcomponents?
  const hasSubcomponents = await promptYesNo('Does this component have subcomponents?')
  responses.hasSubcomponents = hasSubcomponents

  if (hasSubcomponents) {
    const subInput = await prompt('Subcomponent names (comma-separated, e.g., "tab, tab-content"):')
    responses.subcomponents = subInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  } else {
    responses.subcomponents = []
  }

  // Q7: Variants
  const variantsInput = await prompt('Variants (comma-separated, e.g., "primary, secondary, danger"):')
  responses.variants = variantsInput
    .split(',')
    .map(v => v.trim())
    .filter(Boolean)

  return responses
}

/**
 * Parse prop input: "label: string = '', disabled: boolean = false"
 */
function parsePropInput(input) {
  if (!input) return []

  return input
    .split(',')
    .map(prop => {
      const match = prop.trim().match(/(\w+):\s*(.+?)\s*=\s*(.+)/)
      if (match) {
        return {
          name: match[1],
          type: match[2].trim(),
          default: match[3].trim(),
        }
      }
      return null
    })
    .filter(Boolean)
}

/**
 * Parse event input: "dsClick, dsChange"
 */
function parseEventInput(input) {
  if (!input) return []

  return input
    .split(',')
    .map(event => {
      const name = event.trim()
      if (!name.startsWith('ds')) {
        return { name: `ds${name}` }
      }
      return { name }
    })
    .filter(Boolean)
}

/**
 * Write component files to disk
 */
function writeComponentFiles(componentName, files, subcomponents) {
  const path = require('path')
  const fs = require('fs')

  const componentPath = path.join(process.cwd(), 'packages/core/src/components', componentName)

  // Ensure test directory exists
  const testPath = path.join(componentPath, 'test')
  if (!fs.existsSync(testPath)) {
    fs.mkdirSync(testPath, { recursive: true })
  }

  // Write main component files
  fs.writeFileSync(path.join(componentPath, `${componentName}.tsx`), files.tsx)
  fs.writeFileSync(path.join(componentPath, `${componentName}.interfaces.ts`), files.interfaces)
  fs.writeFileSync(path.join(componentPath, `${componentName}.host.scss`), files.scss)
  fs.writeFileSync(path.join(testPath, `${componentName}.visual.html`), files.html)

  // Write subcomponent files
  subcomponents.forEach(subcomponent => {
    const subPath = path.join(componentPath, subcomponent)
    if (!fs.existsSync(subPath)) {
      fs.mkdirSync(subPath, { recursive: true })
    }

    fs.writeFileSync(path.join(subPath, `${subcomponent}.tsx`), files[`${subcomponent}/tsx`])
    fs.writeFileSync(path.join(subPath, `${subcomponent}.interfaces.ts`), files[`${subcomponent}/interfaces`])
    fs.writeFileSync(path.join(subPath, `${subcomponent}.host.scss`), files[`${subcomponent}/scss`])
  })

  console.log('✅ Files written')
}

/**
 * Register component in packages/core/src/index.ts
 */
function registerComponentInIndex(componentName, subcomponents) {
  const path = require('path')
  const fs = require('fs')

  const indexPath = path.join(process.cwd(), 'packages/core/src/index.ts')

  let indexContent = fs.readFileSync(indexPath, 'utf-8')

  const PascalName = implementation.toPascalCase(componentName)

  // Add export for main component
  const exportLine = `export { ${PascalName} } from './components/${componentName}/${componentName}'`
  const typeExportLine = `export type { ${PascalName}Type, ${PascalName}Size } from './components/${componentName}/${componentName}.interfaces'`

  // Insert in alphabetical order (simplified)
  if (!indexContent.includes(`export { ${PascalName}`)) {
    indexContent += `\n${exportLine}`
    indexContent += `\n${typeExportLine}`
  }

  // Add exports for subcomponents
  subcomponents.forEach(subcomponent => {
    const SubPascalName = implementation.toPascalCase(subcomponent)
    const subExportLine = `export { ${SubPascalName} } from './components/${componentName}/${subcomponent}/${subcomponent}'`

    if (!indexContent.includes(`export { ${SubPascalName}`)) {
      indexContent += `\n${subExportLine}`
    }
  })

  fs.writeFileSync(indexPath, indexContent)
  console.log('✅ Registered in packages/core/src/index.ts')
}

/**
 * Helper: Prompt user for input (terminal/CLI)
 * In actual Claude Code implementation, this uses the built-in prompt system
 */
async function prompt(message) {
  // In Claude Code context, this would use the built-in input/output
  // For now, return placeholder
  process.stdout.write(`\n${message} `)
  // Actual implementation depends on Claude Code's input handling
}

/**
 * Helper: Prompt for yes/no
 */
async function promptYesNo(message) {
  const response = await prompt(`${message} (yes/no):`)
  return response?.toLowerCase() === 'yes' || response === 'y'
}

module.exports = main

// Run if invoked directly
if (require.main === module) {
  main().catch(console.error)
}
