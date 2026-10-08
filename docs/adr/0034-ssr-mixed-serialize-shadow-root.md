# 34. Mixed `scoped`/declarative-shadow-dom default for SSR, via `@helvetia-design/core/hydrate-defaults`

Package: `packages/core`, `apps/integration-ssr`

Date: 2026-10-08

## Status

Accepted

## Context

[ADR-0031](0031-ssr-hydrate-build.md) picked `serializeShadowRoot: 'declarative-shadow-dom'`
(DSD) as the SSR default, uniformly, for every `ds-*` tag, to match client-side rendering
(real shadow DOM) exactly. That default has a real cost: Stencil cannot share a stylesheet
across declarative shadow roots in static HTML, so every single component _instance_ gets its
own full copy of that component's `<style>` inlined into its `<template shadowrootmode="open">`.
A page with six `ds-button`s ships six copies of the same several-KB stylesheet. `apps/integration-ssr`
surfaced this directly: a `view-source:` of its demo page showed the same ~6KB button stylesheet
repeated six times.

Stencil's hydrate runner (`@stencil/core/internal/hydrate/runner`, `HydrateDocumentOptions`)
supports a per-tag mix instead of an all-or-nothing choice:

```ts
serializeShadowRoot?: 'declarative-shadow-dom' | 'scoped' | {
  'declarative-shadow-dom'?: string[]
  scoped?: string[]
  default: 'declarative-shadow-dom' | 'scoped'
}
```

`'scoped'` renders a component's content as light-DOM-like markup with Stencil's scoped CSS
class selectors (`sc-ds-button`, …) instead of a real shadow root: one shared stylesheet
(already linked via `/assets/design-system.css`), no per-instance duplication. Every tag -
regardless of SSR mode - still upgrades to a real shadow root on client-side hydration; `scoped`
only changes what ships in the _static_ HTML before JS runs.

The split has two layers. The first is categorical, not component-by-component: every tag under
`overlays/`, `navigation/`, and `forms/` renders DSD; everything else renders `scoped` by default.
That is a deliberate simplicity-over-byte-count tradeoff - "interactive/input = DSD,
presentational/layout = scoped" is a rule a reader can hold in their head and a glob can enforce
automatically (see Decision item 6), versus auditing each component individually for
teleport/positioning/stacking behavior. It costs more HTML on pages heavy with simple form
controls (`ds-checkbox`, `ds-input`, `ds-textarea`, …) than a narrower allow-list scoped to only
the components that strictly need DSD's behavior would.

The second layer handles the small number of components _outside_ those three folders that still
belong on DSD - `ds-carousel`, `ds-app-footer`, `ds-hint`, `ds-spinner` - via two criteria, either
sufficient on its own:

1. **Needs real shadow DOM semantics before hydration** - teleporting, positioning against an
   anchor, or stacking above page content. `scoped` markup isn't in a real shadow root yet, so
   that behavior wouldn't work (or would visibly differ from the post-hydration result) until
   client JS upgrades it. `ds-carousel`'s scroll-snap over slotted items is this case.
2. **Typically appears few times per page** - a singleton, or close to it. DSD's cost is "one
   `<style>` copy per instance"; at low instance counts that cost rounds down to negligible, so
   there's no reason to trade away exact client-matching rendering for it. `ds-app-footer` (at
   most one per page), `ds-hint`/`ds-hint-text`/`ds-hint-title` (one per form field it annotates,
   not dozens), and `ds-spinner` (usually conditional/transient) are this case.

Neither criterion applies to `ds-button` or `ds-card`: no teleport/positioning behavior, and
typically many instances per page, so `scoped`'s shared-stylesheet saving actually matters there.
That's the entire reason this mixed default exists instead of ADR-0031's simpler, more expensive
uniform-DSD choice. The full reasoning and per-tag breakdown lives as a code comment on
`handCuratedDsdTags` in `packages/core/config/hydrate-defaults.ts` - read it before adding a new
entry there, and write down which criterion (1, 2, or both) justifies the addition.

### Why `@helvetia-design/core/hydrate-defaults`, not the main entry

The obvious place to ship this list is `@helvetia-design/core`'s main export - but Stencil's
`type: 'dist'` output target produces `dist/index.js` as `export * from './esm/index.js'`, an
extensionless `.js` file with no `"type"` field anywhere in `packages/core/package.json`. Plain
Node resolves that correctly via its "reparse as ESM" fallback for syntax it can't otherwise
classify. `tsx` - and by extension any esbuild-based Node loader, including this app's own dev
server - does not: it silently drops any named export reached through that `export *`
indirection, raising `SyntaxError: ... does not provide an export named 'X'` only at the point of
a static `import { X }`. This is a pre-existing dual-package-hazard in Stencil's `dist` output
target, not something introduced here, and not something to fix repo-wide inside this ticket -
every other named export from the main entry has simply never been imported through a bare
`import { ... } from '@helvetia-design/core'` under a tsx-driven dev server before.

A new subpath sidesteps it with the same approach `packages/react` already uses for its own build
(`tsc -p tsconfig.lib.json`, matching `packages/tokens`): a plain `tsc` pass over a small
TypeScript source directory, outside Stencil's component pipeline entirely, emitting one flat ESM
file with no re-export indirection. No hand-written, hand-duplicated build output, and no new
build-tooling concept for the repo - just the existing "small utility package without a bundler"
pattern, scoped down to a single subpath of `@helvetia-design/core` instead of a whole separate
package.

It is named `./hydrate-defaults`, not `./ssr`: this package already has an `./hydrate` subpath -
the actual Stencil SSR renderer (`renderToString()`). `./ssr` read as a peer of `./hydrate` doing
the same job, which it doesn't - it exports exactly one piece of config data
(`recommendedSerializeShadowRoot`) meant to be passed _into_ `renderToString()`'s options.
`./hydrate-defaults` names that relationship directly.

## Decision

1. **`packages/core/config/hydrate-defaults.ts`** is a new TypeScript source file exporting
   `dsdTags: string[]` and `recommendedSerializeShadowRoot`, typed against
   `HydrateDocumentOptions['serializeShadowRoot']` from `@stencil/core/internal/hydrate/runner`.
   It lives in `config/` alongside `stencil.bindings.react.ts` - its only other consumer - rather
   than its own top-level directory. **`packages/core/tsconfig.hydrate-defaults.json`** compiles
   it (`module: esnext`, `moduleResolution: node`) to
   `packages/core/hydrate-defaults/hydrate-defaults.js` + `.d.ts` - a single flat file, ESM only,
   no dual CJS/ESM split (matching `packages/react`'s own `dist/index.js`-only,
   `"default"`-condition export; Node 22+'s native `require(esm)` support covers CJS consumers).

2. **`scripts/build-core.mjs` gains a `buildHydrateDefaults()` step**, run after the Stencil build
   (so the tsc pass doesn't race Stencil's own package.json `files` validation) and before the
   Angular-meta/cleanup steps. `ensurePackageFilesExist()` now always pre-creates
   `hydrate-defaults/` as an empty placeholder before Stencil runs, the same way it already did
   for `components/`/`hydrate/` in doc-only builds.

3. **`packages/core/package.json` gains a `./hydrate-defaults` export** (`types` + `default`, no
   separate `import`/`require`) and `hydrate-defaults/` in `files`. `hydrate-defaults/` is build
   output, gitignored like `dist/`/`hydrate/`/`components/`/`loader/`.

4. **DSD allow-list**: every tag under `components/overlays/*`, `components/navigation/*`, and
   `components/forms/*` (auto-derived, see item 6), plus a small hand-curated set outside those
   folders - carousel, app-footer, hint, spinner - 45 tags at the time of writing. Everything else
   defaults to `'scoped'`.

5. **`apps/integration-ssr/server.ts`** imports `recommendedSerializeShadowRoot` from
   `@helvetia-design/core/hydrate-defaults` and passes it as `serializeShadowRoot` to
   `renderToString()`, replacing the ADR-0031 uniform-DSD default. Its demo fragment includes a
   `ds-tooltip` so both code paths (`scoped` for button/input/checkbox, DSD for tooltip) stay
   exercised by `e2e/ssr.spec.ts`.

6. **`packages/core/config/generate-hydrate-defaults-tags.mjs`** globs component source files
   under `components/overlays/`, `components/navigation/`, and `components/forms/` the same way
   `generate-component-tags.mjs` globs every component for `tags.constant.ts`, writing the result
   to the gitignored `config/hydrate-defaults.generated.ts` (`autoDsdTags: string[]`). Regenerated
   by `scripts/build-core.mjs` before Stencil's build even starts (`stencil.config.ts` transitively
   requires it via `stencil.bindings.react.ts` → `hydrate-defaults.ts`, so it must exist before
   Stencil's config loads, not just before the later `tsc` pass). Adding a new component under any
   of those three folders - e.g. a new overlay, or a new form control - puts its tag on the DSD
   list automatically, no edit needed anywhere in this package.

   `config/hydrate-defaults.ts` merges `autoDsdTags` with a small hand-curated
   `handCuratedDsdTags` array: `ds-carousel`/`ds-carousel-item` (`structure/carousel/`),
   `ds-app-footer` (`structure/app-footer`), `ds-hint`/`ds-hint-text`/`ds-hint-title`
   (`indicators/hint`), and `ds-spinner` (`indicators/spinner`). These sit outside the three
   auto-globbed folders with no shared boundary of their own to glob instead, so (unlike the
   popover-form-controls case this ADR originally hand-curated and later folded into the `forms/`
   auto-glob) they stay a manually maintained list. A new component added under one of _these_
   specific existing folders is **not** picked up automatically - only a glob boundary gets that.

7. **`packages/core/config/stencil.bindings.react.ts`** imports `recommendedSerializeShadowRoot`
   directly from the sibling `./hydrate-defaults` source file (not the published
   `@helvetia-design/core/hydrate-defaults` subpath - this file runs during the Stencil build,
   before that subpath's own `tsc` pass has produced output) and passes it as
   `reactOutputTarget()`'s `serializeShadowRoot`, replacing the
   hardcoded `'declarative-shadow-dom'` string. This bakes the same mixed default into every
   generated `@helvetia-design/react` Server Component wrapper
   (`packages/react/src/generated/components.server.ts`), so every React SSR consumer - Next.js
   (`apps/integration-next`) included - gets it automatically with no per-call config of their
   own, unlike `apps/integration-ssr` which calls `renderToString()` directly and must pass the
   option itself. `apps/integration-next/app/page.tsx` gained a `DsTooltip` for the same reason as
   `apps/integration-ssr`'s fragment: keep both code paths covered by `e2e/ssr.spec.ts`.

## Consequences

- Pages with many repeated presentational/layout components (buttons, cards, badges, …) ship
  meaningfully less HTML - no per-instance stylesheet duplication. Pages heavy with form controls
  do not get that same saving, by design (see Context) - every `forms/*` tag renders DSD,
  matching client-side shadow DOM behavior exactly rather than minimizing bytes.
- `autoDsdTags` (overlays, navigation, forms) regenerates on every build and needs no manual
  upkeep - adding a component under one of those three folders is enough. `handCuratedDsdTags`
  (carousel, app-footer, hint, spinner) does not auto-expand: a new component added under
  `structure/carousel/`, `structure/app-footer/`, `indicators/hint/`, or `indicators/spinner/`
  needs a manual add to that array, same as the popover-form-controls case this ADR originally
  hand-curated before folding it into the `forms/` auto-glob.
- The generated `hydrate-defaults.generated.ts` is required (via `stencil.bindings.react.ts` →
  `hydrate-defaults.ts`) extensionless, so Stencil's CJS-based config loader can resolve the `.ts`
  source directly - but Node's ESM runtime needs an explicit extension for the same relative
  import once it's compiled. `buildHydrateDefaults()` patches the extension into the compiled
  output only (`patchHydrateDefaultsImport()`), after `tsc` runs, leaving the source as the
  Stencil-loader-compatible extensionless form. Same category of fixup as
  `packages/react/scripts/patch-server-wrappers.mjs`.
- The underlying `dist/index.js` dual-package hazard is _not_ fixed by this ADR - it remains
  latent for any other named export of the main entry consumed under an esbuild-based Node loader.
  Fixing it properly (e.g. renaming Stencil's dist outputs to `.mjs`/`.cjs`) is out of scope here
  and would need its own ADR given its blast radius (every consumer of `@helvetia-design/core`'s
  main entry).
- `apps/integration-ssr/e2e/ssr.spec.ts` was updated: the full-HTML assertion now checks `scoped`
  markup (`sc-ds-button` class, no shadow root) for `ds-button` and real `shadowrootmode` DSD only
  for `ds-tooltip`, instead of asserting `shadowrootmode` unconditionally for the whole page.
