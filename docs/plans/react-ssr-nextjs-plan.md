# SSR support for `@baloise/ds-react` (Next.js)

## Context

`@baloise/ds-react` is client-only today: `packages/react/src/generated/components.ts`
is generated with a `'use client'` pragma at the top by
`@stencil/react-output-target`, and there is no Stencil `dist-hydrate-script`
output target in `packages/core/stencil.config.ts` to build a Node-compatible
renderer from. A Next.js consumer using App Router server components
therefore cannot render any `ds-*` component during SSR — it's forced into a
client boundary for anything that touches the design system.

Reference implementation studied: Swisspost's design system uses the same
`@stencil/react-output-target@1.6.2` we already depend on
(`packages/react/package.json`), configured for SSR. Verified directly from
package internals (not docs) that the mechanism is:

- `reactOutputTarget()` gains a `hydrateModule` option pointing at a Stencil
  `dist-hydrate-script` build output, plus `serializeShadowRoot:
  'declarative-shadow-dom'`.
- With `hydrateModule` set, the *same* generator call emits two files: the
  existing client `components.js` (`'use client'`, `createComponent` from
  `@stencil/react-output-target/runtime/create-component.js`) and a new
  server `components.server.js` (`createComponent` from
  `@stencil/react-output-target/runtime/ssr.js`, which does `renderToString`
  server-side via the hydrate module, serialized as a real Declarative
  Shadow DOM in the HTML response, then hydrates client-side).
- The consuming package's `exports` map routes the **`"node"`** condition
  (which Next.js's SSR pass runs under) to the server entry, everything else
  to the client entry — confirmed from Swisspost's actual
  `packages/components-react/package.json`. This is deliberately the
  `"node"` condition, not the newer `"react-server"` condition —
  `"react-server"` is RSC-specific (the component must never ship to the
  client at all), which doesn't fit our components: they're interactive and
  need to hydrate.

**Nothing today verifies SSR at all.** `apps/integration-react`
(`apps/integration-react/package.json`) is a plain Vite SPA — client-only,
no Node SSR pass, so it can't exercise the `"node"` export condition or
declarative-shadow-dom hydration.

## Decisions (confirmed)

1. **New `apps/integration-next` workspace app** — a minimal Next.js App
   Router app, following the same pattern
   [ADR-0009](../adr/0009-integration-apps-as-workspace-members.md)
   established for `apps/integration-react`/`apps/integration-angular`:
   permanent, git-tracked, ordinary workspace member (`workspace:*`
   dependency on `@baloise/ds-react`), own Playwright `play:run` e2e suite,
   own CI job in `continuous.yml`. `apps/integration-react` (Vite CSR) stays
   as-is — it covers a genuinely different consumer scenario (plain
   CSR/bundler resolution) that a Next.js app wouldn't exercise.
2. **`serializeShadowRoot: 'declarative-shadow-dom'`** (not `'scoped'`) —
   matches how components already render client-side (real shadow DOM), at
   the cost of requiring DSD browser support (Chrome/Edge, Safari 16.4+,
   Firefox 123+ — evergreen browsers only, consistent with this repo's
   existing webstatus.dev/caniuse.com compatibility target per `CLAUDE.md`).
3. **Modal/Toast/Snackbar idioms stay explicitly client-only.** The
   hand-authored `packages/react/src/idioms/modal.tsx`, `toast.ts`,
   `snackbar.ts` (from tickets
   [#2218](https://github.com/baloise/design-system/issues/2218)/[#2219](https://github.com/baloise/design-system/issues/2219))
   get an explicit `'use client'` directive regardless of what the generator
   would otherwise produce — they're `useState`-driven and imperative-
   controller-driven, server-rendering them has no meaning. Every other
   generated component (the bulk of the library) gets real SSR.

## Implementation

### 1. `packages/core`: add the hydrate build

`packages/core/stencil.config.ts` — add a `dist-hydrate-script` output
target (new; none exists today), producing a Node-compatible renderer at
`packages/core`'s package root (`hydrate/`). `packages/core/package.json`
already has a wildcard export (`"./*": "./*"`), so `@baloise/ds-core/hydrate`
resolves without an explicit exports-map entry — but add `hydrate/` to the
`files` array so it's actually published.

### 2. `packages/core/config/stencil.bindings.react.ts`: wire SSR into the generator

Extend the existing `reactOutputTarget()` call with `hydrateModule:
'@baloise/ds-core/hydrate'` and `serializeShadowRoot:
'declarative-shadow-dom'`. Verify the exact output filenames this produces
under our `outDir: '../react/src/generated'` (Swisspost's equivalent config
emits `components.js` + `components.server.js` side by side under their
`outDir`) — confirm against the installed `@stencil/react-output-target`
version's actual output before wiring `packages/react/src/index.ts`/
`index.server.ts` to import from them.

### 3. `packages/react`: client/server entry split + exports map

- `packages/react/src/index.ts` (client, unchanged behavior) and a new
  `packages/react/src/index.server.ts`, each re-exporting from the
  respective generated file — mirroring Swisspost's
  `index.ts`/`index.server.ts` split (confirmed from their actual source:
  each is a one-line `export * from './stencil-generated/components(.server).js'`).
  Layer this on top of the export-restructuring already planned in
  [react-modal-idioms-plan.md](react-modal-idioms-plan.md) (raw
  `Modal`/`Toast`/`Snackbar`/`AlertContainer` excluded from both entries;
  idiomatic replacements exported from both, with the idioms file itself
  forcing `'use client'` per decision 3).
- `packages/react/package.json`: add an `exports` map (none exists today —
  currently just `main`/`module`/`types`) with the `"node"` condition
  routing to `dist/index.server.js`, default routing to `dist/index.js`,
  mirroring Swisspost's `packages/components-react/package.json` shape.
- Build step: `tsc -p tsconfig.lib.json` already compiles all `.ts`/`.tsx`
  under `src/` (per `tsconfig.lib.json`'s `include`), so both entry points
  build automatically — no bundler changes needed.

### 4. New `apps/integration-next`

Minimal Next.js App Router app, workspace member, `@baloise/ds-react` via
`workspace:*`. At minimum: one server component page rendering a handful of
plain (non-idiom) `ds-*` components to prove SSR + hydration works
end-to-end (inspect page source for declarative shadow DOM markup, confirm
no hydration-mismatch console errors), and one client component page using
`<Modal>`/`useToast`/`useSnackbar` to prove the client-only idioms still
work inside a Next.js app. Playwright `play:run` suite + `continuous.yml` CI
job, following `apps/integration-react`'s existing pattern exactly.

### 5. Documentation

- New ADR (next available number after whatever
  [react-modal-idioms-plan.md](react-modal-idioms-plan.md)'s ADR-0027 lands
  as) documenting: why SSR was added, the `"node"`-condition exports-map
  decision (and why not `"react-server"`), and the client-only carve-out for
  the three idioms.
- `packages/react/CONTEXT.md`: document the client/server entry split.
- `packages/core/CONTEXT.md`: document the new `dist-hydrate-script` output
  target.

## Verification

- `pnpm --filter @baloise/ds-core build` produces `hydrate/` output.
- `pnpm --filter @baloise/ds-react build` produces both `dist/index.js` and
  `dist/index.server.js`.
- `apps/integration-next`: `next build && next start`, view page source for
  a server-rendered `ds-*` component — confirm declarative shadow DOM markup
  is present before any JS runs, and confirm the browser console has no
  hydration-mismatch warnings.
- `apps/integration-next`'s Playwright suite passes in CI.
- Confirm `<Modal>`/`useToast`/`useSnackbar` still work correctly inside a
  Next.js client component (no `'use client'`-boundary errors).

## Suggested execution order

1. `packages/core`: `dist-hydrate-script` output target (independent, no
   dependency on the React idioms work).
2. `packages/core/config/stencil.bindings.react.ts`: `hydrateModule` +
   `serializeShadowRoot` wiring — blocked by (1).
3. `packages/react`: client/server split + `exports` map — blocked by (2),
   and by whichever of #2218/#2219 lands first (reuses that export-
   restructuring work rather than conflicting with it).
4. `apps/integration-next` — blocked by (3), needed to verify it.
5. ADR + CONTEXT.md updates — alongside (3)/(4).
