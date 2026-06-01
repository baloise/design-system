#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Configuration
const CORE_PATH = path.resolve(__dirname, '../../packages/core')
const COMPONENTS_PATH = path.join(CORE_PATH, 'src/components')
const WWW_PATH = path.join(CORE_PATH, 'www/components')

const STATE_PROPS = ['disabled', 'invalid', 'loading', 'readonly', 'required', 'valid', 'warning']

const INTERACTIVE_METHODS = ['present', 'dismiss', 'show', 'hide', 'toggle', 'open', 'close']

/**
 * Parse TypeScript component file to extract props
 */
function parseComponentProps(componentPath) {
  const content = fs.readFileSync(componentPath, 'utf-8')
  const props = []

  // Simple regex-based parsing for @Prop() declarations
  const propRegex =
    /@Prop\([^)]*\)\s+(?:readonly\s+)?@ValidateEmptyOrOneOf\(['"]([^'"]+)['"]\)|@Prop\(\{[^}]*\}\)\s+(?:readonly\s+)?(\w+):/g

  let match
  while ((match = propRegex.exec(content)) !== null) {
    const values = match[1]
    if (values) {
      props.push({
        name: extractPropName(content, propRegex.lastIndex),
        values: values.split('|').map(v => v.trim()),
      })
    }
  }

  // Parse for enum-like prop values
  const enumRegex = /readonly\s+(\w+):\s+(['"`])([^'"`]+)\2\s*=/g
  const enums = {}
  while ((match = enumRegex.exec(content)) !== null) {
    enums[match[1]] = match[3].split('|').map(v => v.trim())
  }

  // Check for @internal and @deprecated decorators
  const internalProps = new Set()
  const deprecatedProps = new Set()

  const decoratorRegex = /\s*\/\*\*\s*\n\s*\*\s*(@internal|@deprecated)[^\n]*\n\s*\*\//gm
  let decoratorMatch
  while ((decoratorMatch = decoratorRegex.exec(content)) !== null) {
    const nextProp = content
      .substring(decoratorMatch.index + decoratorMatch[0].length)
      .match(/@Prop[^(]*\(\)\s+(?:readonly\s+)?(\w+)/)
    if (nextProp) {
      if (decoratorMatch[1] === '@internal') {
        internalProps.add(nextProp[1])
      } else if (decoratorMatch[1] === '@deprecated') {
        deprecatedProps.add(nextProp[1])
      }
    }
  }

  return {
    props: props.filter(p => !internalProps.has(p.name) && !deprecatedProps.has(p.name)),
    internalProps,
    deprecatedProps,
  }
}

/**
 * Extract prop name from component file
 */
function extractPropName(content, startIndex) {
  const match = content.substring(startIndex, startIndex + 100).match(/@Prop[^(]*\(\)\s+(?:readonly\s+)?(\w+)/)
  return match ? match[1] : null
}

/**
 * Check component type (hybrid, web-component-only, or html-css-only)
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
  const methods = []

  for (const method of INTERACTIVE_METHODS) {
    if (content.includes(`${method}(`) || content.includes(`${method}(`)) {
      methods.push(method)
    }
  }

  return methods
}

/**
 * Main skill execution
 */
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
    console.error(`Component not found: ${componentName}`)
    console.error(`Expected: ${componentFile}`)
    process.exit(1)
  }

  console.log(`✓ Analyzing ds-${componentName}`)

  // Parse props
  const { props, internalProps, deprecatedProps } = parseComponentProps(componentFile)

  if (props.length === 0) {
    console.log('ℹ No public props found')
  } else {
    console.log(`  Public props: ${props.map(p => p.name).join(', ')}`)
  }

  if (internalProps.size > 0) {
    console.log(`  (Skipped @internal: ${Array.from(internalProps).join(', ')})`)
  }

  if (deprecatedProps.size > 0) {
    console.log(`  (Skipped @deprecated: ${Array.from(deprecatedProps).join(', ')})`)
  }

  // Detect component type
  const componentType = detectComponentType(componentName)
  console.log(`  Type: ${componentType}`)

  // Detect interactive methods
  const interactiveMethods = detectInteractiveMethods(componentFile)
  if (interactiveMethods.length > 0) {
    console.log(`  Interactive methods: ${interactiveMethods.join(', ')}`)
  }

  console.log('\n📝 Visual test generation initialized')
  console.log(`   Component: ds-${componentName}`)
  console.log(`   Type: ${componentType}`)
  console.log(`   Interactive: ${interactiveMethods.length > 0 ? 'Yes' : 'No'}`)
  console.log('\n✨ Skill ready to generate files!')
  console.log('   Next: implement interactive prompts for prop selection and pattern selection')
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
