#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const COMPONENT_TOKENS_KEY = '🧩 Component'
const TOKENS_JSON_PATH = 'packages/tokens/tokens/Base.tokens.json'

// Closed vocabulary for interaction/visual states. A sibling group is treated as a
// "state group" once at least half its children match this set — any child outside
// the set is then flagged as a likely typo (e.g. "Hoverr", "Actve").
const STATE_WORDS = new Set(['Base', 'Hover', 'Active', 'Disabled', 'Focus', 'Selected'])

// Leaf keys that, when their value resolves through the Alias "🔤 Text" typography
// category, should live under a "Font" grouping key per STYLE_GUIDE.md.
const TYPOGRAPHY_LEAF_KEYS = new Set(['Family', 'Weight', 'LineHeight', 'Size'])

function findDSRoot() {
  let current = process.cwd()
  while (current !== '/') {
    if (fs.existsSync(path.join(current, 'packages/tokens/tokens/Base.tokens.json'))) {
      return current
    }
    current = path.dirname(current)
  }
  throw new Error("Could not find design system root. Make sure you're in the DS repo.")
}

function toPascalCase(kebab) {
  return kebab
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
}

// Mirrors Style Dictionary's kebab-case transform for PascalCase JSON keys:
// "LineHeight" -> "line-height", "PrimaryHover" -> "primary-hover", "LG" -> "lg".
function pascalToKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

// A key is well-formed PascalCase (or a bare acronym/number) if it starts with an
// uppercase letter or digit and contains no underscores or embedded lowercase-first words.
function isPascalCase(key) {
  return /^[A-Z0-9][A-Za-z0-9]*$/.test(key)
}

function loadTokens(dsRoot) {
  const tokensFile = path.join(dsRoot, TOKENS_JSON_PATH)
  const raw = fs.readFileSync(tokensFile, 'utf-8')
  return { tokensFile, data: JSON.parse(raw) }
}

function findComponentNode(data, componentKebab) {
  const pascalName = toPascalCase(componentKebab)
  const componentLayer = data[COMPONENT_TOKENS_KEY] || {}

  if (componentLayer[pascalName]) {
    return { key: pascalName, node: componentLayer[pascalName] }
  }

  // Case-insensitive fallback so a near-miss produces a helpful suggestion
  // instead of a bare "not found".
  const match = Object.keys(componentLayer).find(k => k.toLowerCase() === pascalName.toLowerCase())
  if (match) {
    return { key: match, node: componentLayer[match], caseMismatch: pascalName }
  }

  return null
}

function collectLeaves(node, jsonPath, out) {
  if (!node || typeof node !== 'object') return

  if ('$value' in node) {
    out.push({ jsonPath: [...jsonPath], value: node.$value, type: node.$type })
    return
  }

  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$')) continue
    collectLeaves(val, [...jsonPath, key], out)
  }
}

function deriveCssVar(componentKebab, jsonPath) {
  const segments = jsonPath.map(pascalToKebab)
  return `--ds-${componentKebab}-${segments.join('-')}`
}

// ---------------------------------------------------------------------------
// Rule checks
// ---------------------------------------------------------------------------

// Per packages/tokens/CONTEXT.md ("Naming Convention" → "Color order"), variant
// must come before category: --ds-button-primary-color-text, not
// --ds-button-color-primary-text. Every component's Color tree is currently
// structured category-first (Color > Variant > ...), which is the thing this
// migration is fixing component by component — so we only need to check the
// top-level shape (jsonPath[0] === 'Color') rather than search every depth.
// Once fixed, jsonPath[0] becomes the variant and this no longer matches,
// so re-running the check is idempotent and won't ping-pong the order back.
function checkColorVariantOrder(componentKebab, leaves) {
  const violations = []

  for (const leaf of leaves) {
    if (leaf.jsonPath[0] !== 'Color' || leaf.jsonPath.length < 2) continue

    const variant = leaf.jsonPath[1]
    const proposedJsonPath = [variant, 'Color', ...leaf.jsonPath.slice(2)]
    const currentCssVar = deriveCssVar(componentKebab, leaf.jsonPath)
    const proposedCssVar = deriveCssVar(componentKebab, proposedJsonPath)

    violations.push({
      type: 'color-variant-order',
      jsonPath: leaf.jsonPath,
      proposedJsonPath,
      currentCssVar,
      proposedCssVar,
      message: `Color category precedes variant — naming convention (packages/tokens/CONTEXT.md "Color order") requires variant before category`,
    })
  }

  return violations
}

function checkFontPrefix(componentKebab, leaves) {
  const violations = []

  for (const leaf of leaves) {
    // The typography marker may be the leaf itself (Family, Weight, LineHeight)
    // or an ancestor grouping key (Size.SM, Size.Base, ...) — search the whole path.
    const markerIndex = leaf.jsonPath.findIndex(seg => TYPOGRAPHY_LEAF_KEYS.has(seg))
    if (markerIndex === -1) continue
    if (leaf.jsonPath.includes('Font')) continue

    // Strong signal this is a typography token: its value resolves through the
    // Alias "🔤 Text" category (Family/Weight/LineHeight/Size all live there).
    const resolvesThroughTypographyAlias =
      typeof leaf.value === 'string' && /🔤 Text\.(Family|Weight|LineHeight|Size)/.test(leaf.value)
    if (!resolvesThroughTypographyAlias) continue

    const currentCssVar = deriveCssVar(componentKebab, leaf.jsonPath)

    let proposedJsonPath
    if (markerIndex > 0 && leaf.jsonPath[markerIndex - 1] === 'Text') {
      // "Text" wrapper exists only to hold typography leaves here — rename it to "Font"
      // rather than nesting a second level (avoids Text.Font.Family).
      proposedJsonPath = [...leaf.jsonPath]
      proposedJsonPath[markerIndex - 1] = 'Font'
    } else {
      // Marker sits directly under the component (or a state/variant group) — nest it
      // under a new "Font" group.
      proposedJsonPath = [...leaf.jsonPath.slice(0, markerIndex), 'Font', ...leaf.jsonPath.slice(markerIndex)]
    }

    const proposedCssVar = deriveCssVar(componentKebab, proposedJsonPath)

    violations.push({
      type: 'font-prefix-drift',
      jsonPath: leaf.jsonPath,
      proposedJsonPath,
      currentCssVar,
      proposedCssVar,
      message: `Typography token missing "font-" prefix (STYLE_GUIDE.md convention)`,
    })
  }

  return violations
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 0; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[a.length][b.length]
}

function nearestStateWord(key) {
  let best = null
  let bestDist = Infinity
  for (const word of STATE_WORDS) {
    const dist = levenshtein(key.toLowerCase(), word.toLowerCase())
    if (dist < bestDist) {
      bestDist = dist
      best = word
    }
  }
  return { word: best, dist: bestDist }
}

function checkStateVocabulary(componentKebab, node, jsonPath, violations = []) {
  if (!node || typeof node !== 'object' || '$value' in node) return violations

  const childKeys = Object.keys(node).filter(k => !k.startsWith('$'))
  const stateLikeCount = childKeys.filter(k => STATE_WORDS.has(k)).length

  if (childKeys.length >= 2 && stateLikeCount >= Math.ceil(childKeys.length / 2)) {
    for (const key of childKeys) {
      if (STATE_WORDS.has(key)) continue
      const { word, dist } = nearestStateWord(key)
      // Only flag close misses (likely typos), not deliberately different words.
      if (dist > 0 && dist <= 2) {
        const currentPath = [...jsonPath, key]
        const proposedJsonPath = [...jsonPath, word]
        violations.push({
          type: 'state-typo',
          jsonPath: currentPath,
          proposedJsonPath,
          currentCssVar: deriveCssVar(componentKebab, currentPath),
          proposedCssVar: deriveCssVar(componentKebab, proposedJsonPath),
          message: `"${key}" looks like a misspelled state — sibling keys (${childKeys.filter(k => STATE_WORDS.has(k)).join(', ')}) suggest "${word}"`,
        })
      }
    }
  }

  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$')) continue
    checkStateVocabulary(componentKebab, val, [...jsonPath, key], violations)
  }

  return violations
}

function checkKeyCasing(componentKebab, node, jsonPath, violations = []) {
  if (!node || typeof node !== 'object' || '$value' in node) return violations

  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$')) continue

    if (!isPascalCase(key)) {
      const fixedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/[_-](\w)/g, (_, c) => c.toUpperCase())
      const currentPath = [...jsonPath, key]
      const proposedJsonPath = [...jsonPath, fixedKey]
      violations.push({
        type: 'key-casing',
        jsonPath: currentPath,
        proposedJsonPath,
        currentCssVar: deriveCssVar(componentKebab, currentPath),
        proposedCssVar: deriveCssVar(componentKebab, proposedJsonPath),
        message: `JSON key "${key}" is not PascalCase — the kebab-case CSS name derived from it may not match Style Dictionary's transform`,
      })
    }

    checkKeyCasing(componentKebab, val, [...jsonPath, key], violations)
  }

  return violations
}

// ---------------------------------------------------------------------------
// Check phase
// ---------------------------------------------------------------------------

function checkComponent(componentName) {
  const dsRoot = findDSRoot()
  const { data } = loadTokens(dsRoot)
  const found = findComponentNode(data, componentName)

  if (!found) {
    throw new Error(
      `No "${toPascalCase(componentName)}" entry under "${COMPONENT_TOKENS_KEY}" in ${TOKENS_JSON_PATH}. ` +
        `This component may not have any component-layer tokens.`,
    )
  }

  const leaves = []
  collectLeaves(found.node, [], leaves)

  const violations = [
    ...checkColorVariantOrder(componentName, leaves),
    ...checkFontPrefix(componentName, leaves),
    ...checkStateVocabulary(componentName, found.node, []),
    ...checkKeyCasing(componentName, found.node, []),
  ]

  return { dsRoot, componentName, componentKey: found.key, caseMismatch: found.caseMismatch, leaves, violations }
}

// ---------------------------------------------------------------------------
// Apply phase
// ---------------------------------------------------------------------------

function setAtPath(root, jsonPath, value) {
  let cursor = root
  for (let i = 0; i < jsonPath.length - 1; i++) {
    if (!(jsonPath[i] in cursor)) cursor[jsonPath[i]] = {}
    cursor = cursor[jsonPath[i]]
  }
  cursor[jsonPath[jsonPath.length - 1]] = value
}

function getAtPath(root, jsonPath) {
  let cursor = root
  for (const key of jsonPath) {
    if (cursor == null) return undefined
    cursor = cursor[key]
  }
  return cursor
}

function deleteAtPath(root, jsonPath) {
  let cursor = root
  for (let i = 0; i < jsonPath.length - 1; i++) {
    if (!(jsonPath[i] in cursor)) return
    cursor = cursor[jsonPath[i]]
  }
  delete cursor[jsonPath[jsonPath.length - 1]]

  // Prune now-empty ancestor objects (walking back up).
  const ancestors = []
  let c = root
  for (const key of jsonPath.slice(0, -1)) {
    ancestors.push({ parent: c, key })
    c = c[key]
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const { parent, key } = ancestors[i]
    if (parent[key] && typeof parent[key] === 'object' && Object.keys(parent[key]).length === 0) {
      delete parent[key]
    }
  }
}

function applyFixes(componentName, selectedViolations) {
  const dsRoot = findDSRoot()
  const { tokensFile, data } = loadTokens(dsRoot)
  const found = findComponentNode(data, componentName)
  if (!found) throw new Error(`No "${toPascalCase(componentName)}" entry under "${COMPONENT_TOKENS_KEY}".`)

  const renameMap = [] // { from, to }

  for (const violation of selectedViolations) {
    const fullFrom = [found.key, ...violation.jsonPath]
    const fullTo = [found.key, ...violation.proposedJsonPath]

    const value = getAtPath(data[COMPONENT_TOKENS_KEY], fullFrom)
    if (value === undefined) continue

    deleteAtPath(data[COMPONENT_TOKENS_KEY], fullFrom)
    setAtPath(data[COMPONENT_TOKENS_KEY], fullTo, value)

    renameMap.push({ from: violation.currentCssVar, to: violation.proposedCssVar })
  }

  fs.writeFileSync(tokensFile, JSON.stringify(data, null, 2) + '\n', 'utf-8')

  // Update every var(--ds-old-name) reference across core + css SCSS sources.
  const { globSync } = require('glob')
  const scssFiles = [
    ...globSync(`${dsRoot}/packages/core/src/**/*.scss`),
    ...globSync(`${dsRoot}/packages/css/src/**/*.scss`),
  ]

  // For color-variant-order fixes, some components build the variant segment
  // dynamically via SCSS interpolation inside an @each loop instead of writing
  // the fully-resolved var() name (e.g. `--ds-badge-color-#{$color}-text` in a
  // `@each $color in (...)` block). The literal renameMap below can't match
  // that — it never contains a literal "--ds-badge-color-danger-text" string —
  // so it would be silently left pointing at a token that no longer exists.
  // Handle it structurally instead: swap the literal "color" segment and the
  // interpolation that immediately follows it, mirroring the JSON path swap.
  const interpPattern = selectedViolations.some(v => v.type === 'color-variant-order')
    ? new RegExp(`(--ds-${escapeRegExp(componentName)}-)color-(#\\{[^}]+\\})-`, 'g')
    : null

  const updatedFiles = []
  for (const file of scssFiles) {
    let content = fs.readFileSync(file, 'utf-8')
    let changed = false
    for (const { from, to } of renameMap) {
      const pattern = new RegExp(escapeRegExp(from) + '\\b', 'g')
      if (pattern.test(content)) {
        content = content.replace(pattern, to)
        changed = true
      }
    }
    if (interpPattern && interpPattern.test(content)) {
      interpPattern.lastIndex = 0
      content = content.replace(interpPattern, '$1$2-color-')
      changed = true
    }
    if (changed) {
      fs.writeFileSync(file, content, 'utf-8')
      updatedFiles.push(path.relative(dsRoot, file))
    }
  }

  execSync('pnpm tokens', { cwd: dsRoot, stdio: 'inherit' })

  return { renameMap, updatedFiles }
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

module.exports = {
  checkComponent,
  applyFixes,
  deriveCssVar,
  pascalToKebab,
  toPascalCase,
}
