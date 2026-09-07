/**
 * One-time migration: prefix design-system component root and structural
 * sub-element CSS classes with `ds-` so CSS-only mode no longer collides
 * with generic class names used by a hosting CMS (see docs/adr/0027-ds-prefix-component-classes.md,
 * issue #2048).
 *
 * Rewrites:
 *  - packages/core/src/components/**\/*.style.scss   (selectors, incl. quoted $css-selector strings)
 *  - apps/storybook/src/**\/*.stories.ts              (hardcoded HTML in class="..." attributes)
 *  - packages/core/src/components/**\/test/*.style.html (visual fixtures, class="..." attributes)
 *
 * Modifier classes (is-*, has-*), utility classes (bg-*, p-*, ... from the
 * packages/css UnoCSS preset), CSS custom properties, and classes that are
 * already `ds-`-prefixed are left untouched.
 *
 * Run with: node scripts/rename-component-classes.mjs [--dry-run]
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '..')
const dryRun = process.argv.includes('--dry-run')

/**
 * Curated old -> new class-name map, built from every root and
 * structural sub-element selector declared across
 * packages/core/src/components/**\/*.style.scss.
 *
 * Excluded by design: modifier classes (is-*, has-*, align-*, gap-*, p-*,
 * px-*, py-*, text-*, as-*, fit-content and responsive breakpoint variants
 * like tablet\:is-*), already-`ds-`-prefixed classes, tag-selector
 * homonyms such as `.ds-button`/`.ds-checkbox` found inside table.style.scss
 * (they already refer to the final prefixed name), and unrelated
 * third-party classes such as `.token` in tag's `:not(.token)` guard.
 */
export const CLASS_MAP = {
  'accordion': 'ds-accordion',
  'accordion-label': 'ds-accordion-label',
  'badge': 'ds-badge',
  'button': 'ds-button',
  'buttons': 'ds-buttons',
  'card': 'ds-card',
  'card-content': 'ds-card-content',
  'card-actions': 'ds-card-actions',
  'card-header': 'ds-card-header',
  'image-teaser': 'ds-image-teaser',
  'image-link': 'ds-image-link',
  'checkbox': 'ds-checkbox',
  'checkbox-group': 'ds-checkbox-group',
  'close': 'ds-close',
  'container': 'ds-container',
  'content': 'ds-content',
  'control': 'ds-control',
  'divider': 'ds-divider',
  'field': 'ds-field',
  'form': 'ds-form',
  'form-col': 'ds-form-col',
  'grid': 'ds-grid',
  'col': 'ds-col',
  'heading': 'ds-heading',
  'title': 'ds-title',
  'subtitle': 'ds-subtitle',
  'help': 'ds-help',
  'input': 'ds-input',
  'item': 'ds-item',
  'item-content': 'ds-item-content',
  'item-subtitle': 'ds-item-subtitle',
  'item-text': 'ds-item-text',
  'item-title': 'ds-item-title',
  'label': 'ds-label',
  'link': 'ds-link',
  'list': 'ds-list',
  'notification': 'ds-notification',
  'radio': 'ds-radio',
  'radio-group': 'ds-radio-group',
  'segment': 'ds-segment',
  'select': 'ds-select',
  'stack': 'ds-stack',
  'stack-content': 'ds-stack-content',
  'table': 'ds-table',
  'tag': 'ds-tag',
  'tags': 'ds-tags',
  'text': 'ds-text',
  'textarea': 'ds-textarea',
  'time-input': 'ds-time-input',
  'toggle': 'ds-toggle',
}

// Longest-first so e.g. `card-header` is matched before `card`.
const orderedKeys = Object.keys(CLASS_MAP).sort((a, b) => b.length - a.length)

function replaceScssSelectors(content) {
  let out = content
  for (const key of orderedKeys) {
    // Negative lookahead excludes SCSS module member access like `form.field()`
    // and `textarea.container('input', '.control')`, which share the `.field`
    // substring with the CSS class selector `.field`: a member call is always
    // immediately followed by `(`, which is never valid directly after a CSS
    // class selector (pseudo-classes require a leading `:`). Tag+class compound
    // selectors like `a.link` or `ul.list` are correctly left matchable since
    // nothing about their left side signals a call.
    const re = new RegExp(`\\.${key}(?![A-Za-z0-9_-])(?!\\()`, 'g')
    out = out.replaceAll(re, `.${CLASS_MAP[key]}`)
  }
  return out
}

function replaceHtmlClassAttributes(content) {
  return content.replace(/class=(["'])([^"']*)\1/g, (match, quote, classList) => {
    const rewritten = classList
      .split(/(\s+)/)
      .map(token => (/\s+/.test(token) ? token : (CLASS_MAP[token] ?? token)))
      .join('')
    return `class=${quote}${rewritten}${quote}`
  })
}

const targets = [
  {
    pattern: 'packages/core/src/components/**/*.style.scss',
    // SCSS selectors, plus any `class="..."` HTML usage examples in doc comments.
    transform: content => replaceHtmlClassAttributes(replaceScssSelectors(content)),
  },
  {
    // Shadow-DOM host and shared mixin styles reference the same class names
    // — e.g. a host component styling `::slotted(.button)`, or card-header
    // and typography partials rendering `.title`/`.subtitle`/`.tag` for
    // slotted light-DOM content — so they must stay in sync with the map too.
    pattern: 'packages/core/src/{components/**/*.host.scss,components/**/*.mixin.scss,typography.scss}',
    transform: content => replaceHtmlClassAttributes(replaceScssSelectors(content)),
  },
  {
    pattern: 'apps/storybook/src/**/*.stories.ts',
    transform: replaceHtmlClassAttributes,
  },
  {
    // Every hand-authored HTML fixture under packages/core/src — CSS-only
    // *.style.html, web-component *.visual.html, Cypress *.cy.html, the
    // playground, and any other one-off page — can reference these classes
    // (most commonly via the shared `<main class="container">` wrapper).
    // packages/core/www is excluded: it's a gitignored build output.
    pattern: 'packages/core/src/**/*.html',
    transform: replaceHtmlClassAttributes,
  },
]

let changedFiles = 0
for (const { pattern, transform } of targets) {
  const files = globSync(pattern, { cwd: workspaceRoot, absolute: true })
  for (const file of files) {
    const original = readFileSync(file, 'utf-8')
    const updated = transform(original)
    if (updated !== original) {
      changedFiles++
      console.log(`${dryRun ? '[dry-run] ' : ''}updated ${file.replace(workspaceRoot + '/', '')}`)
      if (!dryRun) writeFileSync(file, updated)
    }
  }
}

console.log(`\n${changedFiles} file(s) ${dryRun ? 'would be' : ''} updated.`)
