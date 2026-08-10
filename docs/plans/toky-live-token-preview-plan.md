# Live token preview: core postMessage listener + toky iframe integration

## Context

Toky (`apps/toky`) is a token editor that currently only edits token JSON and opens a GitHub PR via `/api/propose-change` — there is no live visual feedback while editing. `packages/core` (Stencil) already builds every component's markup as static HTML under `www/` (playground.html + ~49 `*.visual.html` files) and runs a dev-server (`pnpm start`, port **4000**, not 3000 as first assumed) that live-rebuilds on change.

The goal of this phase (MVP, per user's explicit scope) is:
1. Run the core dev-server locally and embed it as an iframe inside toky so token edits are visible immediately.
2. Give `packages/core` generic postMessage-listening logic so *any* page it serves (not just one dedicated page — confirmed with user) can receive token updates. Because every HTML page already loads Stencil's `globalScript` bundle (`src/global/global.ts` → `design-system.esm.js`/`.js`), adding the listener there means zero per-HTML-file edits and it works uniformly across playground.html and all visual.html files.
3. Send only *changed* tokens as CSS custom property updates (diff-based), not a full re-render.
4. Support basic multi-brand preview switching via the `data-theme` attribute, since `packages/tokens` already emits brand CSS wrapped in `[data-theme="tcs"] { ... }` (`packages/tokens/dist/css/tcs.tokens.css`, copied to `packages/core/www/assets/tokens/`).

Explicitly **out of scope** for this phase (confirmed with user): serving from a copied `www` build on Vercel, and pointing the mechanism at arbitrary external DS websites. Turbo/build wiring is limited to what's needed for local dev + a documented growth point for later.

## 1. `packages/core`: generic token-preview listener (global script)

New file `packages/core/src/global/token-preview.ts`:
- Exports `initializeTokenPreview(win = window)`.
- Only activates when embedded: `if (win.parent === win) return` (not in an iframe → no-op, so this is inert for normal component consumption / Playwright visual tests).
- Adds `window.addEventListener('message', handler)`. Validates `event.source === win.parent` (structural check; good enough for localhost-only MVP — no origin allowlist yet, call this out as a known limitation for the later "deployed" phase).
- Message contract (document via a small exported type, e.g. `packages/core/src/global/token-preview.types.ts`):
  ```ts
  type TokenPreviewMessage =
    | { source: 'ds-token-preview'; type: 'set-tokens'; tokens: { name: string; value: string | null }[] } // value: null = removeProperty (token deleted)
    | { source: 'ds-token-preview'; type: 'set-brand'; brand: string | null } // null/'Base' = reset to base
    | { source: 'ds-token-preview'; type: 'reset' }
  ```
- `set-tokens`: for each `{name, value}`, `value === null` → `document.documentElement.style.removeProperty(name)`; otherwise `document.documentElement.style.setProperty(name, value)`. Track applied (non-removed) names in a `Set<string>` so `reset` can call `removeProperty` on all of them and clear the set.
- `set-brand`: if a brand stylesheet for that brand isn't loaded yet, lazily inject `<link rel="stylesheet" href="/assets/tokens/${brand.toLowerCase()}.tokens.css">` into `<head>` (cache injected hrefs in a `Set` to avoid duplicates), then set `document.documentElement.dataset.theme = brand` (or `delete` the dataset key when `brand` is `null`/`'Base'`).
- On init (and once per load), posts `{ source: 'ds-token-preview', type: 'ready' }` via `win.parent.postMessage(...)` so the embedding page (toky) knows when it's safe to send the initial token/brand state.

Wire it into `packages/core/src/global/global.ts`:
```ts
import { initializeDesignSystem } from './initialize'
import { initializeTokenPreview } from './token-preview'

export default function () {
  initializeDesignSystem()
  initializeTokenPreview()
}
```

No `stencil.config.ts` changes needed — `globalScript: 'src/global/global.ts'` already bundles into every page's `design-system.esm.js`/`.js`, which every `www` HTML file already `<script>`-includes.

## 2. `packages/tokens`: extract shared CSS naming/serialization, consumed by `apps/toky`

See [ADR-0021](../adr/0021-shared-css-naming-serialization-for-preview.md): instead of duplicating logic in toky, extract pure functions out of `packages/tokens`' Style Dictionary transforms and export them for reuse.

- In `packages/tokens/src/transformers.ts`, extract the body of `ds/css/name` into an exported pure function `tokenNameToCssVar(pathSegments: string[]): string` (drop a `🧩 Component` segment if present, kebab-case + join remaining segments, fix t-shirt-size segments (`2-xl` → `2xl`), collapse double dashes, prefix `--ds-`). The existing `ds/css/name` Style Dictionary transform becomes a thin wrapper calling this function with `token.path`.
- Add an exported `resolvedValueToCss(value: unknown, type: string): string | null` next to the existing formatter logic in `packages/tokens/src/formatter.ts` (or a new `packages/tokens/src/css-value.ts` if formatter.ts is Style-Dictionary-format-shaped throughout) — minimal serializer for the value shapes actually in use: color DTCG object → hex (fall back to `rgba()` from `components`/`alpha` if no hex), dimension `{value, unit}` → `${value}${unit}`, plain number/string passthrough. Returns `null` for unrecognized shapes (caller skips those tokens rather than sending garbage).
- Export both from `packages/tokens`' package entrypoint (`packages/tokens/src/index.ts`).
- `apps/toky` adds a workspace dependency on `packages/tokens` and imports these directly in `apps/toky/src/tokens/css-preview.ts` (a thin adapter, not a reimplementation) rather than duplicating the logic.

## 3. `apps/toky`: preview sidebar component

New `apps/toky/app/preview-sidebar.tsx`, following the same shape/conventions as the existing `FigmaPullSidebar`/`BrandsSidebar`/`ProblemsSidebar`/`StagedChangesSidebar` (`token-editor.tsx:65-71`) — a fifth tab on the left `SidebarActivityBar` rail, not a new right-hand panel. It inherits the same resizable-width behavior the other sidebars already have (`apps/toky/app/sidebar.tsx:138-139`) for free, since it's rendered through the same `activeSidebarTab`-gated slot (`token-editor.tsx:2423-2487`).
- Renders `<iframe ref src={previewUrl} className="h-full w-full border-0" title="Design system preview" />`.
- `previewUrl` from `NEXT_PUBLIC_DS_PREVIEW_URL` env var, defaulting to `http://localhost:4000/playground.html` (matches core's `pnpm start` dev-server port). Add this var to `apps/toky/.env.example` with a comment.
- Mounts/unmounts with the tab (no visibility persistence — switching away from Preview and back is a full iframe reload, chosen for simplicity over keeping it hidden-but-mounted). On mount, adds a `message` listener for `{ source: 'ds-token-preview', type: 'ready' }` from the iframe's `contentWindow`; once received, posts `tokens`/`brand` as currently passed in props.
- Accepts `tokens: { name: string; value: string | null }[]` and `brand: string | null` as plain props — a dumb consumer, no owned postMessage-payload logic. Since `diff` (§4) is always the full comparison against the original baseline (not an incremental delta since the last message), passing it straight through on every mount already yields correct full-resync behavior for free — no separate "initial sync" vs "update" code path needed.
- Only post to `iframe.contentWindow.postMessage(msg, previewOrigin)` — compute `previewOrigin` from `new URL(previewUrl).origin` and pass explicitly as `targetOrigin` (not `'*'`).
- On mount, starts a `setTimeout` (e.g. 3s); if no `ready` message has arrived by then, render an inline hint in place of/over the iframe: "Preview server isn't running — start it with `pnpm --filter core start`." Clears the timeout on receiving `ready`. Covers the first-run trap of opening the tab without the two-terminal workflow running, without needing unreliable iframe `onError` handling (browsers don't fire that consistently for connection-refused).

## 4. `apps/toky`: wiring into `token-editor.tsx`

- Add a `preview` entry to `activeSidebarTab`'s tab union and a new icon on `SidebarActivityBar` (`token-editor.tsx:2488`), alongside the existing Figma Pull/Brands/Problems/Staged-changes tabs — selecting it renders `<PreviewSidebar>` in the same gated slot the other sidebars use (`token-editor.tsx:2423-2487`). No new layout primitive, no table/main-content changes: width, resize, and collapse behavior come for free from the existing sidebar-panel mechanism (`apps/toky/app/sidebar.tsx:39-40,138-139`).
- Compute preview props from existing state:
  - `changedTokens = useMemo(() => diff.map(entry => toPreviewToken(entry)).filter(Boolean), [diff])` where `toPreviewToken` uses `tokenNameToCssVar` + `resolvedValueToCss` from §2, reading `entry.newPath`/`entry.value`/`entry.type`. For `entry.kind === 'delete'`, emits `{ name: tokenNameToCssVar(entry.oldPath), value: null }` so the core listener calls `removeProperty` and the preview reverts to whatever the loaded stylesheet defines — no stale overrides left behind after a delete.
  - `activeBrand` — reuse existing brand-selection state already driving `BrandsSidebar`/`brandWorking` (`token-editor.tsx:353-360`) rather than inventing new state.
- Pass `changedTokens` and `activeBrand` to `<PreviewSidebar>`.

## 5. Turbo / workspace wiring (local-dev scope only)

- Add `packages/core` as a `pnpm start`-time *runtime* dependency of the local workflow (documented in README/CONTEXT, not a package.json dependency, since toky doesn't import core's JS — it only talks to it over postMessage/iframe at a fixed URL). **No turbo.json changes needed for MVP** since toky doesn't build against core's output; it just needs core's dev-server running on port 4000 alongside `pnpm --filter toky dev`.
- Document in `apps/toky/CONTEXT.md` (new section) and/or root dev docs: "to see live preview, also run `pnpm --filter core start` (or repo-root equivalent) so `localhost:4000` is serving."
- Explicitly defer (later scope, not touched now): copying `packages/core/www` into `apps/toky/public` for Vercel-served preview, and any turbo `build` `dependsOn`/output wiring for that copy step.

## Files touched

- `packages/core/src/global/token-preview.ts` (new)
- `packages/core/src/global/token-preview.types.ts` (new, or inline types in the above file)
- `packages/core/src/global/global.ts` (add one import + call)
- `packages/tokens/src/transformers.ts` (extract `tokenNameToCssVar`)
- `packages/tokens/src/formatter.ts` (or new `packages/tokens/src/css-value.ts`) (extract `resolvedValueToCss`)
- `packages/tokens/src/index.ts` (export both)
- `apps/toky/package.json` (add workspace dependency on `packages/tokens`)
- `apps/toky/src/tokens/css-preview.ts` (new, thin adapter over the imported functions)
- `docs/adr/0021-shared-css-naming-serialization-for-preview.md` (new — recorded during grilling session)
- `apps/toky/src/tokens/css-preview.test.ts` (new — unit tests for name/value transforms against real examples pulled from `packages/tokens/dist/css/base.tokens.css`)
- `apps/toky/app/preview-sidebar.tsx` (new)
- `apps/toky/app/token-editor.tsx` (wire in toggle + panel + prop computation)
- `apps/toky/.env.example` (add `NEXT_PUBLIC_DS_PREVIEW_URL`)
- `apps/toky/CONTEXT.md` (document the local dev-server dependency + message contract)

## Verification

1. `pnpm --filter core start` (or repo equivalent) — confirm `localhost:4000/playground.html` loads.
2. `pnpm --filter toky dev` — open toky, toggle the preview panel on, confirm the iframe loads and (via browser devtools console in the iframe) confirm a `ready` postMessage was received by toky (add a temporary `console.log` during dev, remove before done — or check via the Chrome extension tools).
3. Edit a color/spacing token in the toky table; confirm the corresponding `--ds-*` custom property updates live in the iframe's `document.documentElement.style` (inspect via devtools) and that a visible component using that token (if present on `playground.html`) reflects the change.
4. Switch brand in `BrandsSidebar`; confirm `data-theme` attribute updates on the iframe's `<html>` and the `tcs.tokens.css` link gets injected once (no duplicates on repeated switches).
5. `pnpm --filter toky test` / `pnpm --filter core test` (unit tests for `css-preview.ts` and any core changes) — run repo-wide `pnpm test` if scope allows.
6. Manually undo a token change in toky (existing undo button) and confirm the preview panel doesn't need special-casing — it should just re-derive `changedTokens` from the updated `diff` via existing memoization.

## Addendum: page picker (post-MVP, added after initial ship)

The preview sidebar initially only ever loaded `playground.html`. Added a page picker (reusing the
Reference picker's `SearchSelect` component, extracted to `apps/toky/app/search-select.tsx`) so it
can show any `*.visual.html` page instead. `packages/core`'s existing `buildStart` hook (the one
generating `docs/tags.json`) now also globs `src/{blocks,templates,foundation,components}/**/*.visual.html`
and writes `docs/visual-pages.json`, copied into `www/visual-pages.json` — Toky fetches that
manifest client-side from the preview origin (no new toky↔core build coupling, consistent with
this plan's original decision to keep them talking only over HTTP/postMessage at a fixed URL).
Switching pages reloads the iframe and re-runs the ready handshake, same as a tab remount.

## Later phases (explicitly out of scope now)

- **Deployed preview**: when toky runs on Vercel, no dev-server is reachable. Copy `packages/core/www` output into `apps/toky/public` (or serve it from a separate static route) at build time, and make `apps/toky` depend on `packages/core`'s build in `turbo.json` (`dependsOn`) so the copy step has fresh output. `NEXT_PUBLIC_DS_PREVIEW_URL` would switch to the toky-served static path in production, falling back to `localhost:4000` in local dev.
- **Full multi-brand CSS injection**: for brands with *unsaved* edits (not yet built into `dist/css/*.tokens.css`), extend the `set-brand` message (or add a new `set-brand-css` message) to carry full generated CSS text instead of relying on the prebuilt stylesheet + `data-theme` toggle.
- **Other DS websites**: generalize the listener contract so it could be dropped into non-monorepo, externally deployed DS sites, with an origin allowlist for security once postMessage crosses real origins (not just localhost).
