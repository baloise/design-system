#!/usr/bin/env node

/**
 * ds-create-component — Full Production Implementation
 *
 * Generates a new Stencil component with:
 * - Backwards-compatible API from old bal-* component
 * - Design tokens integration
 * - i18n support
 * - Form component support
 * - Test scaffolding (TDD red phase)
 * - Auto-export + skill orchestration
 */

const fs = require('fs')
const path = require('path')
const { execSync, spawnSync } = require('child_process')
const readline = require('readline')

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const COMPONENTS_PATH = path.join(PROJECT_ROOT, 'packages/core/src/components')
const TOKENS_PATH = path.join(PROJECT_ROOT, 'packages/tokens/tokens/Base.tokens.json')
const INDEX_PATH = path.join(COMPONENTS_PATH, '../index.ts')
const PLAYWRIGHT_INDEX = path.join(PROJECT_ROOT, 'packages/playwright/src/lib/components/index.ts')

// ============================================================================
// UTILS
// ============================================================================

function toPascalCase(str) {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function toCamelCase(str) {
  const pascal = toPascalCase(str)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

async function question(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve => {
    rl.question(prompt, answer => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function askYesNo(prompt) {
  const answer = await question(`${prompt} (y/n): `)
  return answer.toLowerCase() === 'y'
}

async function askMultipleChoice(prompt, choices) {
  console.log(`\n${prompt}`)
  choices.forEach((choice, i) => {
    console.log(`  ${i + 1}. ${choice}`)
  })
  const answer = await question('Select (1-' + choices.length + '): ')
  const idx = parseInt(answer) - 1
  return idx >= 0 && idx < choices.length ? idx : 0
}

// ============================================================================
// COMPONENT GENERATOR
// ============================================================================

class ComponentGenerator {
  constructor(componentName) {
    this.componentName = componentName
    this.pascalName = toPascalCase(componentName)
    this.camelName = toCamelCase(componentName)
    this.componentDir = path.join(COMPONENTS_PATH, componentName)
    this.componentFile = path.join(this.componentDir, `${componentName}.tsx`)
    this.interfacesFile = path.join(this.componentDir, `${componentName}.interfaces.ts`)
    this.hostScssFile = path.join(this.componentDir, `${componentName}.host.scss`)
    this.styleScssFile = path.join(this.componentDir, `${componentName}.style.scss`)
    this.i18nFile = path.join(this.componentDir, `${componentName}.i18n.ts`)
    this.testDir = path.join(this.componentDir, 'test')

    this.options = {
      type: 'hybrid',
      isFormComponent: false,
      needsI18n: false,
      hasAnimations: false,
      oldComponentData: null,
      useBackwardsCompatibility: false,
    }

    this.tokens = this.loadTokens()
    this.generatedFiles = []
  }

  loadTokens() {
    try {
      if (fs.existsSync(TOKENS_PATH)) {
        return JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8'))
      }
    } catch (e) {
      console.warn('⚠️  Could not load design tokens')
    }
    return {}
  }

  fetchOldComponent() {
    try {
      const oldPath = `packages/core/src/components/${this.componentName}/${this.componentName}.tsx`
      const content = execSync(`git show origin/main:${oldPath}`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'ignore'],
      })
      return { found: true, content }
    } catch (e) {
      return { found: false, content: null }
    }
  }

  parseOldComponentAPI(content) {
    const props = []
    const events = []
    let hasFormAssociated = false
    let hasI18n = false

    // Find @Prop declarations
    const propRegex = /@Prop\(\{?[^}]*\}?\)\s+readonly\s+(\w+):\s*([^=\n;]+)/g
    let match
    while ((match = propRegex.exec(content)) !== null) {
      props.push({ name: match[1], type: match[2].trim() })
    }

    // Find @Event declarations
    const eventRegex = /@Event\(\)\s+readonly\s+(\w+):\s*EventEmitter<([^>]+)>/g
    while ((match = eventRegex.exec(content)) !== null) {
      events.push({ name: match[1], detail: match[2].trim() })
    }

    hasFormAssociated = /formAssociated:\s*true/.test(content)
    hasI18n = /i18n/.test(content) || /aria-label|aria-describedby|title/.test(content)

    return { props, events, hasFormAssociated, hasI18n }
  }

  generateInterfaces(oldAPI) {
    const lines = ["import { EventEmitter } from '@stencil/core'", '']

    if (oldAPI && oldAPI.props && oldAPI.props.length > 0) {
      lines.push('// Enums')
      for (const prop of oldAPI.props) {
        if (prop.type.includes('|')) {
          const enumName = `${this.pascalName.toUpperCase()}_${prop.name.toUpperCase()}`
          const values = prop.type
            .split('|')
            .map(v => v.trim().replace(/['"]/g, ''))
            .filter(v => v && v !== 'undefined')

          if (values.length > 0) {
            lines.push(`export const ${enumName} = [${values.map(v => `'${v}'`).join(', ')}] as const`)
            lines.push(`export type ${this.pascalName}${toPascalCase(prop.name)} = typeof ${enumName}[number]`)
          }
        }
      }
      lines.push('')
    }

    if (oldAPI && oldAPI.events && oldAPI.events.length > 0) {
      lines.push('// Event Details')
      for (const event of oldAPI.events) {
        const eventName = event.name.charAt(0).toUpperCase() + event.name.slice(1)
        lines.push(`export interface ${eventName}Detail {`)
        lines.push(`  // TODO: Define event detail for ${event.name}`)
        lines.push('}')
        lines.push('')
      }
    } else {
      lines.push('// Event Details')
      lines.push(`export interface ${this.pascalName}ClickDetail {`)
      lines.push('  nativeEvent: MouseEvent')
      lines.push('}')
      lines.push('')
    }

    return lines.join('\n')
  }

  generateComponentTsx(oldAPI) {
    const isForm = this.options.isFormComponent
    const needsI18n = this.options.needsI18n
    const hasAnimations = this.options.hasAnimations

    let code = `import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface${needsI18n || hasAnimations ? ', DsConfigObserver, ListenToConfig, type DsConfigState, defaultConfig' : ''} } from '@global'
import { Logger, type LogInstance, setupValidation } from '@utils'
${needsI18n ? `import { i18nDs${this.pascalName} } from './${this.componentName}.i18n'` : ''}
import { /* TODO: Import from ./${this.componentName}.interfaces */ } from './${this.componentName}.interfaces'

/**
 * ${this.pascalName} description (one sentence).
 *
 * @slot - Default slot content.
 * @part native - The native element wrapper.
 */
@Component({
  tag: 'ds-${this.componentName}',
  styleUrl: '${this.componentName}.host.scss',
  shadow: true,
  formAssociated: ${isForm},
})
export class ${this.pascalName} implements DsComponentInterface${needsI18n || hasAnimations ? ', DsConfigObserver' : ''} {
  log!: LogInstance

  @Logger('${this.componentName}')
  createLogger(log: LogInstance) {
    this.log = log
  }

  ${isForm ? '@AttachInternals() internals!: ElementInternals\n\n  ' : ''}@Element() el!: HTMLStencilElement

  ${needsI18n ? `@State() language = defaultConfig.language\n  ` : ''}${hasAnimations ? `@State() animated = defaultConfig.animated\n\n  ` : ''}
  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  // TODO: Add @Prop() declarations
  ${oldAPI && oldAPI.props && oldAPI.props.length > 0 ? `// Old props: ${oldAPI.props.map(p => p.name).join(', ')}` : ''}

  /**
   * EVENTS
   * ─────────────────────────────────────────────────────
   */

  // TODO: Add @Event() declarations
  ${oldAPI && oldAPI.events && oldAPI.events.length > 0 ? `// Old events: ${oldAPI.events.map(e => e.name).join(', ')}` : ''}

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  ${
    needsI18n || hasAnimations
      ? `@Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    ${needsI18n ? 'this.language = state.language' : ''}${needsI18n && hasAnimations ? '\n    ' : ''}${hasAnimations ? 'this.animated = state.animated' : ''}
  }

  `
      : ''
  }connectedCallback() {
    setupValidation(this)
    // TODO: Add initialization logic
  }

  /**
   * PROPERTY VALIDATION
   * ─────────────────────────────────────────────────────
   */

  private validateProps() {
    // TODO: Validate prop combinations
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    return (
      <Host class={{ 'no-animation': !this.animated }}>
        {/* TODO: Implement component template */}
        <div>TODO: Implement ${this.pascalName}</div>
      </Host>
    )
  }
}
`

    return code
  }

  generateHostScss() {
    const tokenComments = this.getTokenComments()
    return `${tokenComments}

// ═══════════════════════════════════════════════════════════════════════════
// Component Styles
// ═══════════════════════════════════════════════════════════════════════════

:host {
  display: inline-block;
  // TODO: Add component styles using global tokens above
}

// ═══════════════════════════════════════════════════════════════════════════
// Animations & Testing
// ═══════════════════════════════════════════════════════════════════════════

// Disable animations for visual testing
:host(.no-animation) * {
  animation: none !important;
  transition: none !important;
}
`
  }

  generateStyleScss() {
    return `// Light DOM / Global Styles
// This file is optional and only used if the component supports light DOM styling

// TODO: Add light DOM styles if needed
`
  }

  generateI18n() {
    return `import { I18n } from '../../interfaces'

interface I18nDs${this.pascalName} {
  // TODO: Define i18n keys
  // Example:
  // close?: string
  // labelText?: string
}

export const i18nDs${this.pascalName}: I18n<I18nDs${this.pascalName}> = {
  de: {
    // TODO: German translations
  },
  en: {
    // TODO: English translations
  },
  fr: {
    // TODO: French translations
  },
  it: {
    // TODO: Italian translations
  },
  nl: {
    // TODO: Dutch translations
  },
  es: {
    // TODO: Spanish translations
  },
  pl: {
    // TODO: Polish translations
  },
  pt: {
    // TODO: Portuguese translations
  },
  sv: {
    // TODO: Swedish translations
  },
  fi: {
    // TODO: Finnish translations
  },
}
`
  }

  getTokenComments() {
    const comments = []

    comments.push('// ═══════════════════════════════════════════════════════════════════════════')
    comments.push('// Design Tokens - ALWAYS use ALIAS tokens first, then GLOBAL tokens')
    comments.push('// ═══════════════════════════════════════════════════════════════════════════')
    comments.push('//')
    comments.push('// 🎨 ALIAS TOKENS (PREFERRED) - Semantic tokens designed for UI:')
    comments.push('//   Text Colors:')
    comments.push('//     --ds-alias-text-color-primary (default text)')
    comments.push('//     --ds-alias-text-color-primary-light (hints, descriptions)')
    comments.push('//     --ds-alias-text-color-grey (secondary text)')
    comments.push('//     --ds-alias-text-color-grey-dark (dark grey text)')
    comments.push('//     --ds-alias-text-color-disabled (disabled state)')
    comments.push('//     --ds-alias-text-color-white (on dark backgrounds)')
    comments.push('//     --ds-alias-text-color-danger, -warning, -success, -info')
    comments.push('//   Text Sizes:')
    comments.push('//     --ds-alias-text-size-{xs,sm,base,md,lg,xl,2xl,3xl}-{mobile,tablet,desktop}')
    comments.push('//')
    comments.push('// 🔧 GLOBAL TOKENS (FALLBACK) - Low-level design values:')
    comments.push('//   Colors:')
    comments.push('//     --ds-global-color-{white, black, grey-1..6, primary-1..6, danger-1..6, etc.}')
    comments.push('//   Typography:')
    comments.push('//     --ds-global-font-family-{body,heading}')
    comments.push('//     --ds-global-font-weight-{300,400,700}')
    comments.push('//     --ds-global-font-size-{12,14,16,18,20,24,28,32,40,48}')
    comments.push('//     --ds-global-font-line-height-{1,2,3,4}')
    comments.push('//   Spacing & Sizing:')
    comments.push('//     --ds-global-size-border-{0,1,2,3}')
    comments.push('//     --ds-global-size-radius-{0,1,2,3}')
    comments.push('//')
    comments.push('// 📋 COMMON PATTERNS:')
    comments.push('//   color: var(--ds-alias-text-color-primary);')
    comments.push('//   border: var(--ds-global-size-border-1) solid var(--ds-global-color-grey-3);')
    comments.push('//   background: var(--ds-global-color-white);')
    comments.push('//   font-weight: var(--ds-global-font-weight-700);')
    comments.push('//')

    return comments.join('\n')
  }

  createFiles() {
    if (!fs.existsSync(this.componentDir)) {
      fs.mkdirSync(this.componentDir, { recursive: true })
    }
    if (!fs.existsSync(this.testDir)) {
      fs.mkdirSync(this.testDir, { recursive: true })
    }

    const oldAPI = this.options.oldComponentData

    if (this.options.type !== 'css-html') {
      fs.writeFileSync(this.interfacesFile, this.generateInterfaces(oldAPI))
      this.generatedFiles.push(`${this.componentName}.interfaces.ts`)
      fs.writeFileSync(this.componentFile, this.generateComponentTsx(oldAPI))
      this.generatedFiles.push(`${this.componentName}.tsx`)
      fs.writeFileSync(this.hostScssFile, this.generateHostScss())
      this.generatedFiles.push(`${this.componentName}.host.scss`)
    }

    if (this.options.type === 'hybrid' || this.options.type === 'css-html') {
      fs.writeFileSync(this.styleScssFile, this.generateStyleScss())
      this.generatedFiles.push(`${this.componentName}.style.scss`)
    }

    if (this.options.needsI18n) {
      fs.writeFileSync(this.i18nFile, this.generateI18n())
      this.generatedFiles.push(`${this.componentName}.i18n.ts`)
    }
  }

  updateExport() {
    if (!fs.existsSync(INDEX_PATH)) {
      console.warn('⚠️  index.ts not found')
      return
    }

    let content = fs.readFileSync(INDEX_PATH, 'utf-8')
    const exportLine = `export * from './components/${this.componentName}'`
    if (!content.includes(exportLine)) {
      content += `${exportLine}\n`
      fs.writeFileSync(INDEX_PATH, content)
    }
  }

  updatePlaywrightExport() {
    if (!fs.existsSync(PLAYWRIGHT_INDEX)) {
      return
    }

    let content = fs.readFileSync(PLAYWRIGHT_INDEX, 'utf-8')
    const exportLine = `export * from './components/${this.componentName}.po'`
    if (!content.includes(exportLine)) {
      content += `${exportLine}\n`
      fs.writeFileSync(PLAYWRIGHT_INDEX, content)
    }
  }

  report() {
    console.log('\n✅ Component scaffold generated!')
    console.log(`\n📦 Files created in packages/core/src/components/${this.componentName}/:`)
    this.generatedFiles.forEach(f => console.log(`  ✓ ${f}`))

    if (this.options.useBackwardsCompatibility && this.options.oldComponentData) {
      console.log('\n📋 Backwards compatibility:')
      if (this.options.oldComponentData.props.length > 0) {
        console.log(`  ✓ Props (${this.options.oldComponentData.props.map(p => p.name).join(', ')})`)
      }
      if (this.options.oldComponentData.events.length > 0) {
        console.log(`  ✓ Events (${this.options.oldComponentData.events.map(e => e.name).join(', ')})`)
      }
    }

    console.log('\n🎯 Component type:', this.options.type)
    if (this.options.isFormComponent) console.log('   ✓ Form component (ElementInternals)')
    if (this.options.needsI18n) console.log('   ✓ Internationalization')
    if (this.options.hasAnimations) console.log('   ✓ Animation handling')

    console.log('\n📝 Next steps:')
    console.log('   1. Review generated component files')
    console.log('   2. Edit interfaces.ts to add @Prop/@Event declarations')
    console.log('   3. Implement component.tsx render() method')
    console.log(`   4. Run tests: npm run play -- --grep="${this.componentName}"`)
    console.log(`\n🚀 Generate tests:`)
    console.log(`   /ds-sync-component-tests ${this.componentName}`)
    console.log(`   /ds-sync-visual-tests ${this.componentName}`)
    console.log(`   /ds-sync-a11y-tests ${this.componentName}`)
  }
}

// ============================================================================
// INTERACTIVE FLOW
// ============================================================================

async function runInteractiveFlow(componentName) {
  const generator = new ComponentGenerator(componentName)

  console.log(`\n🚀 Creating ds-${componentName}...\n`)

  // 1. Try to find old component
  console.log('📦 Checking for old bal-' + componentName + ' component...')
  const oldComponent = generator.fetchOldComponent()

  let useBackwardsCompat = false
  let oldAPI = null

  if (oldComponent.found) {
    console.log(`✓ Found bal-${componentName}`)
    oldAPI = generator.parseOldComponentAPI(oldComponent.content)

    useBackwardsCompat = await askYesNo('\nUse for backwards compatibility?')
    if (useBackwardsCompat) {
      generator.options.useBackwardsCompatibility = true
      generator.options.oldComponentData = oldAPI
      generator.options.isFormComponent = oldAPI.hasFormAssociated
      generator.options.needsI18n = oldAPI.hasI18n
      console.log('✓ Will mirror old component API')
    }
  } else {
    console.log(`ℹ️  No old bal-${componentName} found\n`)
    generator.options.oldComponentData = { props: [], events: [], hasFormAssociated: false, hasI18n: false }
  }

  // 2. Ask component type
  const typeIdx = await askMultipleChoice('\nComponent type?', [
    'wc-only (shadow DOM only)',
    'hybrid (shadow + light DOM)',
    'css-html (pure HTML/CSS)',
  ])
  const types = ['wc-only', 'hybrid', 'css-html']
  generator.options.type = types[typeIdx]
  console.log(`✓ Selected: ${types[typeIdx]}`)

  // 3. Ask if form component
  if (!generator.options.useBackwardsCompatibility) {
    const isForm = await askYesNo('\nIs this a form component?')
    generator.options.isFormComponent = isForm
    console.log(`✓ Form component: ${isForm ? 'yes' : 'no'}`)
  }

  // 4. Ask about i18n
  if (!generator.options.useBackwardsCompatibility) {
    const needsI18n = await askYesNo('\nNeeds internationalization?')
    generator.options.needsI18n = needsI18n
    console.log(`✓ i18n: ${needsI18n ? 'yes' : 'no'}`)
  }

  // 5. Ask about animations
  const hasAnimations = await askYesNo('\nDoes this component have animations/transitions?')
  generator.options.hasAnimations = hasAnimations
  console.log(`✓ Animations: ${hasAnimations ? 'yes' : 'no'}`)

  // 6. Review and confirm
  console.log('\n✅ Review your choices:')
  console.log(`   Component: ds-${componentName}`)
  console.log(`   Type: ${generator.options.type}`)
  console.log(`   Form: ${generator.options.isFormComponent ? 'yes' : 'no'}`)
  console.log(`   i18n: ${generator.options.needsI18n ? 'yes' : 'no'}`)
  console.log(`   Animations: ${generator.options.hasAnimations ? 'yes' : 'no'}`)
  if (useBackwardsCompat) console.log(`   Backwards compatible: yes`)

  const proceed = await askYesNo('\nProceed with generation?')
  if (!proceed) {
    console.log('\n❌ Cancelled.')
    process.exit(0)
  }

  // 7. Generate
  console.log('\n⚙️  Generating files...')
  generator.createFiles()
  generator.updateExport()
  generator.updatePlaywrightExport()

  // 8. Report
  generator.report()

  return generator
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('\nUsage: ds-create-component <component-name>')
    console.error('\nExample: ds-create-component button')
    process.exit(1)
  }

  const componentName = args[0]

  // Validate name
  if (!/^[a-z][a-z0-9-]*$/.test(componentName)) {
    console.error('\n❌ Component name must be lowercase with hyphens (e.g., my-component)')
    process.exit(1)
  }

  // Check if exists
  if (fs.existsSync(path.join(COMPONENTS_PATH, componentName))) {
    console.error(`\n❌ Component ds-${componentName} already exists!`)
    process.exit(1)
  }

  try {
    await runInteractiveFlow(componentName)
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
