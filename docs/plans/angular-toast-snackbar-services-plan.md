# Plan: Angular toast & snackbar services

GitHub issue: [#2320](https://github.com/baloise/design-system/issues/2320) (milestone `✏️ Angular Forms & Services` / #8)

## Context

`packages/core/src/components/overlays/alert/` already has `ds-toast`, `ds-snackbar`, a shared `ds-alert-container`, and an `AlertController` (`dsToastController`/`dsSnackbarController`, both built from a shared `createAlertController(type)` factory: `create(options): Promise<string | undefined>`, `remove(id)`, `removeAll()`). None of this — the controllers or the `Alert` type — is exported from `packages/core/src/index.ts` yet, so `packages/angular` can't consume any of it today.

The old, deprecated `@baloise/ds-angular` had `BalToastService`/`BalSnackbarService` in `src/providers/`, each a thin wrapper around a per-type controller injected via an `InjectionToken` (`BalTokenToast`/`BalTokenSnackbar`), exposing `create(options): Components.BalToast` (**synchronous**, returned the element itself) and `dismissAll(): Promise<void>`.

Unlike the modal work ([#2119](https://github.com/baloise/design-system/issues/2119)), this needs no component-overlay/`ComponentRef`/DI-scoped ref machinery — toast/snackbar only ever render fixed `heading`/`message`/`color`-style props, never an arbitrary mounted component. So there's no ADR here; this is a plain singleton-wrapping service, same category as the other hand-authored code already in `src/index.ts` per `packages/angular/CONTEXT.md`.

## Decisions

- **One ticket**, not a 3-issue split like #2119/#2120/#2121/#2122 — the core change is export-only, no new controller/component logic.
- **Two services**, not one generic `DsAlertService` — mirrors the old two-class shape and core's own two singleton instances.
- **Direct import of the core singleton**, no `InjectionToken` — nothing Angular-specific to substitute; a consumer's own component that uses the service can still be tested by mocking `DsToastService`/`DsSnackbarService` via Angular's `TestBed`.
- **`create()` resolves the id** (`Promise<string | undefined>`), matching the core controller 1:1, rather than resolving the element — the core API is already async/id-based, not something this ticket should re-shape.
- **`dismiss(id)` / `dismissAll()`** naming (not `remove`/`removeAll`) so both read as the same verb, even though they forward to core's differently-named `remove`/`removeAll`.
- **`Alert` type used directly**, no `DsToastOptions`/`DsSnackbarOptions` aliases — core already unified the shape for both.
- No explicit `defineCustomElement()` calls in the services — `packages/angular/src/index.ts` re-exporting `generated/proxies.ts` already registers `ds-toast`/`ds-snackbar`/`ds-alert-container` as a side effect of `ProxyCmp()`.

## Work items

1. **Core** (`packages/core/src/index.ts`): export `dsToastController`, `dsSnackbarController`, `AlertController`, `Alert`.
2. **Angular** (`packages/angular/src/providers/`):
   - `toast.service.ts` — `DsToastService`
   - `snackbar.service.ts` — `DsSnackbarService`
   - Each: `create(options: Alert): Promise<string | undefined>`, `dismiss(id: string): Promise<void>`, `dismissAll(): Promise<void>`.
   - Re-export both from `packages/angular/src/index.ts`.
3. **Docs**: update `packages/angular/CONTEXT.md`'s "Generated vs. authored code" section — resolve the "planned" `src/providers/` forward-reference, describe the singleton-wrapping pattern.
4. **Verification**: `apps/integration-angular/src/app/toast-demo/` + `snackbar-demo/`, plus `e2e/toast.spec.ts` + `e2e/snackbar.spec.ts`, following the existing per-component demo+e2e convention. No unit tests in `packages/angular` (per its own CONTEXT.md — verified via the integration app instead).
5. **Changesets**: one for `@helvetia-design/core` (new exports), one for `@helvetia-design/angular` (new services).

## Out of scope

- No `DsToastRef`/`DsSnackbarRef`, no DI data-injection token — no arbitrary component mounting to scope.
- No new ADR.
