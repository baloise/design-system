// ============================================================
// File Creator — Phase 6: Angular Output Template (corrected)
// Uses real @baloise/ds-core-angular Bundles instead of fake modules
// ============================================================

import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname, basename, sep } from 'path'
import type { OutputFormat } from '../types/index.js'

// ============================================================
// Security: path validation
// ============================================================

function safePath(relativePath: string): string {
  if (relativePath.startsWith('/') || relativePath.startsWith('\\')) {
    throw new Error('Path must be relative to the workspace root. Absolute paths are not allowed.')
  }
  if (relativePath.includes('..')) {
    throw new Error('Path traversal ("..") is not allowed in file paths.')
  }

  const workspaceRoot = process.cwd()
  const resolved = resolve(workspaceRoot, relativePath)

  // Ensure the resolved path stays within the workspace
  if (!resolved.startsWith(workspaceRoot + sep) && resolved !== workspaceRoot) {
    throw new Error('Path must be within the workspace root.')
  }

  return resolved
}

// ============================================================
// Angular Bundle Mapping
// Source of truth: packages/angular/src/bundles.ts
// ============================================================

const TAG_TO_BUNDLE: Record<string, string> = {
  // Navigation
  'bal-navbar': 'BalNavbarBundle',
  'bal-navbar-brand': 'BalNavbarBundle',
  'bal-navbar-menu': 'BalNavbarBundle',
  'bal-navbar-menu-start': 'BalNavbarBundle',
  'bal-navbar-menu-end': 'BalNavbarBundle',
  // Stage
  'bal-stage': 'BalStageBundle',
  'bal-stage-head': 'BalStageBundle',
  'bal-stage-body': 'BalStageBundle',
  'bal-stage-foot': 'BalStageBundle',
  'bal-stage-image': 'BalStageBundle',
  'bal-stage-back-link': 'BalStageBundle',
  // Layout (BalStack, BalContent, BalLogo, BalShape, BalApp, BalDivider, BalFooter)
  'bal-stack': 'BalLayoutBundle',
  'bal-content': 'BalLayoutBundle',
  'bal-logo': 'BalLayoutBundle',
  'bal-shape': 'BalLayoutBundle',
  'bal-app': 'BalLayoutBundle',
  'bal-divider': 'BalLayoutBundle',
  'bal-footer': 'BalLayoutBundle',
  // Typography (BalHeading, BalText, BalLabel)
  'bal-heading': 'BalTypographyBundle',
  'bal-text': 'BalTypographyBundle',
  'bal-label': 'BalTypographyBundle',
  // Cards
  'bal-card': 'BalCardBundle',
  'bal-card-title': 'BalCardBundle',
  'bal-card-subtitle': 'BalCardBundle',
  'bal-card-content': 'BalCardBundle',
  'bal-card-actions': 'BalCardBundle',
  'bal-card-button': 'BalCardBundle',
  // Buttons
  'bal-button': 'BalButtonBundle',
  'bal-button-group': 'BalButtonBundle',
  // List
  'bal-list': 'BalListBundle',
  'bal-list-item': 'BalListBundle',
  'bal-list-item-title': 'BalListBundle',
  'bal-list-item-subtitle': 'BalListBundle',
  'bal-list-item-icon': 'BalListBundle',
  'bal-list-item-content': 'BalListBundle',
  'bal-list-item-accordion-head': 'BalListBundle',
  'bal-list-item-accordion-body': 'BalListBundle',
  // Accordion
  'bal-accordion': 'BalAccordionBundle',
  'bal-accordion-summary': 'BalAccordionBundle',
  'bal-accordion-details': 'BalAccordionBundle',
  'bal-accordion-trigger': 'BalAccordionBundle',
  // Tabs
  'bal-tabs': 'BalTabsBundle',
  'bal-tab-item': 'BalTabsBundle',
  // Steps
  'bal-steps': 'BalStepsBundle',
  'bal-step-item': 'BalStepsBundle',
  // Modal
  'bal-modal': 'BalModalBundle',
  'bal-modal-header': 'BalModalBundle',
  'bal-modal-body': 'BalModalBundle',
  // Data
  'bal-data': 'BalDataBundle',
  'bal-data-item': 'BalDataBundle',
  'bal-data-label': 'BalDataBundle',
  'bal-data-value': 'BalDataBundle',
  // Hint
  'bal-hint': 'BalHintBundle',
  'bal-hint-title': 'BalHintBundle',
  'bal-hint-text': 'BalHintBundle',
  // Tag
  'bal-tag': 'BalTagBundle',
  'bal-tag-group': 'BalTagBundle',
  // Carousel
  'bal-carousel': 'BalCarouselBundle',
  'bal-carousel-item': 'BalCarouselBundle',
  // Segment
  'bal-segment': 'BalSegmentBundle',
  'bal-segment-item': 'BalSegmentBundle',
  // Form (BalFormBundle covers ALL form components: inputs, field, grid, buttons, controls)
  'bal-form': 'BalFormBundle',
  'bal-form-grid': 'BalFormBundle',
  'bal-form-col': 'BalFormBundle',
  'bal-field': 'BalFormBundle',
  'bal-field-label': 'BalFormBundle',
  'bal-field-control': 'BalFormBundle',
  'bal-field-hint': 'BalFormBundle',
  'bal-field-message': 'BalFormBundle',
  'bal-input': 'BalFormBundle',
  'bal-input-date': 'BalFormBundle',
  'bal-input-slider': 'BalFormBundle',
  'bal-input-stepper': 'BalFormBundle',
  'bal-input-group': 'BalFormBundle',
  'bal-textarea': 'BalFormBundle',
  'bal-select': 'BalFormBundle',
  'bal-select-option': 'BalFormBundle',
  'bal-checkbox': 'BalFormBundle',
  'bal-checkbox-group': 'BalFormBundle',
  'bal-check': 'BalFormBundle',
  'bal-switch': 'BalFormBundle',
  'bal-radio': 'BalFormBundle',
  'bal-radio-group': 'BalFormBundle',
  'bal-radio-icon': 'BalFormBundle',
  'bal-number-input': 'BalFormBundle',
  'bal-time-input': 'BalFormBundle',
  'bal-file-upload': 'BalFormBundle',
  'bal-dropdown': 'BalFormBundle',
}

/** Components not in any bundle — imported individually */
const INDIVIDUAL_COMPONENTS: Record<string, string> = {
  'bal-notification': 'BalNotification',
  'bal-notices': 'BalNotices',
  'bal-badge': 'BalBadge',
  'bal-icon': 'BalIcon',
  'bal-spinner': 'BalSpinner',
  'bal-progress-bar': 'BalProgressBar',
  'bal-pagination': 'BalPagination',
  'bal-tooltip': 'BalTooltip',
  'bal-close': 'BalClose',
  'bal-popover': 'BalPopover',
  'bal-popover-content': 'BalPopoverContent',
  'bal-popup': 'BalPopup',
  'bal-table': 'BalTable',
  'bal-snackbar': 'BalSnackbar',
  'bal-toast': 'BalToast',
  'bal-sheet': 'BalSheet',
}

/** Preferred bundle order for clean, readable output */
const BUNDLE_ORDER = [
  'BalNavbarBundle',
  'BalStageBundle',
  'BalLayoutBundle',
  'BalTypographyBundle',
  'BalCardBundle',
  'BalButtonBundle',
  'BalListBundle',
  'BalAccordionBundle',
  'BalTabsBundle',
  'BalStepsBundle',
  'BalModalBundle',
  'BalDataBundle',
  'BalHintBundle',
  'BalTagBundle',
  'BalCarouselBundle',
  'BalSegmentBundle',
  'BalFormBundle',
]

interface AngularImports {
  bundles: string[]
  individuals: string[]
}

function extractAngularImports(htmlContent: string): AngularImports {
  const tagPattern = /<(bal-[a-z][a-z0-9-]*)/g
  const usedTags = new Set<string>()
  let match: RegExpExecArray | null

  while ((match = tagPattern.exec(htmlContent)) !== null) usedTags.add(match[1])

  const bundles = new Set<string>()
  const individuals = new Set<string>()

  for (const tag of usedTags) {
    if (TAG_TO_BUNDLE[tag]) {
      bundles.add(TAG_TO_BUNDLE[tag])
      continue
    }
    if (INDIVIDUAL_COMPONENTS[tag]) {
      individuals.add(INDIVIDUAL_COMPONENTS[tag])
      continue
    }
    // Prefix fallback: bal-nav-link → try bal-nav
    const parts = tag.split('-')
    for (let len = parts.length - 1; len >= 2; len--) {
      const prefix = parts.slice(0, len).join('-')
      if (TAG_TO_BUNDLE[prefix]) {
        bundles.add(TAG_TO_BUNDLE[prefix])
        break
      }
    }
  }

  const sortedBundles = BUNDLE_ORDER.filter(b => bundles.has(b))
  const remaining = [...bundles].filter(b => !BUNDLE_ORDER.includes(b)).sort()
  return { bundles: [...sortedBundles, ...remaining], individuals: [...individuals].sort() }
}

// Convert kebab-case to PascalCase: login-page → LoginPage
function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function generateAngularTs(componentName: string, htmlContent: string): string {
  const { bundles, individuals } = extractAngularImports(htmlContent)
  const allImports = [...bundles, ...individuals]

  const importLine =
    allImports.length > 0 ? `import {\n  ${allImports.join(',\n  ')},\n} from '@baloise/ds-core-angular'\n` : ''

  const spreadBundles = bundles.map(b => `    ...${b},`).join('\n')
  const individualLines = individuals.map(i => `    ${i},`).join('\n')
  const importsBody = [spreadBundles, individualLines].filter(Boolean).join('\n')
  const importsArray = importsBody ? `  imports: [\n${importsBody}\n  ],` : '  imports: [],'

  return `import { Component } from '@angular/core'
${importLine}
@Component({
  selector: 'app-${componentName}',
  standalone: true,
${importsArray}
  templateUrl: './${componentName}.component.html',
})
export class ${toPascalCase(componentName)}Component {}
`
}

// ============================================================
// Main export: createFile()
// ============================================================

export interface CreateFileResult {
  created: string[]
  format: OutputFormat
  path: string
  angularModulesDetected?: string[]
}

export function createFile(relativePath: string, content: string, format: OutputFormat): CreateFileResult {
  const created: string[] = []
  let angularModulesDetected: string[] | undefined

  if (format === 'angular') {
    // Normalise path to always end in .component.html
    const htmlPath = relativePath.endsWith('.component.html')
      ? relativePath
      : relativePath.replace(/\.[^./\\]+$/, '.component.html')

    const tsPath = htmlPath.replace(/\.component\.html$/, '.component.ts')
    const componentName = basename(htmlPath, '.component.html')

    // Write HTML template
    const resolvedHtml = safePath(htmlPath)
    mkdirSync(dirname(resolvedHtml), { recursive: true })
    writeFileSync(resolvedHtml, content, 'utf-8')
    created.push(htmlPath)

    // Generate and write TypeScript component
    const { bundles, individuals } = extractAngularImports(content)
    angularModulesDetected = [...bundles, ...individuals]
    const tsContent = generateAngularTs(componentName, content)
    const resolvedTs = safePath(tsPath)
    writeFileSync(resolvedTs, tsContent, 'utf-8')
    created.push(tsPath)
  } else {
    // HTML or JSON: single file
    const resolved = safePath(relativePath)
    mkdirSync(dirname(resolved), { recursive: true })
    writeFileSync(resolved, content, 'utf-8')
    created.push(relativePath)
  }

  return {
    created,
    format,
    path: relativePath,
    ...(angularModulesDetected ? { angularModulesDetected } : {}),
  }
}
