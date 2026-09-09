# 29. SSR-capable hydrate build for `@baloise/ds-core`

Package: `packages/core`, `packages/react`

Date: 2026-09-09

## Status

Accepted

## Context

`@baloise/ds-react` is client-only: `@stencil/react-output-target` emits
`packages/react/src/generated/components.ts` with a `'use client'` pragma,
and `packages/core/stencil.config.ts` had no `dist-hydrate-script` output
target. A Next.js App Router server component therefore cannot render any
`ds-*` component during SSR — anything that touches the design system is
forced into a client boundary.

Swisspost's design system solves this with the same
`@stencil/react-output-target@1.6.2` we already depend on: a Stencil
`dist-hydrate-script` build plus `hydrateModule` /
`serializeShadowRoot: 'declarative-shadow-dom'` on `reactOutputTarget()`,
so the same generator call emits a client `components.ts` and a server
`components.server.ts`.

This ADR covers the core hydrate build and the generator wiring. The
consuming React package's `"node"`-condition exports map, the Next.js
integration app, and the Modal/Toast/Snackbar client-only carve-out are
the follow-up tickets in
[docs/plans/react-ssr-nextjs-plan.md](../plans/react-ssr-nextjs-plan.md).

## Decision

1. **`dist-hydrate-script` on `@baloise/ds-core`.** Stencil produces a
   Node-compatible renderer at `hydrate/` on the package root, published via
   the `files` array. `exports["./hydrate"]` is declared explicitly (types
   → `hydrate/index.d.ts`, import → `index.mjs`, require → `index.js`),
   matching `./components` and `./loader`. The `"./*"` wildcard is enough
   for untyped Node resolution, but TypeScript cannot resolve the subpath
   without a types-bearing export — the generated React server wrappers
   `import('@baloise/ds-core/hydrate')`, so the react package build would
   fail without it.

2. **`reactOutputTarget()` gains `hydrateModule` and DSD serialization.**
   `hydrateModule: '@baloise/ds-core/hydrate'` and
   `serializeShadowRoot: 'declarative-shadow-dom'` (not `'scoped'`) match
   how components already render client-side (real shadow DOM). DSD
   requires evergreen browsers only (Chrome/Edge, Safari 16.4+, Firefox
   123+), which is this repo's existing webstatus.dev/caniuse.com target.
   `clientModule: './components.js'` is also set: the generator requires it
   whenever `hydrateModule` is set, so the server file can namespace-import
   the sibling client wrappers.

3. **Planned: `"node"` condition, not `"react-server"`, on
   `@baloise/ds-react`.** Next.js's SSR pass runs under the `"node"`
   export condition. `"react-server"` is RSC-specific: the module must
   never ship to the client at all. That does not fit these components —
   they are interactive and must hydrate. The exports map itself lands in
   the next ticket; this ADR records the condition choice so it is not
   relitigated there.

4. **Planned: Modal/Toast/Snackbar idioms stay client-only.** The
   hand-authored React idioms (`packages/react/src/components/modal.tsx`,
   `src/hooks/use-toast.ts`, `src/hooks/use-snackbar.ts`) will carry an
   explicit `'use client'` directive regardless of what the generator
   produces. They are `useState`-driven and imperative-controller-driven;
   server-rendering them has no meaning. Every other generated component
   gets real SSR. Those idioms are not in this ticket.

## Consequences

- `pnpm --filter @baloise/ds-core build` now emits `hydrate/` (gitignored,
  like `loader/` and `components/`). Turbo's `build` outputs include
  `hydrate/**` so the cache keeps it.
- The same core build emits `packages/react/src/generated/components.server.ts`
  alongside `components.ts`. `@baloise/ds-react` remains client-only at
  its public entry until the exports map lands. Compiling that server file
  requires `moduleResolution: "bundler"` in `packages/react/tsconfig.lib.json`
  so TypeScript can resolve the `@stencil/react-output-target/ssr` entry
  (the existing `/runtime` entry worked under `"node"` via a root
  `runtime.d.ts`; `/ssr` has no equivalent).
- Consumers cannot yet SSR from `@baloise/ds-react` — that is the next
  ticket. This change only publishes the renderer and teaches the React
  generator to emit the server wrappers.
