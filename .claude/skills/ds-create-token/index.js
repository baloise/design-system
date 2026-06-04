#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Find the design system root
function findDSRoot() {
  let current = process.cwd()
  while (current !== '/') {
    if (fs.existsSync(path.join(current, 'packages/core'))) {
      return current
    }
    current = path.dirname(current)
  }
  throw new Error("Could not find design system root. Make sure you're in the DS repo.")
}

// Parse SCSS file to extract vars.local() and --mod- variables
function parseComponentSCSS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const variables = []
  const varIndexMap = {}

  // Extract @include vars.local() calls
  const varsLocalRegex = /@include\s+vars\.local\(([^,]+),\s*([^)]+)\)/g
  let match
  while ((match = varsLocalRegex.exec(content)) !== null) {
    const varName = match[1].trim()
    const value = match[2].trim()
    const id = varName.replace(/-/g, '_')

    variables.push({
      id: id,
      name: varName,
      value: value,
      type: determineValueType(value),
      source: 'vars.local',
      variants: [],
    })
    varIndexMap[varName] = variables.length - 1
  }

  // Extract --mod- variables from variant classes
  const hostModRegex = /:host\(\.([^)]+)\)\s*{([^}]*--mod-[^}]*?)}/gs
  while ((match = hostModRegex.exec(content)) !== null) {
    const className = match[1].trim()
    const content = match[2]

    // Find all --mod- variables in this block
    const modVarRegex = /--(mod-[^:]+):\s*([^;]+);/g
    let modMatch
    while ((modMatch = modVarRegex.exec(content)) !== null) {
      const modVar = modMatch[1].trim()
      const modValue = modMatch[2].trim()

      // Match mod variable to base variable
      const baseVarName = modVar.replace('mod-', '')
      const varIdx = Object.values(varIndexMap).find(idx => variables[idx].name === baseVarName)

      if (varIdx !== undefined && variables[varIdx]) {
        variables[varIdx].variants.push({
          class: className,
          modVar: modVar,
          value: modValue,
          type: determineValueType(modValue),
        })
      }
    }
  }

  return variables
}

// Determine if value is alias, global, or hardcoded
function determineValueType(value) {
  if (value.includes('--ds-alias-')) return 'alias'
  if (value.includes('--ds-global-')) return 'global'
  if (value.includes('--ds-')) return 'component'
  if (value.startsWith('var(--')) return 'variable'
  return 'hardcoded'
}

// Main execution
async function main() {
  try {
    const componentName = process.argv[2]
    if (!componentName) {
      console.error('Usage: ds-create-token <component-name>')
      process.exit(1)
    }

    const dsRoot = findDSRoot()
    const componentDir = path.join(dsRoot, 'packages/core/src/components', componentName)
    const scssFile = path.join(componentDir, `${componentName}.host.scss`)

    if (!fs.existsSync(scssFile)) {
      console.error(`Component file not found: ${scssFile}`)
      process.exit(1)
    }

    // Parse the SCSS file
    const variables = parseComponentSCSS(scssFile)

    if (variables.length === 0) {
      console.error('No variables found in component SCSS')
      process.exit(1)
    }

    // Output structured data for the AI to work with
    const output = {
      componentName: componentName,
      componentDir: componentDir,
      scssFile: scssFile,
      variables: variables,
      dsRoot: dsRoot,
    }

    // Output as JSON so the AI can parse and work with it
    console.log(JSON.stringify(output, null, 2))
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
