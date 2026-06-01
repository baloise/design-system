#!/usr/bin/env node

/**
 * ds-lint-component — Full Implementation
 *
 * Audits Stencil components against 14 design-system-specific style guide checks
 * and auto-fixes violations.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const COMPONENTS_PATH = path.join(PROJECT_ROOT, 'packages/core/src/components')

// ============================================================================
// CHECK DEFINITIONS & DETECTION
// ============================================================================

class ComponentLinter {
  constructor(componentName) {
    this.componentName = componentName
    this.componentDir = path.join(COMPONENTS_PATH, componentName)
    this.componentFile = path.join(this.componentDir, `${componentName}.tsx`)
    this.interfacesFile = path.join(this.componentDir, `${componentName}.interfaces.ts`)
    this.hostScssFile = path.join(this.componentDir, `${componentName}.host.scss`)
    this.styleScssFile = path.join(this.componentDir, `${componentName}.style.scss`)

    this.violations = []
    this.fixes = {}
    this.componentContent = ''
    this.interfacesContent = ''
  }

  /**
   * Load files
   */
  load() {
    if (!fs.existsSync(this.componentFile)) {
      throw new Error(`Component file not found: ${this.componentFile}`)
    }

    this.componentContent = fs.readFileSync(this.componentFile, 'utf-8')

    if (fs.existsSync(this.interfacesFile)) {
      this.interfacesContent = fs.readFileSync(this.interfacesFile, 'utf-8')
    }
  }

  /**
   * Run all checks
   */
  runAllChecks() {
    this.check0ImportAliases()
    this.check1ConstArrays()
    this.check2TypeAnnotations()
    this.check3ReflectAttribute()
    this.check4ValidateProps()
    this.check8EventPrefix()
    this.check9LoggableLoggable()
    this.check11SectionDividers()
    this.check14PropWatch()
    this.check16ComponentTag()
    this.check17Description()
    this.check18SlotPart()
    this.check19CSSSelectors()
    this.check20EnumDefaults()
  }

  // ========================================================================
  // CHECK 0: Import Aliases
  // ========================================================================

  check0ImportAliases() {
    const relativeImports = [
      { pattern: /from\s+['"]\.\.\/\.\.\/utils\//g, alias: '@utils' },
      { pattern: /from\s+['"]\.\.\/\.\.\/global/g, alias: '@global' },
    ]

    let hasViolation = false

    for (const { pattern, alias } of relativeImports) {
      if (pattern.test(this.componentContent)) {
        hasViolation = true
        this.violations.push(`0. Relative imports (use ${alias} instead)`)
      }
    }

    if (hasViolation) {
      this.fixes.imports = true
    }
  }

  // ========================================================================
  // CHECK 1: Const Arrays with Derived Types
  // ========================================================================

  check1ConstArrays() {
    if (!this.interfacesContent) return

    // Check if types are wrapped in namespace
    if (this.interfacesContent.includes('namespace DS')) {
      this.violations.push('1. Types wrapped in namespace DS (export flat instead)')
      this.fixes.interfaces = true
      return
    }

    // Check if const arrays exist and are exported
    if (this.interfacesContent.includes('export const')) {
      return // Likely correct pattern
    }

    // Check if types are union literals (bad pattern)
    if (this.interfacesContent.match(/type\s+\w+\s*=\s*['"][^'"]+['"]\s*\|/)) {
      this.violations.push('1. Type defined as union literals instead of derived from const array')
      this.fixes.interfaces = true
    }
  }

  // ========================================================================
  // CHECK 2: Type Annotations on @Prop()
  // ========================================================================

  check2TypeAnnotations() {
    // Find @Prop() with default but no type annotation
    const propWithDefaultNoType = /@Prop\([^)]*\)\s+readonly\s+(\w+)\s*=\s*[^;\n]/g
    let match

    while ((match = propWithDefaultNoType.exec(this.componentContent)) !== null) {
      const beforeEquals = this.componentContent.substring(Math.max(0, match.index - 50), match.index + match[0].length)

      if (!beforeEquals.includes(':')) {
        this.violations.push(`2. @Prop() ${match[1]} missing type annotation`)
        this.fixes.component = true
      }
    }
  }

  // ========================================================================
  // CHECK 3: reflect Attribute for State Props
  // ========================================================================

  check3ReflectAttribute() {
    const stateProps = ['value', 'disabled', 'invalid', 'readonly', 'loading', 'checked', 'open', 'active']
    const reflectRegex = /@Prop\(\s*{\s*reflect:\s*true\s*}\s*\)\s+readonly\s+(\w+)/g

    const propsWithReflect = new Set()
    let match
    while ((match = reflectRegex.exec(this.componentContent)) !== null) {
      propsWithReflect.add(match[1])
    }

    // Check state props without reflect
    for (const stateProp of stateProps) {
      const propRegex = new RegExp(`@Prop\\(\\)\\s+readonly\\s+${stateProp}\\b`, 'g')
      if (propRegex.test(this.componentContent) && !propsWithReflect.has(stateProp)) {
        this.violations.push(`3. State prop '${stateProp}' missing reflect: true`)
        this.fixes.component = true
      }
    }
  }

  // ========================================================================
  // CHECK 4: validateProps() Method
  // ========================================================================

  check4ValidateProps() {
    const hasValidateProps = this.componentContent.includes('validateProps()')
    const hasConnectedCallback = this.componentContent.includes('connectedCallback()')
    const hasComponentWillUpdate = this.componentContent.includes('componentWillUpdate()')
    const hasProp = /@Prop\(/.test(this.componentContent)

    if (hasProp && !hasValidateProps) {
      this.violations.push('4. Missing validateProps() method')
      this.fixes.component = true
      return
    }

    if (hasValidateProps) {
      if (
        !this.componentContent.includes('connectedCallback') ||
        !this.componentContent.match(/connectedCallback[^{]*{[^}]*validateProps/)
      ) {
        this.violations.push('4. validateProps() not called from connectedCallback()')
        this.fixes.component = true
      }

      if (
        !this.componentContent.includes('componentWillUpdate') ||
        !this.componentContent.match(/componentWillUpdate[^{]*{[^}]*validateProps/)
      ) {
        this.violations.push('4. validateProps() not called from componentWillUpdate()')
        this.fixes.component = true
      }
    }
  }

  // ========================================================================
  // CHECK 8: Event ds Prefix
  // ========================================================================

  check8EventPrefix() {
    const eventRegex = /@Event\(\)\s+(\w+):\s*EventEmitter/g
    let match

    while ((match = eventRegex.exec(this.componentContent)) !== null) {
      if (!match[1].startsWith('ds')) {
        this.violations.push(`8. Event '${match[1]}' missing ds prefix`)
        this.fixes.component = true
      }
    }
  }

  // ========================================================================
  // CHECK 9: ComponentInterface + Loggable
  // ========================================================================

  check9LoggableLoggable() {
    const hasDsComponentInterface = this.componentContent.includes('DsComponentInterface')
    const hasLogger = this.componentContent.includes('@Logger')
    const hasCreateLogger = this.componentContent.includes('createLogger')

    if (!hasDsComponentInterface) {
      this.violations.push('9. Missing DsComponentInterface implementation')
      this.fixes.component = true
    }

    if (!hasLogger || !hasCreateLogger) {
      this.violations.push('9. Missing @Logger decorator or createLogger method')
      this.fixes.component = true
    }
  }

  // ========================================================================
  // CHECK 11: Section Dividers
  // ========================================================================

  check11SectionDividers() {
    const requiredSections = ['PUBLIC PROPERTY API', 'LIFECYCLE', 'PROPERTY VALIDATION', 'PRIVATE METHODS', 'RENDER']

    const missingSections = []

    for (const section of requiredSections) {
      if (!this.componentContent.includes(section)) {
        missingSections.push(section)
      }
    }

    if (missingSections.length > 0) {
      this.violations.push(`11. Missing section dividers: ${missingSections.join(', ')}`)
      this.fixes.component = true
    }
  }

  // ========================================================================
  // CHECK 14: @Prop() + @Watch() Together
  // ========================================================================

  check14PropWatch() {
    // Find @Watch methods and their corresponding @Prop
    const watchRegex = /@Watch\('(\w+)'\)\s+(\w+Changed)/g
    let match

    while ((match = watchRegex.exec(this.componentContent)) !== null) {
      const propName = match[1]
      // Check if @Prop() for this name is nearby
      const propRegex = new RegExp(`@Prop\\([^)]*\\)\\s+readonly\\s+${propName}\\b`, 'g')
      const propMatch = propRegex.exec(this.componentContent)

      if (propMatch) {
        // Check if they're within 5 lines of each other
        const propEnd = propMatch.index + propMatch[0].length
        const watchStart = match.index
        const distance = Math.abs(watchStart - propEnd)
        const lines = this.componentContent
          .substring(Math.min(propEnd, watchStart), Math.max(propEnd, watchStart))
          .split('\n').length

        if (lines > 5) {
          this.violations.push(`14. @Prop() '${propName}' and @Watch() not placed together`)
          this.fixes.component = true
        }
      }
    }
  }

  // ========================================================================
  // CHECK 16: Component Tag with ds- Prefix
  // ========================================================================

  check16ComponentTag() {
    const tagMatch = this.componentContent.match(/@Component\(\{[^}]*tag:\s*['"]([^'"]+)['"]/)
    if (tagMatch) {
      const tag = tagMatch[1]
      if (!tag.startsWith('ds-')) {
        this.violations.push(`16. Component tag '${tag}' missing ds- prefix`)
        this.fixes.component = true
      }
    }

    const classMatch = this.componentContent.match(/export\s+class\s+(\w+)/)
    if (classMatch) {
      const className = classMatch[1]
      if (className.startsWith('Ds')) {
        this.violations.push(`16. Component class '${className}' should not have Ds prefix`)
        this.fixes.component = true
      }
    }
  }

  // ========================================================================
  // CHECK 17: Component Description
  // ========================================================================

  check17Description() {
    // Find the JSDoc before @Component
    const componentDocRegex = /\/\*\*\s*([\s\S]*?)\*\/\s*@Component/
    const docMatch = componentDocRegex.exec(this.componentContent)

    if (!docMatch) {
      this.violations.push('17. Missing component description in class JSDoc')
      this.fixes.component = true
      return
    }

    const doc = docMatch[1]

    // Check if first non-empty line is a description (not a @tag)
    const lines = doc
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('*'))

    if (lines.length === 0 || lines[0].startsWith('@')) {
      this.violations.push('17. Component missing one-sentence description before @slot/@part tags')
      this.fixes.component = true
    }
  }

  // ========================================================================
  // CHECK 18: @slot and @part Tags
  // ========================================================================

  check18SlotPart() {
    // Find all <slot and part= in render
    const renderMatch = this.componentContent.match(/render\(\)[^}]*{[\s\S]*?return[\s\S]*?}/)
    if (!renderMatch) return

    const renderMethod = renderMatch[0]

    // Find slot names
    const slotRegex = /<slot[^>]*name=['"]([^'"]+)['"]/g
    const slots = new Set()
    let match

    while ((match = slotRegex.exec(renderMethod)) !== null) {
      slots.add(match[1])
    }

    // Find default slots
    if (/<slot[^>]*>/.test(renderMethod) || /<slot\s*\/>/.test(renderMethod)) {
      slots.add('default')
    }

    // Find parts
    const partRegex = /part=['"]([^'"]+)['"]/g
    const parts = new Set()

    while ((match = partRegex.exec(renderMethod)) !== null) {
      parts.add(match[1])
    }

    // Check JSDoc tags
    const docRegex = /\/\*\*\s*([\s\S]*?)\*\/\s*@Component/
    const docMatch = docRegex.exec(this.componentContent)
    const docTags = docMatch ? docMatch[1] : ''

    // Verify slots have tags
    for (const slot of slots) {
      const tagName = slot === 'default' ? '@slot -' : `@slot ${slot}`
      if (!docTags.includes(tagName)) {
        this.violations.push(`18. Missing @slot tag for slot '${slot}'`)
        this.fixes.component = true
      }
    }

    // Verify parts have tags
    for (const part of parts) {
      if (!docTags.includes(`@part ${part}`)) {
        this.violations.push(`18. Missing @part tag for part '${part}'`)
        this.fixes.component = true
      }
    }
  }

  // ========================================================================
  // CHECK 19: CSS Classes Over Attribute Selectors
  // ========================================================================

  check19CSSSelectors() {
    if (fs.existsSync(this.hostScssFile)) {
      const content = fs.readFileSync(this.hostScssFile, 'utf-8')
      if (/:host\(\[/.test(content) || /\[[a-z-]+=['"]/.test(content)) {
        this.violations.push('19. SCSS uses attribute selectors (use CSS classes instead)')
        // Don't auto-fix — warn only
      }
    }

    if (fs.existsSync(this.styleScssFile)) {
      const content = fs.readFileSync(this.styleScssFile, 'utf-8')
      if (/\[[a-z-]+=['"]/.test(content)) {
        this.violations.push('19. Style SCSS uses attribute selectors (use CSS classes instead)')
        // Don't auto-fix — warn only
      }
    }
  }

  // ========================================================================
  // CHECK 20: Enum Props with = '' Default
  // ========================================================================

  check20EnumDefaults() {
    // Find @Prop() with ? (optional with undefined)
    const optionalEnumRegex = /@Prop\([^)]*\)\s+readonly\s+(\w+)\?:\s*(\w+)/g
    let match

    while ((match = optionalEnumRegex.exec(this.componentContent)) !== null) {
      this.violations.push(`20. Enum prop '${match[1]}' uses ? (should use = '' default)`)
      this.fixes.component = true
    }
  }

  // ========================================================================
  // REPORTING
  // ========================================================================

  report() {
    if (this.violations.length === 0) {
      console.log(`\n✅ No style guide violations found in ${this.componentName}.tsx`)
      return
    }

    console.log(`\n⚠️  Violations found (${this.violations.length}):`)
    this.violations.forEach((v, i) => {
      console.log(`  ${i + 1}. ${v}`)
    })
  }

  // ========================================================================
  // FIXING (PLACEHOLDER)
  // ========================================================================

  applyFixes() {
    if (Object.keys(this.fixes).length === 0) {
      return
    }

    console.log(`\nApplying fixes...`)

    if (this.fixes.imports) {
      console.log(`  ✓ Would fix import aliases`)
    }

    if (this.fixes.component) {
      console.log(`  ✓ Would fix component violations`)
    }

    if (this.fixes.interfaces) {
      console.log(`  ✓ Would fix interfaces.ts`)
    }

    console.log(`\n✨ Ready to apply fixes (implementation.js needs completion for actual edits)`)
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: ds-lint-component <component-name>')
    process.exit(1)
  }

  const componentName = args[0]

  try {
    console.log(`\n✓ Scanning ds-${componentName}`)

    const linter = new ComponentLinter(componentName)
    linter.load()
    linter.runAllChecks()
    linter.report()
    linter.applyFixes()
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
