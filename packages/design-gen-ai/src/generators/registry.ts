// ============================================================
// Registry Loader — Phase 2: get_components() Implementation
// Reads component-registry.json + validates live against tags-all.ts
// ============================================================

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { ComponentRegistry, ComponentMetadata, ComponentCategory } from '../types/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Paths resolved relative to this file's location
const REGISTRY_PATH = resolve(__dirname, '../../data/component-registry.json')
const TAGS_ALL_PATH = resolve(__dirname, '../../../core/src/tags-all.ts')

// ============================================================
// Page Type Filters (for token efficiency)
// Only return components relevant to the requested page type
// ============================================================

const PAGE_TYPE_FILTERS: Record<string, string[]> = {
  form: [
    // Page skeleton
    'bal-navbar',
    'bal-navbar-brand',
    'bal-navbar-menu',
    'bal-navbar-menu-start',
    'bal-navbar-menu-end',
    'bal-content',
    'bal-stack',
    'bal-footer',
    'bal-heading',
    'bal-text',
    'bal-notification',
    'bal-divider',
    // Form structure
    'bal-form',
    'bal-form-grid',
    'bal-form-col',
    'bal-field',
    'bal-field-label',
    'bal-field-control',
    'bal-field-hint',
    'bal-field-message',
    // Inputs
    'bal-label',
    'bal-input',
    'bal-input-date',
    'bal-number-input',
    'bal-textarea',
    'bal-file-upload',
    'bal-input-slider',
    'bal-input-stepper',
    // Selection
    'bal-select',
    'bal-select-option',
    'bal-checkbox-group',
    'bal-checkbox',
    'bal-radio-group',
    'bal-radio',
    'bal-switch',
    // Actions
    'bal-button',
    'bal-button-group',
    // Multi-step
    'bal-steps',
    'bal-step-item',
  ],

  landing: [
    // Page skeleton
    'bal-navbar',
    'bal-navbar-brand',
    'bal-navbar-menu',
    'bal-navbar-menu-start',
    'bal-navbar-menu-end',
    'bal-stage',
    'bal-stage-head',
    'bal-stage-body',
    'bal-stage-foot',
    'bal-stage-image',
    'bal-stage-back-link',
    'bal-content',
    'bal-stack',
    'bal-footer',
    // Content
    'bal-heading',
    'bal-text',
    'bal-card',
    'bal-card-title',
    'bal-card-subtitle',
    'bal-card-content',
    'bal-card-actions',
    'bal-button',
    'bal-button-group',
    'bal-list',
    'bal-list-item',
    'bal-list-item-title',
    'bal-list-item-subtitle',
    'bal-list-item-icon',
    'bal-list-item-content',
    'bal-accordion',
    'bal-accordion-summary',
    'bal-accordion-details',
    'bal-icon',
    'bal-badge',
    'bal-tag',
    'bal-tag-group',
    'bal-divider',
    'bal-shape',
    'bal-notification',
  ],

  dashboard: [
    // Page skeleton
    'bal-navbar',
    'bal-navbar-brand',
    'bal-navbar-menu',
    'bal-navbar-menu-start',
    'bal-navbar-menu-end',
    'bal-stage',
    'bal-stage-head',
    'bal-stage-body',
    'bal-content',
    'bal-stack',
    'bal-footer',
    // Content blocks
    'bal-heading',
    'bal-text',
    'bal-card',
    'bal-card-title',
    'bal-card-content',
    'bal-card-actions',
    'bal-button',
    'bal-button-group',
    // Data display
    'bal-data',
    'bal-data-item',
    'bal-data-label',
    'bal-data-value',
    'bal-table',
    // Navigation within page
    'bal-tabs',
    'bal-tab-item',
    'bal-accordion',
    'bal-accordion-summary',
    'bal-accordion-details',
    // Status
    'bal-badge',
    'bal-tag',
    'bal-tag-group',
    'bal-divider',
    'bal-notification',
    'bal-spinner',
    'bal-progress-bar',
  ],

  detail: [
    // Page skeleton
    'bal-navbar',
    'bal-navbar-brand',
    'bal-navbar-menu',
    'bal-navbar-menu-start',
    'bal-navbar-menu-end',
    'bal-content',
    'bal-stack',
    'bal-footer',
    // Content
    'bal-heading',
    'bal-text',
    'bal-card',
    'bal-card-title',
    'bal-card-content',
    'bal-card-actions',
    'bal-data',
    'bal-data-item',
    'bal-data-label',
    'bal-data-value',
    'bal-list',
    'bal-list-item',
    'bal-list-item-title',
    'bal-list-item-subtitle',
    'bal-list-item-icon',
    'bal-list-item-content',
    'bal-button',
    'bal-button-group',
    'bal-accordion',
    'bal-accordion-summary',
    'bal-accordion-details',
    'bal-badge',
    'bal-tag',
    'bal-divider',
    'bal-hint',
    'bal-hint-title',
    'bal-hint-text',
    'bal-notification',
  ],
}

// ============================================================
// Registry Cache (loaded once at startup)
// ============================================================

let _registry: ComponentRegistry | null = null

function loadRegistry(): ComponentRegistry {
  if (_registry) return _registry
  const raw = readFileSync(REGISTRY_PATH, 'utf-8')
  _registry = JSON.parse(raw) as ComponentRegistry
  return _registry
}

// ============================================================
// Live tags-all.ts reader
// Parses the TypeScript file with regex — no TS compilation needed
// ============================================================

function readTagsAll(): string[] {
  try {
    const content = readFileSync(TAGS_ALL_PATH, 'utf-8')
    const matches = content.match(/"([^"]+)"/g)
    return matches ? matches.map(m => m.replace(/"/g, '')) : []
  } catch {
    // tags-all.ts not readable — fall back to registry only
    return []
  }
}

// ============================================================
// Main export: getComponents()
// ============================================================

export interface GetComponentsResult {
  totalComponents: number
  pageType: string
  source: string
  newComponentsDetected: string[]
  pageStructureRules: ComponentRegistry['pageStructureRules']
  nestingRules: Record<string, string[]>
  components: Array<{
    tag: string
    category: ComponentCategory
    description: string
    pageLevel?: boolean
    maxOccurrences?: number
    allowedChildren?: string[]
  }>
}

export function getComponents(pageType?: string): GetComponentsResult {
  const registry = loadRegistry()
  const liveTags = readTagsAll()

  // Detect any new components in tags-all.ts not yet in the registry
  const registryTags = new Set(registry.components.map(c => c.tag))
  const newComponentsDetected = liveTags.filter(tag => !registryTags.has(tag))

  // Start with all registry components, add any newly detected ones
  let components: ComponentMetadata[] = [...registry.components]
  for (const tag of newComponentsDetected) {
    components.push({
      tag,
      category: 'utility',
      description: `New component detected in tags-all.ts — not yet in registry`,
    })
  }

  // Apply page type filter if requested
  const effectivePageType = pageType ?? 'all'
  if (effectivePageType !== 'all') {
    const allowed = PAGE_TYPE_FILTERS[effectivePageType]
    if (allowed) {
      components = components.filter(c => allowed.includes(c.tag))
    }
  }

  // Build nesting rules subset for the filtered component set
  const filteredTags = new Set(components.map(c => c.tag))
  const nestingRules: Record<string, string[]> = {}
  for (const [parent, children] of Object.entries(registry.nestingRules)) {
    if (filteredTags.has(parent)) {
      const relevantChildren = children.filter(child => filteredTags.has(child))
      if (relevantChildren.length > 0) {
        nestingRules[parent] = relevantChildren
      }
    }
  }

  return {
    totalComponents: components.length,
    pageType: effectivePageType,
    source: registry.source,
    newComponentsDetected,
    pageStructureRules: registry.pageStructureRules,
    nestingRules,
    components: components.map(c => ({
      tag: c.tag,
      category: c.category,
      description: c.description,
      ...(c.pageLevel ? { pageLevel: c.pageLevel } : {}),
      ...(c.maxOccurrences ? { maxOccurrences: c.maxOccurrences } : {}),
      ...(c.allowedChildren?.length ? { allowedChildren: c.allowedChildren } : {}),
    })),
  }
}
