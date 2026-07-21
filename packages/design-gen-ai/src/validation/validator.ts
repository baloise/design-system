// ============================================================
// Validation Engine — Phase 3: validate_layout() Implementation
// Programmatic, deterministic checks against Designsystem rules
// ============================================================

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import type {
  Layout,
  LayoutNode,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ComponentRegistry,
} from '../types/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const REGISTRY_PATH = resolve(__dirname, '../../data/component-registry.json')
const TAGS_ALL_PATH = resolve(__dirname, '../../../core/src/tags-all.ts')

// ============================================================
// Registry & Tag helpers
// ============================================================

let _registry: ComponentRegistry | null = null

function loadRegistry(): ComponentRegistry {
  if (_registry) return _registry
  const raw = readFileSync(REGISTRY_PATH, 'utf-8')
  _registry = JSON.parse(raw) as ComponentRegistry
  return _registry
}

function getLiveTags(): Set<string> {
  try {
    const content = readFileSync(TAGS_ALL_PATH, 'utf-8')
    const matches = content.match(/"([^"]+)"/g) ?? []
    return new Set(matches.map(m => m.replace(/"/g, '')))
  } catch {
    // Fall back to registry tags
    const registry = loadRegistry()
    return new Set(registry.components.map(c => c.tag))
  }
}

// Input components that require a visible label for accessibility
const INPUT_TAGS = new Set([
  'bal-input',
  'bal-textarea',
  'bal-select',
  'bal-number-input',
  'bal-input-date',
  'bal-time-input',
])

// Expected page-level order: navbar → stage → content → footer
const PAGE_ORDER = ['bal-navbar', 'bal-stage', 'bal-content', 'bal-footer']

// ============================================================
// Tree traversal helpers
// ============================================================

interface NodeWithParent {
  node: LayoutNode
  parent: LayoutNode | null
  depth: number
}

function collectAll(nodes: LayoutNode[], parent: LayoutNode | null = null, depth = 0): NodeWithParent[] {
  const result: NodeWithParent[] = []
  for (const node of nodes) {
    result.push({ node, parent, depth })
    if (node.children?.length) {
      result.push(...collectAll(node.children, node, depth + 1))
    }
  }
  return result
}

function countTag(nodes: LayoutNode[], tag: string): number {
  return collectAll(nodes).filter(({ node }) => node.component === tag).length
}

// ============================================================
// Check 1: Page order (top-level only)
// Rule: bal-navbar → bal-stage → bal-content → bal-footer
// ============================================================

function checkPageOrder(topLevel: LayoutNode[], errors: ValidationError[]): void {
  const positions: Record<string, number[]> = {}

  topLevel.forEach((node, index) => {
    if (!positions[node.component]) positions[node.component] = []
    positions[node.component].push(index)
  })

  // Check: navbar before stage, stage before content, content before footer
  const orderedComponents = PAGE_ORDER.filter(tag => positions[tag]?.length)

  for (let i = 0; i < orderedComponents.length - 1; i++) {
    const a = orderedComponents[i]
    const b = orderedComponents[i + 1]
    const maxA = Math.max(...(positions[a] ?? [0]))
    const minB = Math.min(...(positions[b] ?? [Infinity]))

    if (maxA > minB) {
      errors.push({
        component: b,
        issue: `Page order violation: "${b}" appears before "${a}". Required order: navbar → stage → content → footer.`,
        suggestion: `Move "${a}" to appear before "${b}" in the layout.`,
        rule: 'page-order',
      })
    }
  }

  // Check: if bal-footer exists, it must be the last top-level element
  if (positions['bal-footer']) {
    const footerIndex = Math.max(...positions['bal-footer'])
    if (footerIndex !== topLevel.length - 1) {
      errors.push({
        component: 'bal-footer',
        issue: `"bal-footer" must be the last element on the page but is at position ${footerIndex + 1} of ${topLevel.length}.`,
        suggestion: 'Move bal-footer to the very end of the layout.',
        rule: 'page-order',
      })
    }
  }

  // Check: if bal-navbar exists, it must be the first top-level element
  if (positions['bal-navbar']) {
    const navbarIndex = Math.min(...positions['bal-navbar'])
    if (navbarIndex !== 0) {
      errors.push({
        component: 'bal-navbar',
        issue: `"bal-navbar" must be the first element on the page but is at position ${navbarIndex + 1}.`,
        suggestion: 'Move bal-navbar to the very beginning of the layout.',
        rule: 'page-order',
      })
    }
  }
}

// ============================================================
// Check 2: Single stage rule
// Rule: bal-stage may appear at most once in the entire tree
// ============================================================

function checkSingleStage(nodes: LayoutNode[], errors: ValidationError[]): void {
  const count = countTag(nodes, 'bal-stage')
  if (count > 1) {
    errors.push({
      component: 'bal-stage',
      issue: `"bal-stage" appears ${count} times. It may appear at most once per page.`,
      suggestion: 'Remove all but one bal-stage from the layout.',
      rule: 'single-stage',
    })
  }
}

// ============================================================
// Check 3: Component whitelist
// Rule: every component must be in the official tags-all.ts list
// ============================================================

function checkWhitelist(all: NodeWithParent[], allowedTags: Set<string>, errors: ValidationError[]): void {
  const reported = new Set<string>()

  for (const { node } of all) {
    if (!allowedTags.has(node.component) && !reported.has(node.component)) {
      errors.push({
        component: node.component,
        issue: `"${node.component}" is not an allowed Helvetia Design System component.`,
        suggestion: `Remove "${node.component}" and replace it with an approved bal-* component from the component list.`,
        rule: 'whitelist',
      })
      reported.add(node.component)
    }
  }
}

// ============================================================
// Check 4: Nesting rules
// Rule: each child must be allowed inside its parent
// ============================================================

function checkNesting(all: NodeWithParent[], nestingRules: Record<string, string[]>, errors: ValidationError[]): void {
  const reported = new Set<string>()

  for (const { node, parent } of all) {
    if (!parent) continue // Top-level nodes don't have a parent nesting rule

    const allowed = nestingRules[parent.component]
    if (!allowed) continue // Parent has no nesting restrictions

    if (!allowed.includes(node.component)) {
      const key = `${parent.component}::${node.component}`
      if (!reported.has(key)) {
        errors.push({
          component: node.component,
          issue: `"${node.component}" is not allowed inside "${parent.component}".`,
          suggestion: `Allowed children of "${parent.component}": ${allowed.join(', ')}.`,
          rule: 'nesting',
        })
        reported.add(key)
      }
    }
  }
}

// ============================================================
// Check 5: Missing labels (warning)
// Rule: every input-like element must have a bal-label sibling or parent
// ============================================================

function checkMissingLabels(all: NodeWithParent[], warnings: ValidationWarning[]): void {
  for (const { node, parent } of all) {
    if (!INPUT_TAGS.has(node.component)) continue

    // Check if parent contains a bal-label child
    const siblings = parent?.children ?? []
    const hasLabel = siblings.some(s => s.component === 'bal-label' || s.component === 'bal-field-label')

    if (!hasLabel) {
      warnings.push({
        type: 'missing-label',
        message: `"${node.component}" is missing a bal-label. Add <bal-label> before the input for accessibility.`,
        component: node.component,
      })
    }
  }
}

// ============================================================
// Check 6: Content length (warning)
// ============================================================

function checkContentLength(all: NodeWithParent[], warnings: ValidationWarning[]): void {
  for (const { node } of all) {
    if (typeof node.content === 'string' && node.content.length > 500) {
      warnings.push({
        type: 'content-length',
        message: `"${node.component}" has very long content (${node.content.length} chars). Consider splitting into multiple components.`,
        component: node.component,
      })
    }
  }
}

// ============================================================
// Scoring
// ============================================================

function calculateScore(errors: ValidationError[], warnings: ValidationWarning[]): number {
  const DEDUCTIONS: Record<ValidationError['rule'], number> = {
    'whitelist': 20,
    'nesting': 15,
    'page-order': 10,
    'single-stage': 15,
  }

  const WARNING_DEDUCTIONS: Record<ValidationWarning['type'], number> = {
    'missing-label': 5,
    'content-length': 3,
    'accessibility': 5,
    'best-practice': 2,
  }

  let score = 100

  for (const error of errors) {
    score -= DEDUCTIONS[error.rule] ?? 10
  }

  for (const warning of warnings) {
    score -= WARNING_DEDUCTIONS[warning.type] ?? 3
  }

  return Math.max(0, score)
}

// ============================================================
// Main export: validateLayout()
// ============================================================

export function validateLayout(layout: Layout): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []

  const registry = loadRegistry()
  const allowedTags = getLiveTags()
  const nestingRules = registry.nestingRules
  const topLevel = layout.layout
  const all = collectAll(topLevel)

  // Run all checks
  checkPageOrder(topLevel, errors)
  checkSingleStage(topLevel, errors)
  checkWhitelist(all, allowedTags, errors)
  checkNesting(all, nestingRules, errors)
  checkMissingLabels(all, warnings)
  checkContentLength(all, warnings)

  const score = calculateScore(errors, warnings)

  return {
    valid: errors.length === 0,
    score,
    errors,
    warnings,
  }
}
