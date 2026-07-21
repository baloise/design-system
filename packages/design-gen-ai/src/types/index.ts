// ============================================================
// Shared TypeScript Types — AI Frontend Generator MCP Server
// ============================================================

/** A single node in the generated layout tree */
export interface LayoutNode {
  component: string
  props?: Record<string, unknown>
  children?: LayoutNode[]
  content?: string
}

/** The root layout structure passed to validate_layout */
export interface Layout {
  layout: LayoutNode[]
}

/** A validation error — blocks file creation */
export interface ValidationError {
  component: string
  issue: string
  suggestion: string
  rule: 'whitelist' | 'nesting' | 'page-order' | 'single-stage'
}

/** A validation warning — non-blocking */
export interface ValidationWarning {
  type: 'missing-label' | 'content-length' | 'accessibility' | 'best-practice'
  message: string
  component?: string
}

/** Full result returned by validate_layout() */
export interface ValidationResult {
  valid: boolean
  score: number
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

/** Metadata for a single design system component */
export interface ComponentMetadata {
  tag: string
  category: ComponentCategory
  description: string
  pageLevel?: boolean
  maxOccurrences?: number
  allowedParents?: string[]
  allowedChildren?: string[]
}

export type ComponentCategory =
  | 'page-structure'
  | 'navigation'
  | 'layout'
  | 'content'
  | 'form'
  | 'structure'
  | 'overlay'
  | 'utility'

/** The full component registry loaded from component-registry.json */
export interface ComponentRegistry {
  version: string
  source: string
  totalComponents: number
  pageStructureRules: {
    order: string[]
    rules: string[]
  }
  nestingRules: Record<string, string[]>
  components: ComponentMetadata[]
}

/** Output format for file creation */
export type OutputFormat = 'angular' | 'html' | 'json'
