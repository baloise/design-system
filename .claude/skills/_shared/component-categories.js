/**
 * Shared across the ds-* component skills. The seven usage-category folders components are
 * organized under — see packages/core/CONTEXT.md and apps/storybook/CONTEXT.md for the full
 * taxonomy, mapping, and alphabetical-ordering rule.
 */

const path = require('path')
const fs = require('fs')

const CATEGORIES = ['actions', 'forms', 'indicators', 'media', 'navigation', 'overlays', 'structure']

/**
 * Resolve a component's directory by scanning category folders — components live at
 * packages/core/src/components/<category>/<name>/, and the category isn't known up front.
 * Returns the absolute path, or undefined if no component with that name exists.
 */
function resolveComponentPath(repoRoot, componentName) {
  const componentsRoot = path.join(repoRoot, 'packages/core/src/components')
  for (const category of fs.readdirSync(componentsRoot, { withFileTypes: true })) {
    if (!category.isDirectory()) continue
    const candidate = path.join(componentsRoot, category.name, componentName)
    if (fs.existsSync(candidate)) return candidate
  }
  return undefined
}

module.exports = { CATEGORIES, resolveComponentPath }
