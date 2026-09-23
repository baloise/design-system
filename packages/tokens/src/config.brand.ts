import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { Config } from 'style-dictionary'
import { BASE_CSS_TRANSFORMS } from './config.base.js'

const basePxFontSize = 16

/**
 * Recursively merges a brand's token tree onto Base's, returning the COMPLETE tree — every
 * token Base defines, with the brand's own node substituted wherever the brand defines a
 * `$value` leaf (keeping that leaf's own `$description`/`$extensions` as authored in the brand
 * file). Unlike a diff, nothing is dropped: the result is self-sufficient and needs no `include`
 * of Base to resolve references. See docs/adr/0030-full-merge-brand-token-css.md.
 */
export function mergeTokenTree(base: Record<string, unknown>, brand: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base }

  for (const key of new Set([...Object.keys(base), ...Object.keys(brand)])) {
    const baseVal = base[key]
    const brandVal = brand[key]

    if (brandVal === undefined) {
      result[key] = baseVal
      continue
    }
    if (typeof brandVal !== 'object' || brandVal === null) {
      result[key] = brandVal
      continue
    }
    if ('$value' in (brandVal as Record<string, unknown>)) {
      // Token leaf — the brand's own node wins outright.
      result[key] = brandVal
    } else {
      // Group node — recurse so every sibling token, changed or not, ends up in the result.
      result[key] = mergeTokenTree((baseVal ?? {}) as Record<string, unknown>, brandVal as Record<string, unknown>)
    }
  }

  return result
}

/**
 * Creates a Style Dictionary config for a brand's token CSS build.
 *
 * Merges the brand token file onto Base (see mergeTokenTree) so the build's source is already
 * the complete, self-sufficient token tree for that brand — no `include` of Base needed. Emits
 * two files: `<brand>.tokens.css` (`:host, :root`, for apps that commit to one brand) and
 * `<brand>.override.css` (`[data-theme]`/`:host([data-theme])`, for scoping a brand to one
 * element — e.g. Storybook's theme switcher). See docs/adr/0030-full-merge-brand-token-css.md.
 *
 * Returns the config and a `cleanup` function that removes the temporary merged-tree file that
 * was written to disk so Style Dictionary can read it as `source`.
 */
export function createBrandConfig(mode: string): { config: Config; cleanup: () => void } {
  // PascalCase brand name → kebab-case (e.g. "OrangeVacations" → "orange-vacations") for CSS
  // output, export paths, and the `data-theme` attribute value.
  const brandSlug = mode.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  const tmpFile = `tokens/.${brandSlug}-full.tmp.json`

  const baseJson = JSON.parse(readFileSync(`tokens/Base.tokens.json`, 'utf8'))
  const brandJson = JSON.parse(readFileSync(`tokens/${mode}.tokens.json`, 'utf8'))
  const mergedTokens = mergeTokenTree(baseJson, brandJson)

  writeFileSync(tmpFile, JSON.stringify(mergedTokens))

  const config: Config = {
    source: [tmpFile],
    platforms: {
      css: {
        transforms: BASE_CSS_TRANSFORMS,
        basePxFontSize,
        buildPath: 'dist/',
        prefix: 'ds',
        files: [
          {
            format: 'ds/css/variables-brand',
            destination: `css/${brandSlug}.tokens.css`,
            options: {
              selector: ':host, :root',
              outputReferences: true,
            },
          },
          {
            format: 'ds/css/variables-brand',
            destination: `css/${brandSlug}.override.css`,
            options: {
              selector: `[data-theme="${brandSlug}"], :host([data-theme="${brandSlug}"])`,
              outputReferences: true,
            },
          },
        ],
      },
    },
  }

  const cleanup = () => {
    try {
      unlinkSync(tmpFile)
    } catch {
      // ignore — file may already be gone
    }
  }

  return { config, cleanup }
}
