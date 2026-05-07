# Task: Multi-Brand Token Support

## Goal

Add multi-brand theming to the token pipeline. `base.tokens.css` stays unchanged and is always loaded. Brand files (`tcs.tokens.css`) contain **only the tokens that differ** and are scoped to a CSS selector (`[data-theme="tcs"]`). Zero extra payload for users who don't use that brand.

## End state

```
Consumer loads:   base.tokens.css          (always)
                  tcs.tokens.css           (opt-in, per brand)

HTML:             <html data-theme="tcs">  (activates brand overrides)
```

### Output file structure

```
packages/tokens/
  tokens/
    Base.tokens.json          ← existing, untouched
    Tcs.tokens.json           ← NEW: only overridden tokens
  src/
    config.base.ts            ← existing, untouched
    config.brand.ts           ← NEW: brand config factory
    formatter.ts              ← add ds/css/variables-brand formatter
    index.ts                  ← updated: run brand builds after base build
  dist/
    css/
      base.tokens.css         ← existing
      tcs.tokens.css          ← NEW
```

---

## Step 1 — Create `packages/tokens/tokens/Tcs.tokens.json`

Create a minimal token override file. Only include the tokens that differ from Base. Use the same JSON structure as `Base.tokens.json`. Example showing a primary color override:

```json
{
  "🌐 Global": {
    "🌈 Color": {
      "Primary": {
        "1": { "$type": "color", "$value": { "colorSpace": "srgb", "alpha": 1, "hex": "#FFECEE" } },
        "2": { "$type": "color", "$value": { "colorSpace": "srgb", "alpha": 1, "hex": "#FFB3BC" } },
        "3": { "$type": "color", "$value": { "colorSpace": "srgb", "alpha": 1, "hex": "#FF6675" } },
        "4": { "$type": "color", "$value": { "colorSpace": "srgb", "alpha": 1, "hex": "#FF1A35" } },
        "5": { "$type": "color", "$value": { "colorSpace": "srgb", "alpha": 1, "hex": "#E2001A" } },
        "6": { "$type": "color", "$value": { "colorSpace": "srgb", "alpha": 1, "hex": "#A80013" } }
      }
    }
  }
}
```

> Real TCS token values need to be filled in by the design team or taken from Figma. The above is a structural placeholder.

---

## Step 2 — Add `ds/css/variables-brand` formatter to `packages/tokens/src/formatter.ts`

Add a new `sd.registerFormat` call inside the existing `registerCustomFormatters` function, **after** the existing `ds/css/variables-responsive` block.

The brand formatter mirrors the responsive formatter logic but:

- Wraps all variables in `options.selector` (e.g. `[data-theme="tcs"]`) instead of `:root`
- Reads `options.selector` so the same formatter works for any brand

```ts
sd.registerFormat({
  name: 'ds/css/variables-brand',
  format: async ({ dictionary, file, options }) => {
    const { outputReferences } = options
    const selector = (options.selector as string) ?? '[data-theme="brand"]'
    const header = await fileHeader({ file })

    // Responsive token slices (same logic as ds/css/variables-responsive)
    const baseTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-mobile'))
    const baseTokens = JSON.parse(JSON.stringify(baseTokensOriginal))
    const deviceBaseTokens = JSON.parse(JSON.stringify(baseTokensOriginal))

    baseTokens.forEach(token => {
      token.name = token.name.replace('-mobile', '')
    })
    deviceBaseTokens.forEach(token => {
      token.name = token.name.replace('-mobile', '-device')
    })

    const baseDictionary = { ...dictionary, allTokens: baseTokens } as Dictionary
    const deviceBaseDictionary = { ...dictionary, allTokens: deviceBaseTokens } as Dictionary

    const tabletTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-tablet'))
    const deviceTabletTokens = JSON.parse(JSON.stringify(tabletTokensOriginal))
    deviceTabletTokens.forEach(token => {
      token.name = token.name.replace('-tablet', '-device')
    })
    const deviceTabletDictionary = { ...dictionary, allTokens: deviceTabletTokens } as Dictionary

    const desktopTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-desktop'))
    const deviceDesktopTokens = JSON.parse(JSON.stringify(desktopTokensOriginal))
    deviceDesktopTokens.forEach(token => {
      token.name = token.name.replace('-desktop', '-device')
    })
    const deviceDesktopDictionary = { ...dictionary, allTokens: deviceDesktopTokens } as Dictionary

    return (
      header +
      `${selector} {\n` +
      formattedVariables({ format: propertyFormatNames.css, dictionary, outputReferences, usesDtcg: true }) +
      '\n\n  /* Base tokens */\n' +
      formattedVariables({
        format: propertyFormatNames.css,
        dictionary: baseDictionary,
        outputReferences,
        usesDtcg: true,
      }) +
      '\n\n  /* Device tokens */\n' +
      formattedVariables({
        format: propertyFormatNames.css,
        dictionary: deviceBaseDictionary,
        outputReferences,
        usesDtcg: true,
      }) +
      '\n}\n\n' +
      '/* Device tokens: Tablet */\n' +
      `\n@media (min-width: 769px) {\n` +
      `${selector} {\n` +
      formattedVariables({
        format: propertyFormatNames.css,
        dictionary: deviceTabletDictionary,
        outputReferences,
        usesDtcg: true,
      }) +
      `\n}\n` +
      `}\n\n` +
      '/* Device tokens: Desktop */\n' +
      `\n@media (min-width: 1024px) {\n` +
      `${selector} {\n` +
      formattedVariables({
        format: propertyFormatNames.css,
        dictionary: deviceDesktopDictionary,
        outputReferences,
        usesDtcg: true,
      }) +
      `\n}\n` +
      `}\n\n`
    )
  },
})
```

---

## Step 3 — Create `packages/tokens/src/config.brand.ts`

New file. Export a factory function that takes a brand mode name and returns a Style Dictionary `Config`.

Key differences from `config.base.ts`:

- `include` (not `source`) for Base — tokens are available for `{reference}` resolution but are **not emitted**
- `source` contains only the brand override file — so only the overridden tokens are written to output
- Uses the new `ds/css/variables-brand` formatter
- Passes `selector` option so the formatter knows which attribute selector to wrap
- **No SCSS / JS / docs platforms** — those are Base-only concerns

```ts
import { Config } from 'style-dictionary'

const basePxFontSize = 16

export function createBrandConfig(mode: string): Config {
  const selector = `[data-theme="${mode.toLowerCase()}"]`
  return {
    include: [`tokens/Base.tokens.json`],
    source: [`tokens/${mode}.tokens.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        transforms: ['ds/css/name', 'ds/color/rgba', 'ds/size/round', 'ds/size/rem'],
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
}
```

---

## Step 4 — Update `packages/tokens/src/index.ts`

Add brand builds after the existing base build. The `brands` array is the single place to register new brands.

```ts
import StyleDictionary from 'style-dictionary'
import { copy, ensureDir, pathExists } from 'fs-extra'
import { join, resolve } from 'path'

import { registerCustomTransformers } from './transformers.js'
import { registerCustomFormatters } from './formatter.js'

registerCustomTransformers(StyleDictionary)
registerCustomFormatters(StyleDictionary)

import ConfigBase from './config.base.js'
import { createBrandConfig } from './config.brand.js'

// Base build
const StyleDictionaryBase = new StyleDictionary(ConfigBase)
StyleDictionaryBase.buildAllPlatforms()

// Brand builds — add new brand names here (must match tokens/<Name>.tokens.json)
const brands = ['Tcs']
for (const brand of brands) {
  const sd = new StyleDictionary(createBrandConfig(brand))
  sd.buildAllPlatforms()
}

// Copy all generated CSS files (base + brands) to core www assets
const projectRoot = process.cwd()
const sourceDir = resolve(projectRoot, 'dist', 'css')
const targetDir = resolve(projectRoot, '..', 'core', 'www', 'assets', 'tokens')

;(async () => {
  await ensureDir(targetDir)
  if (await pathExists(sourceDir)) {
    await copy(sourceDir, targetDir, { overwrite: true })
  } else {
    console.warn(`Tokens CSS directory not found at: ${sourceDir}`)
  }
})()
```

---

## Step 5 — Verify build output

After implementing, run:

```bash
npm run tokens
```

Check that `packages/tokens/dist/css/tcs.tokens.css` is generated and:

- Only contains the tokens defined in `Tcs.tokens.json`
- All variables are wrapped in `[data-theme="tcs"] { ... }`
- Responsive media queries use `[data-theme="tcs"]` not `:root`

---

## Consumer usage

```html
<!-- Always load base tokens -->
<link rel="stylesheet" href="base.tokens.css" />

<!-- Load brand file only for TCS -->
<link rel="stylesheet" href="tcs.tokens.css" />
```

```html
<!-- Activate brand on the whole page -->
<html data-theme="tcs">
  ...
</html>

<!-- Or scoped to one section -->
<section data-theme="tcs">
  <ds-button>TCS styled</ds-button>
</section>
```

---

## Adding a new brand in future

1. Create `packages/tokens/tokens/<Brand>.tokens.json` with only the overriding tokens
2. Add `'<Brand>'` to the `brands` array in `index.ts`
3. Run `npm run tokens`

No other changes needed.
