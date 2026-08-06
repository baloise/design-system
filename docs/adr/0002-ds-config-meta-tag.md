# 2. Allow bootstrapping `DsConfig` from an HTML `<meta>` tag

Package: `packages/core`

Date: 2026-07-20

## Status

Proposed

## Context

Today `packages/core` bootstraps `DesignSystem.config` in
`config/initialize.ts` → `setupDsConfig()`, which merges, in order:

1. `defaultConfig` (`config.default.ts`)
2. `configFromLocalStorage(win)` — currently only the `animated` flag,
   keyed by `ds-animated` in `localStorage`
3. the `userConfig` object passed by the consuming app to
   `initializeDesignSystem(userConfig)` / `setupDsConfig(userConfig)`

This requires a consuming app to run JavaScript to configure the design
system (brand, region, language, etc.). Swiss Post's design system supports
an additional, JS-free bootstrapping path: a single `<meta>` tag in `<head>`
whose `data-*` attributes seed the config before any framework code runs,
e.g.:

```html
<meta name="design-system-settings" data-post-icon-base="/assets/icons" />
```

(Icons are out of scope for this proposal — see below.)

This is useful for:

- CMS-driven pages / server-rendered templates where editors can add a
  `<meta>` tag but can't easily inject a JS config call.
- Setting config as early as possible (before hydration), avoiding a flash
  of default-config content (e.g. wrong brand/region/icon path).
- Environments that assemble pages from fragments and want one canonical,
  markup-only place to declare DS config, independent of which framework
  wrapper (React/Vue/Vanilla) boots the DS.

We want the equivalent for the Baloise/Helvetia DS: a `<meta
name="design-system-config">` tag whose `data-*` attributes map onto a
subset of `DsConfig`.

## Decision

### 1. New file: `config.meta.ts`

Parallel to the existing `configFromLocalStorage`, add:

```ts
// packages/core/src/global/config/config.meta.ts
import type { DsConfig } from './config.types'
import { DS_CONFIG_META_NAME, DS_CONFIG_META_ATTRIBUTE_MAP } from './config.const'

export const configFromMetaTag = (win: Window): Partial<DsConfig> => {
  try {
    const doc = win.document
    if (!doc) return {}

    const meta = doc.querySelector<HTMLMetaElement>(`meta[name="${DS_CONFIG_META_NAME}"]`)
    if (!meta) return {}

    const result: Partial<DsConfig> = {}

    for (const [dataKey, apply] of Object.entries(DS_CONFIG_META_ATTRIBUTE_MAP)) {
      const raw = meta.dataset[dataKey]
      if (raw !== undefined) {
        apply(result, raw)
      }
    }

    return result
  } catch {
    return {}
  }
}
```

Only an **explicit allowlist** of `data-*` attributes is read (see below) —
we never spread `meta.dataset` wholesale into the config. This keeps the
attack surface small (a CMS editor or injected markup can only ever set
known, typed fields) and keeps `DsConfigState` shape guarantees intact.

### 2. Attribute map & constant: `config.const.ts`

```ts
export const DS_CONFIG_META_NAME = 'design-system-config'

// key = HTMLElement.dataset key (camelCase form of data-*)
// value = parses the raw string attribute and assigns it onto the partial config
export const DS_CONFIG_META_ATTRIBUTE_MAP: Record<string, (cfg: Partial<DsConfig>, raw: string) => void> = {
  brand: (cfg, raw) => (cfg.brand = raw as DsBrand),
  region: (cfg, raw) => (cfg.region = raw as DsRegion),
  language: (cfg, raw) => (cfg.language = raw as DsLanguage),
  fallbackLanguage: (cfg, raw) => (cfg.fallbackLanguage = raw as DsLanguage),
  allowedLanguages: (cfg, raw) => (cfg.allowedLanguages = raw.split(',').map(s => s.trim()) as DsLanguage[]),
  animated: (cfg, raw) => (cfg.animated = raw !== 'false'),
}
```

`httpFormSubmit`, `legalLinks`, `legalText`, and `socialLinks` are
explicitly **out of scope**, alongside icons:

- Icons: `icons: DsIcons` is a full name→URL map (from
  `@baloise/ds-assets`) with no base-path concept today, and there's no
  `data-icon-base`-equivalent field being added here.
- `httpFormSubmit`: a behavioral/functional toggle (native vs. JS form
  submission) rather than a presentational default — left as JS-only
  config so it can't be silently flipped by markup.
- `legalLinks` / `legalText` / `socialLinks`: nested, per-region/per-locale
  structured data — not something a flat `data-*` attribute can represent
  reasonably.

Any of these being wanted via meta tag later needs its own design and its
own decision.

Only primitive, flat fields are supported through meta tags. Structured
config (`legalLinks`, `legalText`, `socialLinks`, the full `icons` map,
platform hooks like `_jmp`/`_raf`) stays JS-only — a `<meta>` tag is not a
reasonable place to author nested/localized data structures.

### 3. Wire it into `setupDsConfig`

`config/initialize.ts`:

```ts
export const setupDsConfig = (userConfig: DsConfig = {}, win = {} as any) => {
  if (Object.keys(win).length === 0 && dsBrowser.hasWindow) {
    win = window as any
  }

  win.DesignSystem = win.DesignSystem || {}

  config.reset({
    ...configFromMetaTag(win),
    ...configFromLocalStorage(win),
    ...userConfig,
    icons: {
      ...userConfig.icons,
    },
  })

  win.DesignSystem.config = config
}
```

**Precedence (lowest → highest): `defaultConfig` → `<meta>` tag →
`localStorage` → explicit `userConfig`.** Rationale: the meta tag is a
page-level default an author declares in markup; `localStorage` holds a
_user's own_ transient preference (e.g. their reduced-motion toggle) and
should override the page author's default; an explicit JS call from the
framework wrapper (or Storybook, or a test) is a deliberate override and
always wins over both.

### 4. Type changes: `config.types.ts`

None needed — every field the meta tag can set (`brand`, `region`,
`language`, `fallbackLanguage`, `allowedLanguages`, `animated`) already
exists on `DsConfig`/`DsConfigState`. This keeps the change additive at
the parsing layer only.

### 5. Tests

New `config.meta.spec.ts` (Vitest), covering:

- No `<meta>` tag present → `{}`.
- Tag present with a subset of attributes → only those keys populated.
- Unknown `data-*` attributes on the tag are ignored (allowlist), including
  `data-http-form-submit`, `data-legal-links`, `data-legal-text`, and
  `data-social-links`, which are not read even if present.
- `animated="false"` → `false`; any other value (including absence
  handled above) → `true`.
- `allowedLanguages="de,fr,it"` → `['de', 'fr', 'it']`.
- Malformed/missing `document` (SSR) → `{}`, no throw.

Existing `setupDsConfig` tests get a case asserting precedence: meta tag
values are used when no `userConfig` override is given, and are overridden
when one is.

### 6. Documentation

- `packages/core/CONTEXT.md`: document the new `<meta
name="design-system-config">` bootstrapping path alongside the existing
  JS `initializeDesignSystem()` entry point.
- Add a short "Configuring via HTML" section/story in Storybook docs
  showing the meta tag next to the equivalent JS call, e.g.:

  ```html
  <meta name="design-system-config" data-brand="helvetia" data-region="CH" data-language="de" />
  ```

## Open questions (need your input before implementation)

1. Any other fields besides `brand`/`region`/`language`/`fallbackLanguage`/
   `allowedLanguages`/`animated` that should be meta-tag-configurable?
   (Icons, `httpFormSubmit`, `legalLinks`, `legalText`, and `socialLinks`
   are explicitly excluded — see above.)
2. Multiple DS instances on one page (rare, but `setupDsConfig` is
   reusable): should the meta tag be looked up by a fixed `name`, or should
   we support `win.DesignSystem` picking a differently-named tag via an
   optional `metaName` param?

## Consequences

- Small, additive change: one new file, one new const, a few lines in
  `setupDsConfig`. No new config fields, no type changes.
- No breaking changes — meta tag is opt-in and only read if present.
- `localStorage` now outranks the meta tag, matching the existing implicit
  behavior (it was already the more locally-scoped, user-controlled source
  before this change) and the user's own device-level preferences always
  win over a page author's markup default.
- Slightly increases the config module's responsibility for parsing/
  validating untyped string input from the DOM; mitigated by the explicit
  allowlist and try/catch-wrapped parsing (mirrors `configFromLocalStorage`).
- Icons, `httpFormSubmit`, `legalLinks`, `legalText`, and `socialLinks`
  remain JS-only; no new surface for configuring them via markup is
  introduced.
  </content>
