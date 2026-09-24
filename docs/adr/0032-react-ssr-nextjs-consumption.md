# 32. React SSR and Next.js consumption

Package: `packages/react`, `apps/integration-next`

Date: 2026-09-17

## Status

Accepted

## Context

[ADR-0031](0031-ssr-hydrate-build.md) added the Stencil hydrate build and
generated React server wrappers. That foundation did not by itself make
`@helvetia-design/react` usable in a Next.js App Router application.

Next.js must resolve server wrappers during its Node render and client
wrappers in the browser. The stock Stencil server output also exposed three
integration problems:

- it starts with `'use client'`, so Next.js does not treat the wrappers as
  Server Components;
- it statically imports the client wrapper graph, which evaluates
  browser-only component dependencies in Node;
- it returns `<template shadowrootmode>` as React children. The browser
  consumes that template into a shadow root before React hydrates, causing
  React error 418 when reconciliation looks for the template node.

The application must still register the custom elements and initialize the
Design System in the browser after the server has emitted Declarative Shadow
DOM.

## Decision

1. **Use one public import with conditional entries.**
   `@helvetia-design/react` maps the `"node"` export condition to
   `dist/index.server.js` and the default condition to `dist/index.js`, with
   matching type declarations. Consumers use the same package import in
   Server and Client Components. We use `"node"` rather than
   `"react-server"` because the components remain interactive and hydrate in
   the browser.

2. **Patch generated server output after TypeScript compilation.**
   `packages/react/scripts/patch-server-wrappers.mjs` removes the generated
   `'use client'`, conditionally loads the client wrappers only when
   `window` exists, and redirects the generated `createComponent` import to
   the local SSR adapter. The script validates every expected replacement
   and fails the build if the generator output changes. Generated source
   remains untouched, and the package continues to use the stock Stencil
   React output target as decided in
   [ADR-0003](0003-ds-react-no-custom-output-target.md).

3. **Keep Declarative Shadow DOM opaque to React hydration.**
   `packages/react/src/ssr-create-component.ts` renders the Stencil result to
   static markup and inserts it through `dangerouslySetInnerHTML` inside a
   `display: contents` wrapper with `suppressHydrationWarning`. The browser
   can consume the Declarative Shadow DOM template while React does not try
   to reconcile that template node.

4. **Initialize browser behavior at a client boundary.**
   A Next.js root layout remains a Server Component and renders
   `DsRootSSRProvider` from `@helvetia-design/react`, which requires no client
   boundary of its own. Internally it renders a small client leaf whose
   effect dynamically imports `defineCustomElements` from
   `@helvetia-design/core/loader` and calls `initializeDesignSystem` from
   `@helvetia-design/core`, then passes `children` through unchanged — it does not
   render `<ds-root>`, since that element's SSR wrapper flattens children
   into static HTML. Vite SPA consumers continue to use `DsRootProvider`.

5. **Keep overlay idioms client-only.** `Modal`, `useModal`, `useToast`, and
   `useSnackbar` declare `'use client'`. The reference application loads its
   overlay demo with `dynamic(..., { ssr: false })` because the controllers
   and custom-element upgrade require browser globals.

6. **Externalize core in the Next.js server build.**
   Next.js applications configure
   `serverExternalPackages: ['@helvetia-design/core']`. Monorepos may additionally
   set `turbopack.root` to their workspace root.

7. **Verify SSR in a production integration application.**
   `apps/integration-next` checks the raw HTTP response for
   `shadowrootmode`, verifies hydration without console warnings or errors,
   and exercises the overlay idioms. The dedicated `next` job in
   `.github/workflows/continuous.yml` builds the packages and application,
   then runs its Playwright suite.

## Consequences

- Plain generated `Ds*` wrappers render as Declarative Shadow DOM from
  Next.js Server Components and hydrate into interactive custom elements.
- Consumers must import the global token and Design System styles and add a
  client initialization boundary once in the application.
- Overlay idioms and other browser-only graphs remain client islands.
- The post-compile patch depends on the shape of generated Stencil output.
  Its assertions make generator changes fail at build time instead of
  silently producing a broken package.
- A custom React output target remains a possible future replacement if the
  patch grows beyond this narrow compatibility layer.
