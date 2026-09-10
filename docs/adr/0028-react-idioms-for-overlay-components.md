# 28. React overlay components get hand-authored idioms on top of the stock output target

Package: `packages/react`

Date: 2026-09-09

## Status

Accepted. Supersedes [ADR-0003](0003-ds-react-no-custom-output-target.md) for the public overlay API.

## Context

[ADR-0003](0003-ds-react-no-custom-output-target.md) decided that `@baloise/ds-react` needed no custom output-target package: `@stencil/react-output-target` already generates typed wrappers, and React consumers handle controlled/uncontrolled state themselves. That still holds for generation — there is still no `libs/output-target-react`, and Stencil still emits a wrapper for every `ds-*` component.

Three overlay-style components do not fit a raw generated wrapper as the _public_ React API:

- **`ds-modal`**: `open` is a mutable, reflected prop that the component self-mutates on Escape, backdrop click, and the close button. A plain `<DsModal open={isOpen}>` wrapper cannot keep React state in sync unless the consumer remembers to wire `onDsDidDismiss`; if they forget, React re-asserts `open={true}` and the modal silently reopens.
- **`ds-toast` / `ds-snackbar`**: no desync bug, but both are used exclusively through vanilla-JS controllers (`dsToastController` / `dsSnackbarController`). There is no React-idiomatic entry point.

`@ionic/react` solves the same class of problem with a controlled overlay component plus `present`/`dismiss` hooks, without replacing Stencil's generator.

## Decision

Keep generating every wrapper with the stock `@stencil/react-output-target` (no `excludeComponents`). Hand-author a small `packages/react/src/idioms/` layer that is the public API for overlays:

- **`Modal`**: wraps the generated `DsModal` and adds `onOpenChange?: (open: boolean) => void`, fired `false` on `onDsDidDismiss`, so `<Modal open={isOpen} onOpenChange={setIsOpen}>` stays in sync.
- **`useToast()` / `useSnackbar()`**: thin hooks around `dsToastController` / `dsSnackbarController`, returning `[present, dismiss]`.
- **`useModal()`**: scaffolded `[present, dismiss]` hook that will pass a detached element as `ModalOptions.component` once that lands in core ([#2120](https://github.com/baloise/design-system/issues/2120)).

The generated `DsModal`, `DsToast`, `DsSnackbar`, and `DsAlertContainer`
**values** are not re-exported from `@baloise/ds-react`. Generated overlay
_types_ (`DsModalEvents`, etc.) still come through `export type *` so the
rest of the typed barrel stays mechanical. Idiom names are unprefixed
(`Modal`, `useToast`) because the package is already the `ds` namespace.

This is not a custom output target. Generation stays stock; only the public barrel and a handful of authored files change.

## Consequences

- Overlay consumers get a React-idiomatic API instead of fighting mutable `open` or importing vanilla controllers from `@baloise/ds-core`.
- `useToast` / `useSnackbar` must call Stencil's `defineCustomElement()` for the tags their controllers create at runtime. The shared controller hook defines `ds-alert-container` inline, while each public hook defines `ds-toast` or `ds-snackbar` inline. The generated wrappers are `/*@__PURE__*/`, so hiding them from the public barrel would otherwise let consumer bundlers drop the custom-element definitions. The type-specific imports remain separate so each hook tree-shakes independently.
- Adding a new `ds-*` component still only requires the Stencil generator, except that `packages/react/src/components.ts` must list it if it should stay public — unit tests fail when a generated wrapper is neither hidden nor re-exported.
- `useModal()` is not functional until core accepts `ModalOptions.component` (#2120). `Modal`, `useToast()`, and `useSnackbar()` do not depend on that work.
- ADR-0003's "no `libs/output-target-react`" decision remains in force. A future Next.js/SSR wrapper would still need its own design.
