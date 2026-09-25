# 33. ds-phone-input bundles all flag SVGs inline instead of loading them lazily

Package: `packages/core`

Date: 2026-09-18

## Status

Accepted. Supersedes [ADR-0024](0024-ds-phone-input-lazy-svg-flags.md).

## Context

A PR review of `ds-phone-input` flagged that consumers currently have to configure their own build
to make the country flags show up at all: Angular apps need an `assets` glob entry in `angular.json`
copying `@helvetia-design/core`'s `assets/flags` folder into their build output, React/Vite apps need a
bespoke copy plugin (`apps/integration-react`'s `copyPhoneFlags()`), and neither step is documented
anywhere a consumer would find it. That requirement exists because of
[ADR-0024](0024-ds-phone-input-lazy-svg-flags.md)'s decision to resolve each country's flag SVG
lazily via Stencil's `getAssetPath()`/`setAssetPath()`, copying the SVGs from the `country-flag-icons`
npm package into each output target at build time — chosen specifically to avoid bundling all ~240
countries' worth of flag weight into every consumer regardless of whether `countries` restricts the
picker to 4 entries.

After discussing this with the architecture owner, the trade-off has been revisited: the zero-config
consumer experience is now judged more important than the bundle-size saving ADR-0024 optimized for.
This mirrors the existing UI icon system (`ds-icon`, `packages/assets/src/icons`): all icons are
compiled at build time into a single generated `svg.ts` of string constants, injected eagerly into
`packages/core`'s global default config (`defaultConfig.icons`), and rendered via `innerHTML` — no
network request, no asset path, no consumer-side copy step, ever.

## Decision

Bundle every country's flag SVG as an inline string, generated at build time exactly like
`ds-icon`'s icons: `scripts/build-svg.mjs` gets a `flags` sub-package (sourced from the
`country-flag-icons` npm dependency instead of hand-authored SVGs, synced into
`packages/assets/src/flags/svg` before the existing scan/optimize/write pipeline runs), producing
`packages/assets/src/flags/svg.ts` (`FlagCh`, `FlagDe`, ... one string constant per ISO code) and a
`Flags` namespace export. `ds-phone-input`'s `flag.ts` becomes a plain lookup (`getFlagSvg(code)`)
into that `Flags` object, rendered via `innerHTML` on a `<span class="flag">` exactly like `ds-icon`
renders its `<div id="inner">`. Unlike icons, flags are not exposed through the overridable
`DsConfig`/`updateDsIcons()`-style config path — they are a fixed ISO-3166 set, not a
consumer-extensible list, so a static import is sufficient.

Because `getAssetPath()`/`setAssetPath()` was used _only_ for flags, the whole workaround this
introduced for `@helvetia-design/angular`/`@helvetia-design/react` (documented in `packages/core/CONTEXT.md`'s
former "Asset path (`resourcesUrl`)" section) is removed entirely along with it — there is no runtime
asset path left to resolve.

## Consequences

- Every consumer's bundle grows by the full flag set (~1 MB of SVG source across ~267 countries)
  regardless of whether `countries` restricts the picker to a handful of entries — the exact
  trade-off ADR-0024 rejected. Accepted as the cost of removing all consumer-side configuration.
- `country-flag-icons` moves from `packages/core`'s runtime `dependencies` to the repo root's
  `devDependencies` — it is only ever read by `scripts/build-svg.mjs` at generation time, never
  imported at runtime.
- The `getAssetPath()`/`setAssetPath()` workaround is deleted wholesale: `flagAssetsCopy` and its
  `www`-target twin in `packages/core/stencil.config.ts`, the `setAssetPath()` call in
  `@helvetia-design/angular`'s `bootstrapDesignSystem()`, and `@helvetia-design/react`'s `asset-path.ts`,
  its wiring into `DsRootProvider`, and the `bootstrap.client.ts` seam it existed for. Consuming
  apps' equivalents (`apps/integration-angular`'s `angular.json` assets glob, `apps/integration-react`'s
  `copyPhoneFlags()` Vite plugin) are removed too, since they no longer serve any purpose.
- `ds-phone-input`'s flag markup changes from `<img src="...">` to an inline `<span innerHTML="...">`,
  matching `ds-icon`'s rendering; `.flag`'s SCSS switches from `object-fit: cover` on an `img` to
  `overflow: hidden` with the nested `svg` sized to fill its container.
