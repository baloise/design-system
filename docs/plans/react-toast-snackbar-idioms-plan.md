# React idioms for `ds-toast` and `ds-snackbar`

## Context

`@baloise/ds-react` (`packages/react`) is currently a pure pass-through:
every `ds-*` component gets a generated wrapper via
`@stencil/react-output-target`, per
[ADR-0003](../adr/0003-ds-react-no-custom-output-target.md). Unlike
`ds-modal` (see the companion
[react-modal-idioms-plan.md](react-modal-idioms-plan.md)), `ds-toast` and
`ds-snackbar` don't have a controlled-prop desync bug — their `close()`
`@Method` (`toast.tsx`, `snackbar.tsx`) just emits a `dsCloseClick`/
`dsActionClick` event, with no internal boolean state that can drift out of
sync with React.

The actual gap: both components are used exclusively through
`dsToastController`/`dsSnackbarController`
(`packages/core/src/components/alert/alert.controller.ts`), a plain
imperative, fully data-driven API (the `Alert` type — `heading`, `message`,
`closable`, `closeHandler`, `actionHandler`, etc., no JSX content — see
`packages/core/src/components/alert/alert-container.interfaces.tsx`). Today
a React consumer has to import and call that vanilla-JS controller directly;
there's no React-idiomatic entry point. Reference: `@ionic/react`'s
`useIonToast` hook wraps their equivalent `toastController` the same way —
tracking the created overlay in a ref, exposing `present`/`dismiss`.

No core changes are needed here — `Alert` is already fully data-driven, so
there's no content-injection problem to solve (unlike modal), and no
dependency on the ADR-0022/#2120 work.

## Decisions (confirmed, shared with the modal plan)

1. A new ADR (`docs/adr/0027-react-idioms-for-overlay-components.md`)
   supersedes ADR-0003 (shared with the modal plan — write once).
2. The raw generated `Toast`/`Snackbar`/`AlertContainer` wrappers are
   **not** part of the public `@baloise/ds-react` API — only `useToast`/
   `useSnackbar` are exported.
3. Naming: plain names (`useToast`, `useSnackbar`), no `Ds` prefix.

## Implementation

### File layout

```
packages/react/src/
  generated/components.ts   # unchanged — still generates the raw ds-toast/ds-snackbar/ds-alert-container bindings internally (used only inside dsToastController/dsSnackbarController in packages/core, not re-exported)
  idioms/
    toast.ts                 # useToast
    snackbar.ts               # useSnackbar
  index.ts                   # re-exports everything from generated/components except Toast/Snackbar/AlertContainer; exports useToast/useSnackbar instead
```

Do **not** use Stencil's `excludeComponents` — keep generation unchanged,
just don't re-export those three names from `packages/react/src/index.ts`.

### B1 — `useToast()` / `useSnackbar()` hooks

`packages/react/src/idioms/toast.ts`:

```ts
export function useToast() {
  const idRef = useRef<string>()
  const present = useCallback(async (options: Alert) => {
    idRef.current = await dsToastController.create(options)
  }, [])
  const dismiss = useCallback(async () => {
    if (idRef.current) await dsToastController.remove(idRef.current)
  }, [])
  return [present, dismiss] as const
}
```

`packages/react/src/idioms/snackbar.ts`: identical shape against
`dsSnackbarController`. Both import `dsToastController`/
`dsSnackbarController` and the `Alert` type from `@baloise/ds-core` (already
publicly exported via `packages/core/src/index.ts`'s `export * from
'./components/alert/alert.controller'`). No new core work needed.

## Verification

- `pnpm --filter @baloise/ds-react build` (plain `tsc`) compiles cleanly.
- Manual check in `apps/integration-react`: a button calling `useToast()`'s
  `present({ heading: '...', message: '...', closable: true, closeHandler:
  () => {}, actionHandler: () => {} })`; confirm it appears, auto-dismisses
  per `duration`, and closes correctly. Same for `useSnackbar()`.

## Execution order

1. `idioms/` directory + `index.ts` export changes + `packages/react/CONTEXT.md`
   update + ADR-0027 (shared with the modal plan — do once, whichever plan
   lands first).
2. B1 (`useToast`, `useSnackbar`) — ships independently, no dependency on
   the modal plan or on #2120.
