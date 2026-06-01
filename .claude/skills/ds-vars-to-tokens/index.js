#!/usr/bin/env node

/**
 * sync-component-tokens — Entry point (quick analysis)
 * Analyzes component SCSS and reports CSS variable violations
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

  // Check for at least one SCSS file
  const styleScssFile = path.join(componentDir, `${componentName}.style.scss`)
  const hostScssFile = path.join(componentDir, `${componentName}.host.scss`)
  const mixinPattern = path.join(componentDir, '*.mixin.scss')

  const hasStyleScss = fs.existsSync(styleScssFile)
  const hasHostScss = fs.existsSync(hostScssFile)

  // Check for any mixin files
  const hasMixins = fs.existsSync(componentDir) && fs.readdirSync(componentDir).some(f => f.endsWith('.mixin.scss'))

  if (!hasStyleScss && !hasHostScss && !hasMixins) {
    throw new Error(
      `No SCSS files found. Checked for:\n` +
        `  - ${componentName}.style.scss\n` +
        `  - ${componentName}.host.scss\n` +
        `  - ${componentName}.mixin.scss or other *.mixin.scss`,
    )
  }

  // Quick checks for common violations
  const violations = []

  // Check for direct alias/global refs
  const filesToCheck = []
  if (hasStyleScss) filesToCheck.push({ file: styleScssFile, name: `${componentName}.style.scss` })
  if (hasHostScss) filesToCheck.push({ file: hostScssFile, name: `${componentName}.host.scss` })

  for (const { file, name } of filesToCheck) {
    const content = fs.readFileSync(file, 'utf-8')

    // Check for vars.local with direct alias/global refs
    if (
      content.match(
        /vars\.local\([^,]+,\s*var\(--ds-(?!button|badge|input|checkbox|radio|select|textarea|segment|table|modal|tooltip|popover|drawer|slider|spinner|progress|toast|card|button-group|form|checkbox-group|radio-group|field|label|hint|error|datepicker|timepicker|dropdown|menu|breadcrumb|pagination|tabs|stepper|accordion|carousel|tabs|pill|text|link|icon|image|logo|hero|banner|footer|header|navigation|breadcrumbs|alerts|messages|notifications|help|guide|tutorial|wizard|timeline|skeleton|placeholder|shimmer|loader|spinner|empty|error|warning|success|info)\w+[)\]]/,
      )
    ) {
      violations.push(`${name}: vars.local() with direct alias/global ref`)
    }

    // Check for direct vars outside vars.local
    if (
      content.match(
        /var\(--ds-(?!button|badge|input|checkbox|radio|select|textarea|segment|table|modal|tooltip|popover|drawer|slider|spinner|progress|toast|card|button-group|form|checkbox-group|radio-group|field|label|hint|error|datepicker|timepicker|dropdown|menu|breadcrumb|pagination|tabs|stepper|accordion|carousel|tabs|pill|text|link|icon|image|logo|hero|banner|footer|header|navigation|breadcrumbs|alerts|messages|notifications|help|guide|tutorial|wizard|timeline|skeleton|placeholder|shimmer|loader|spinner|empty|error|warning|success|info)\w+\)/,
      )
    ) {
      violations.push(`${name}: Direct var() ref to alias/global token`)
    }
  }

  return {
    componentName,
    violations,
    files: {
      styleScss: hasStyleScss,
      hostScss: hasHostScss,
      hasMixins,
    },
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: sync-component-tokens <component-name>')
    process.exit(1)
  }

  const componentName = args[0]

  try {
    console.log(`\n✓ Analyzing ds-${componentName}`)

    const analysis = analyzeComponent(componentName)

    console.log(`\nFiles found:`)
    console.log(`  ${analysis.files.styleScss ? '✓' : '✗'} ${componentName}.style.scss`)
    console.log(`  ${analysis.files.hostScss ? '✓' : '✗'} ${componentName}.host.scss`)
    console.log(`  ${analysis.files.hasMixins ? '✓' : '✗'} *.mixin.scss`)

    if (analysis.violations.length === 0) {
      console.log(`\n✅ No obvious violations found`)
    } else {
      console.log(`\n⚠️  Potential violations (${analysis.violations.length}):`)
      analysis.violations.forEach((v, i) => {
        console.log(`  ${i + 1}. ${v}`)
      })
    }

    console.log(`\n✨ Skill ready to sync tokens!`)
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
