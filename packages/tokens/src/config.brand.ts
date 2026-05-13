import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { Config } from 'style-dictionary'

const basePxFontSize = 16

/**
 * Recursively walks both token trees and returns only the tokens whose
 * `$value` differs from the base. Keeps the full hierarchy so Style
 * Dictionary can still resolve references.
 */
function computeTokenDiff(base: Record<string, unknown>, brand: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, brandVal] of Object.entries(brand)) {
    if (typeof brandVal !== 'object' || brandVal === null) continue

    const baseVal = (base?.[key] ?? {}) as Record<string, unknown>

    if ('$value' in (brandVal as Record<string, unknown>)) {
      // Token leaf — only keep it when the value actually changed
      const brandSerialized = JSON.stringify((brandVal as Record<string, unknown>)['$value'])
      const baseSerialized = JSON.stringify((baseVal as Record<string, unknown>)['$value'])
      if (brandSerialized !== baseSerialized) {
        result[key] = brandVal
      }
    } else {
      // Group node — recurse and only include if something inside changed
      const nested = computeTokenDiff(baseVal as Record<string, unknown>, brandVal as Record<string, unknown>)
      if (Object.keys(nested).length > 0) {
        result[key] = nested
      }
    }
  }

  return result
}

/**
 * Creates a Style Dictionary config for a brand override build.
 *
 * Computes the diff between Base and the brand token file so that only
 * genuinely changed tokens end up in the output CSS. Works whether the brand
 * file is a minimal override or a full Figma-mode export with all tokens.
 *
 * Returns the config and a `cleanup` function that removes the temporary diff
 * file that was written to disk so Style Dictionary can mark it as `source`.
 */
export function createBrandConfig(mode: string): { config: Config; cleanup: () => void } {
  const selector = `[data-theme="${mode.toLowerCase()}"]`
  const tmpFile = `tokens/.${mode.toLowerCase()}-diff.tmp.json`

  const baseJson = JSON.parse(readFileSync(`tokens/Base.tokens.json`, 'utf8'))
  const brandJson = JSON.parse(readFileSync(`tokens/${mode}.tokens.json`, 'utf8'))
  const diffTokens = computeTokenDiff(baseJson, brandJson)

  // Write diff to a temp file — Style Dictionary only marks file-based source
  // tokens as isSource:true, which is required for the brand formatter filter.
  writeFileSync(tmpFile, JSON.stringify(diffTokens))

  const config: Config = {
    include: [`tokens/Base.tokens.json`],
    source: [tmpFile],
    platforms: {
      css: {
        transforms: ['name/kebab', 'ds/css/name', 'ds/color/rgba', 'ds/size/round', 'ds/size/rem'],
        basePxFontSize,
        buildPath: 'dist/',
        prefix: 'ds',
        files: [
          {
            format: 'ds/css/variables-brand',
            destination: `css/${mode.toLowerCase()}.tokens.css`,
            options: {
              selector,
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
