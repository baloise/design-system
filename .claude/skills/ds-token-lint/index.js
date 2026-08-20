#!/usr/bin/env node

const { checkComponent, applyFixes } = require('./implementation')

function printCheckReport({ componentName, componentKey, caseMismatch, leaves, violations }) {
  console.log(`\n📋 Token check: ${componentName} (🧩 Component > ${componentKey})\n`)

  if (caseMismatch) {
    console.log(`⚠ Looked up "${caseMismatch}", matched existing key "${componentKey}" case-insensitively.\n`)
  }

  console.log(`Scanned ${leaves.length} component-layer token(s).\n`)

  if (violations.length === 0) {
    console.log('✓ No naming violations found.\n')
    return
  }

  console.log('| # | Current Token | Violation | Proposed Fix |')
  console.log('|---|---|---|---|')
  violations.forEach((v, i) => {
    console.log(`| ${i + 1} | \`${v.currentCssVar}\` | ${v.message} | \`${v.proposedCssVar}\` |`)
  })
  console.log(`\n${violations.length} violation(s) found. Run with --apply after approval to fix.\n`)
}

function printApplyReport({ renameMap, updatedFiles }) {
  console.log('\n🔧 Applied token renames:\n')
  for (const { from, to } of renameMap) {
    console.log(`  • ${from} → ${to}`)
  }
  console.log(`\nUpdated ${updatedFiles.length} SCSS file(s):`)
  for (const f of updatedFiles) {
    console.log(`  • ${f}`)
  }
  console.log('\n✓ Base.tokens.json updated, dist outputs recompiled via `pnpm tokens`.')
  console.log('⚠ This is a breaking change — create a changeset (bump: major) before committing.\n')
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log('Usage: ds-token-lint <component-name> [--apply]')
    console.log('Example: ds-token-lint button')
    console.log('         ds-token-lint button --apply')
    process.exit(1)
  }

  const componentName = args[0]
  const shouldApply = args.includes('--apply')

  try {
    const report = checkComponent(componentName)

    if (!shouldApply) {
      printCheckReport(report)
      return
    }

    if (report.violations.length === 0) {
      console.log('No violations to apply.')
      return
    }

    const result = applyFixes(componentName, report.violations)
    printApplyReport(result)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
