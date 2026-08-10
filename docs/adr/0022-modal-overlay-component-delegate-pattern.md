# 22. Re-introduce a component-overlay pattern for ds-modal, scoped per instance

Package: `packages/core`, `packages/angular`

Date: 2026-08-10

## Status

Accepted

## Context

The pre-rebrand `bal-modal` supported an Ionic-style "component overlay":
`ModalOptions.component`/`componentProps` let a caller dynamically mount an
arbitrary framework component inside the modal, with a `FrameworkDelegate`
(`attachViewToDom`/`removeViewFromDom`) doing the framework-specific
instantiation so `packages/core` itself stayed framework-agnostic. The
Angular delegate (`packages/angular`'s old `BalModalService`) used
`ComponentFactoryResolver`, deprecated and effectively unusable on current
Angular. Its `dismiss(data)` was also a global top-of-stack dismiss
(`OverlayBaseController` tracked one overlay stack and closed whichever
overlay was on top), not scoped to the specific modal instance that called
it — safe with one modal on screen, wrong with nested/concurrent modals.

The current `ds-modal`/`ModalController` (`packages/core/src/components/modal/`)
has neither concept: it only creates a bare, slot-based element. Rebuilding
Angular modal support meant deciding whether to reintroduce component
injection at all, and if so, whether it belongs in `packages/core` (reusable
by other framework packages later) or is Angular-only, and how to fix the
scoped-dismiss bug rather than carry it forward.

Considered alternatives:

- A slot/template-only wrapper (no dynamic component instantiation) —
  smaller, but doesn't support the `create(component, props)` idiom the old
  app and Angular Material's `MatDialog` both use, and isn't reusable by
  future framework packages the same way.
- Keeping the component/delegate machinery entirely inside `packages/angular`
  — smaller diff now, but React/Vue integrations would each reinvent the
  same contract independently later.

## Decision

Re-add `ComponentRef`/`FrameworkDelegate` to `packages/core`'s
`ModalOptions`/`ModalController` (adapted for `ds-modal`'s shadow DOM: a
delegate mounts into a light-DOM container slotted into the modal, not
directly into the shadow root — the old non-shadow `bal-modal` didn't need
this). `packages/angular` supplies the Angular delegate, using
`ViewContainerRef.createComponent()` instead of the deprecated
`ComponentFactoryResolver` — the same fix modern `@ionic/angular` and
Angular Material's `MatDialog` (`ComponentPortal` +
`ViewContainerRef.createComponent()`) both made.

Dismissal and data flow are scoped per instance instead of via a global
stack: `create()` returns a modal ref specific to that presentation, and
that same ref (mirroring Angular Material's `MatDialogRef`) is provided via
Angular DI into the mounted component, so it can only dismiss itself.
Inbound `componentProps` are likewise delivered via a DI injection token
(mirroring `MAT_DIALOG_DATA`), not `Object.assign`-ed onto the instance.

## Consequences

- `packages/core`'s `ModalOptions`/`ModalController` grow a component/
  delegate surface again, reusable by future React/Vue modal integrations
  instead of each reinventing it.
- `packages/angular` gains a hand-authored `providers/` layer, not just
  `index.ts` — see the "Generated vs. authored code" section in
  [`packages/angular/CONTEXT.md`](../../packages/angular/CONTEXT.md), which
  needs updating alongside this work.
- Old `bal-modal`-era call sites (`modalService.dismiss(data)` from inside
  the opened component) are not source-compatible — they must switch to
  `dismiss(data)` on the injected modal ref instead.
