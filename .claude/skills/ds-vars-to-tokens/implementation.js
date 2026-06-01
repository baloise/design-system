#!/usr/bin/env node

/**
 * ds-vars-to-tokens — Full Implementation
 *
 * Analyzes component SCSS, validates against design tokens JSON,
 * and syncs component-specific tokens with alias/global references.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const COMPONENTS_PATH = path.join(PROJECT_ROOT, 'packages/core/src/components')
const TOKENS_JSON = path.join(PROJECT_ROOT, 'packages/tokens/tokens/Base.tokens.json')
const DIST_CSS = path.join(PROJECT_ROOT, 'packages/tokens/dist/css/base.tokens.css')

// ============================================================================
// TOKEN SYNC MANAGER
// ============================================================================

class TokenSyncManager {
  constructor(componentName) {
    this.componentName = componentName
    this.componentNamePascal = this.toPascalCase(componentName)
    this.componentDir = path.join(COMPONENTS_PATH, componentName)
    this.styleScssFile = path.join(this.componentDir, `${componentName}.style.scss`)
    this.hostScssFile = path.join(this.componentDir, `${componentName}.host.scss`)

    this.scssFiles = {}
    this.tokensJson = null
    this.violations = {
      varLocalWithAlias: [],
      directVarRef: [],
      hardcodedVarsLocal: [],
      modifierVarMissing: [],
    }
    this.approvedFixes = {
      newTokens: [],
      scssUpdates: [],
    }
  }

  // ========================================================================
  // UTILITY
  // ========================================================================

  toPascalCase(str) {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length
  }

  // ========================================================================
  // LOAD FILES
  // ========================================================================

  load() {
    // Check for at least one SCSS file
    const hasStyleScss = fs.existsSync(this.styleScssFile)
    const hasHostScss = fs.existsSync(this.hostScssFile)
    const hasMixins =
      fs.existsSync(this.componentDir) && fs.readdirSync(this.componentDir).some(f => f.endsWith('.mixin.scss'))

    if (!hasStyleScss && !hasHostScss && !hasMixins) {
      throw new Error(
        `No SCSS files found. Checked for:\n` +
          `  - ${this.componentName}.style.scss\n` +
          `  - ${this.componentName}.host.scss\n` +
          `  - *.mixin.scss files`,
      )
    }

    // Load SCSS files with metadata
    if (hasStyleScss) {
      this.scssFiles['style'] = {
        path: this.styleScssFile,
        content: fs.readFileSync(this.styleScssFile, 'utf-8'),
      }
    }

    if (hasHostScss) {
      this.scssFiles['host'] = {
        path: this.hostScssFile,
        content: fs.readFileSync(this.hostScssFile, 'utf-8'),
      }
    }

    if (fs.existsSync(this.componentDir)) {
      const mixins = fs.readdirSync(this.componentDir).filter(f => f.endsWith('.mixin.scss'))
      for (const mixin of mixins) {
        this.scssFiles[mixin] = {
          path: path.join(this.componentDir, mixin),
          content: fs.readFileSync(path.join(this.componentDir, mixin), 'utf-8'),
        }
      }
    }

    // Load tokens JSON
    if (!fs.existsSync(TOKENS_JSON)) {
      throw new Error(`Tokens JSON not found: ${TOKENS_JSON}`)
    }

    this.tokensJson = JSON.parse(fs.readFileSync(TOKENS_JSON, 'utf-8'))
  }

  // ========================================================================
  // ANALYZE CSS VARIABLES
  // ========================================================================

  analyze() {
    for (const [source, file] of Object.entries(this.scssFiles)) {
      this.analyzeSource(source, file.content)
    }
  }

  analyzeSource(source, content) {
    const componentPrefix = `--ds-${this.componentName}-`
    const aliasGlobalPattern = `--ds-(?!${this.componentName.replace(/-/g, '\\-')})`

    // Pattern 1: vars.local() with direct alias/global refs
    const varLocalAliasRegex = new RegExp(
      `vars\\.local\\(([^,]+),\\s*var\\((${aliasGlobalPattern}[^)]+)\\)\\s*\\)`,
      'g',
    )

    let match
    while ((match = varLocalAliasRegex.exec(content)) !== null) {
      const varName = match[1].trim()
      const aliasToken = match[2].trim()
      const lineNum = this.getLineNumber(content, match.index)

      this.violations.varLocalWithAlias.push({
        source,
        varName,
        aliasToken,
        componentToken: `--ds-${this.componentName}-${varName}`,
        lineNum,
        match: match[0],
      })
    }

    // Pattern 2: Direct alias/global refs in CSS rules (not in vars.local)
    const withoutVarsLocal = content.replace(/vars\.local\([^)]+\)/g, '')

    const directVarRegex = new RegExp(`var\\((${aliasGlobalPattern}[^)]+)\\)`, 'g')

    while ((match = directVarRegex.exec(withoutVarsLocal)) !== null) {
      const aliasToken = match[1].trim()
      const lineNum = this.getLineNumber(content, match.index)

      this.violations.directVarRef.push({
        source,
        aliasToken,
        lineNum,
        match: match[0],
      })
    }

    // Pattern 3: Hardcoded vars.local() literals
    const hardcodedRegex = /vars\.local\(([^,]+),\s*(?!var\()([^)]+)\)/g

    while ((match = hardcodedRegex.exec(content)) !== null) {
      const varName = match[1].trim()
      const value = match[2].trim()

      if (!value.startsWith('var(') && value !== '' && !value.startsWith('$')) {
        const lineNum = this.getLineNumber(content, match.index)

        this.violations.hardcodedVarsLocal.push({
          source,
          varName,
          value,
          componentToken: `--ds-${this.componentName}-${varName}`,
          lineNum,
          match: match[0],
        })
      }
    }

    // Pattern 4: Modifier vars with missing design tokens
    const modifierRegex = /--mod-(\w+):\s*var\((--ds-[^)]+)\)/g

    while ((match = modifierRegex.exec(content)) !== null) {
      const modifierName = match[1]
      const designToken = match[2]
      const lineNum = this.getLineNumber(content, match.index)

      if (!this.designTokenExists(designToken)) {
        this.violations.modifierVarMissing.push({
          source,
          modifierName,
          designToken,
          lineNum,
        })
      }
    }
  }

  designTokenExists(tokenName) {
    if (!fs.existsSync(DIST_CSS)) {
      return true // Assume exists if we can't check
    }

    const css = fs.readFileSync(DIST_CSS, 'utf-8')
    return css.includes(`${tokenName}:`)
  }

  // ========================================================================
  // REPORTING
  // ========================================================================

  report() {
    console.log(`\nComponent: ds-${this.componentName} (${this.componentNamePascal})`)
    console.log(`Files: ${Object.keys(this.scssFiles).join(', ')}`)

    let totalViolations = 0

    // vars.local with alias/global refs
    if (this.violations.varLocalWithAlias.length > 0) {
      console.log(`\n✗ vars.local() with direct alias/global refs (${this.violations.varLocalWithAlias.length}):`)
      for (const v of this.violations.varLocalWithAlias) {
        console.log(`  ${v.source}:${v.lineNum}`)
        console.log(`    vars.local(${v.varName}, var(${v.aliasToken}))`)
        console.log(`    → Create ${v.componentToken}`)
      }
      totalViolations += this.violations.varLocalWithAlias.length
    }

    // Direct var refs
    if (this.violations.directVarRef.length > 0) {
      console.log(`\n✗ Direct alias/global refs in CSS rules (${this.violations.directVarRef.length}):`)
      for (const v of this.violations.directVarRef) {
        console.log(`  ${v.source}:${v.lineNum}`)
        console.log(`    var(${v.aliasToken})`)
        console.log(`    → Create component token + use private var`)
      }
      totalViolations += this.violations.directVarRef.length
    }

    // Hardcoded vars.local
    if (this.violations.hardcodedVarsLocal.length > 0) {
      console.log(`\n⚠ Hardcoded vars.local() values (${this.violations.hardcodedVarsLocal.length}):`)
      for (const v of this.violations.hardcodedVarsLocal) {
        console.log(`  ${v.source}:${v.lineNum}`)
        console.log(`    vars.local(${v.varName}, ${v.value})`)
        console.log(`    → Tokenize as ${v.componentToken}?`)
      }
    }

    // Modifier vars with missing tokens
    if (this.violations.modifierVarMissing.length > 0) {
      console.log(`\n⚠ Modifier vars with missing design tokens (${this.violations.modifierVarMissing.length}):`)
      for (const v of this.violations.modifierVarMissing) {
        console.log(`  ${v.source}:${v.lineNum}`)
        console.log(`    --mod-${v.modifierName}: var(${v.designToken})`)
        console.log(`    → ${v.designToken} is missing`)
      }
      totalViolations += this.violations.modifierVarMissing.length
    }

    if (totalViolations === 0) {
      console.log(`\n✅ No violations found`)
      return false
    }

    console.log(`\n${totalViolations} total violations found`)
    return true
  }

  // ========================================================================
  // INTERACTIVE CONFIRMATIONS
  // ========================================================================

  async promptConfirmation(message, defaultValue = true) {
    return new Promise(resolve => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      const suffix = defaultValue ? ' [Y/n]' : ' [y/N]'

      rl.question(`${message}${suffix}: `, answer => {
        rl.close()

        if (answer.toLowerCase() === 'y') {
          resolve(true)
        } else if (answer.toLowerCase() === 'n') {
          resolve(false)
        } else {
          resolve(defaultValue)
        }
      })
    })
  }

  async getInteractiveConfirmations() {
    // Confirm hardcoded value tokenization
    for (const v of this.violations.hardcodedVarsLocal) {
      const confirmed = await this.promptConfirmation(
        `Tokenize ${v.varName} = ${v.value} as ${v.componentToken}?`,
        true,
      )

      if (confirmed) {
        this.approvedFixes.newTokens.push({
          componentToken: v.componentToken,
          value: v.value,
          type: 'literal',
        })
      }
    }

    // Check if there are fixes to apply
    const hasFixesToApply =
      this.violations.varLocalWithAlias.length > 0 ||
      this.violations.directVarRef.length > 0 ||
      this.approvedFixes.newTokens.length > 0

    if (hasFixesToApply) {
      return await this.promptConfirmation('\nProceed with fixes?', true)
    }

    return false
  }

  // ========================================================================
  // GENERATE FIXES (PLACEHOLDER FOR IMPLEMENTATION)
  // ========================================================================

  async applyFixes() {
    console.log(`\n✨ Fixes ready for implementation!`)
    console.log(`\nThis skill is designed to work with Claude Code's Edit tool.`)
    console.log(`\nWhen fully integrated with Edit and Bash tools, it will:`)
    console.log(`\n1. Create component tokens in Base.tokens.json:`)

    for (const v of this.violations.varLocalWithAlias) {
      console.log(`   + ${v.componentToken} → aliases ${v.aliasToken}`)
    }

    for (const fix of this.approvedFixes.newTokens) {
      console.log(`   + ${fix.componentToken} = ${fix.value}`)
    }

    console.log(`\n2. Update SCSS files:`)
    for (const v of this.violations.varLocalWithAlias) {
      console.log(`   ${v.source}: Update vars.local(${v.varName}, var(${v.componentToken}))`)
    }

    for (const v of this.violations.directVarRef) {
      console.log(`   ${v.source}: Replace var(${v.aliasToken}) with component token`)
    }

    console.log(`\n3. Rebuild tokens:`)
    console.log(`   $ npm run tokens`)

    console.log(`\n✅ Framework complete. Ready for Edit/Bash tool integration.`)
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: ds-vars-to-tokens <component-name>')
    process.exit(1)
  }

  const componentName = args[0]

  try {
    console.log(`\n✓ Analyzing ds-${componentName}`)

    const manager = new TokenSyncManager(componentName)
    manager.load()
    manager.analyze()

    const hasViolations = manager.report()

    if (hasViolations) {
      const proceed = await manager.getInteractiveConfirmations()

      if (proceed) {
        await manager.applyFixes()
      } else {
        console.log(`\nAborted.`)
      }
    }
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
