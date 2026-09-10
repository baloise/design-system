# React idioms for `ds-modal`

## Context

`@baloise/ds-react` (`packages/react`) is currently a pure pass-through:
every `ds-*` component gets a generated wrapper via
`@stencil/react-output-target`, per
[ADR-0003](../adr/0003-ds-react-no-custom-output-target.md) ("no custom
output-target logic needed for React"). `ds-modal` doesn't fit a raw
generated wrapper cleanly, for two separate reasons confirmed by reading
`packages/core/src/components/modal/modal.tsx` and `modal.controller.ts`:

1. **Controlled-prop desync.** `open` is `@Prop({ reflect: true, mutable:
   true })`, and the component self-mutates it (`this.open = false`) on
   Escape, backdrop click, and the close button (`modal.tsx:159,173,236`). A
   consumer doing `<Modal open={isOpen}>` has no way to learn the DOM state
   changed unless they manually wire `onDsDidDismiss` to update their own
   state. If they forget, React re-asserts `open={true}` on the next
   re-render and the modal silently reopens — a classic controlled-component
   fight.
2. **No content-injection path for the imperative controller.**
   `dsModalController.create()` (`modal.controller.ts`) does
   `document.createElement('ds-modal')` and appends it to the app root,
   entirely outside React's tree. There is currently no way for a React
   consumer to put JSX content into a modal opened this way.

Reference: `@ionic/react` solves the same class of problem with
`createControlledComponent` (for prop desync) and `useIonModal` (a hook
wrapping their vanilla modal controller with a React portal for content).
This plan adapts that pattern to `ds-modal`'s actual behavior.

## Dependency: ADR-0022 / issue #2120

[ADR-0022](../adr/0022-modal-overlay-component-delegate-pattern.md)
(accepted, `packages/core`) already decided that `ModalOptions`/
`ModalController` will grow a generic `component`/`componentProps`/
`delegate` mechanism for mounting arbitrary framework content in a modal,
motivated by rebuilding Angular's modal service. Tracked in:

- [#2119](https://github.com/baloise/design-system/issues/2119) — parent
- [#2120](https://github.com/baloise/design-system/issues/2120) — Core:
  `ModalOptions.component`/`componentProps`, `FrameworkDelegate`
- [#2121](https://github.com/baloise/design-system/issues/2121) — Angular:
  `DsModalService`/`DsModalRef`/`DS_MODAL_DATA`

None of this is implemented yet (verified: no `FrameworkDelegate`/
`ComponentRef` anywhere in `packages/core/src`, no `packages/angular` modal
folder exists).

**Key finding**: the React side of this does *not* need a custom
`FrameworkDelegate`. Studying Ionic's own implementation
(`packages/react/src/hooks/useOverlay.ts` in `ionic-team/ionic-framework`)
shows their `useOverlay` just creates a detached `<div>`, passes it as
`options.component` (a plain `HTMLElement`), and portals its own React tree
into that div — relying entirely on core's *no-delegate fallback* path,
which already knows how to append a raw `HTMLElement`. Per #2120's
acceptance criteria, our core's no-delegate fallback will do the same
(`slot = 'body'` set automatically before appending an `HTMLElement`). So
`useModal` is blocked on #2120 landing `ModalOptions.component`, but
requires zero custom delegate code on the React side once it does.

## Decisions (confirmed)

1. Both a controlled `<Modal>` component and a `useModal()` hook are in
   scope (matching Ionic's `IonModal`/`useIonModal` split).
2. A new ADR (`docs/adr/0027-react-idioms-for-overlay-components.md`)
   supersedes ADR-0003, documenting this hand-authored-idioms exception.
3. The raw generated `Modal` wrapper is **not** part of the public
   `@baloise/ds-react` API — only the idiomatic `Modal`/`useModal` are
   exported.
4. Naming: plain names (`Modal`, `useModal`), no `Ds` prefix — the whole
   package is already the `ds` namespace.

## Implementation

### File layout

```
packages/react/src/
  generated/components.ts   # unchanged — still generates the raw ds-modal binding internally
  idioms/
    modal.tsx                # Modal (controlled) + useModal (hook)
  index.ts                   # re-exports everything from generated/components except Modal; exports idioms/modal.tsx's Modal + useModal instead
```

Do **not** use Stencil's `excludeComponents` in
`packages/core/config/stencil.bindings.react.ts` — the generator keeps
producing the raw `Modal` binding (needed internally by `idioms/modal.tsx`),
it's just not re-exported from `packages/react/src/index.ts`.

### A1 — `<Modal>` controlled component (buildable now, no core dependency)

`packages/react/src/idioms/modal.tsx`: wraps the generated `Modal` (imported
directly from `../generated/components`, not re-exported) with a new
`onOpenChange?: (open: boolean) => void` prop. Listens to `onDsDidDismiss`
(already emitted by `modal.tsx`'s `doClose()`) and calls
`onOpenChange?.(false)` in addition to forwarding any consumer-supplied
`onDsDidDismiss`. `<Modal open={isOpen} onOpenChange={setIsOpen}>` now stays
in sync when the user dismisses via Escape/backdrop/close button.

All other props pass through unchanged (`modalWidth`, `closable`, all `ds*`
events, children for `slot="header"|"body"|"actions"` via the existing
generated `ModalHeader`/`ModalBody` wrappers, which are unaffected by this
change and stay ordinary pass-throughs).

### A2 — `useModal()` hook (blocked on #2120)

Same file, `useModal()` returns `[present, dismiss]`:

- `present(content: ReactNode, options?: Omit<ModalOptions, 'component' | 'componentProps'>)`
  — creates a detached `document.createElement('div')`, renders `content`
  into it via `createRoot(container).render(content)` (React 18/19 API,
  matches the `react-dom` peerDependency range already declared in
  `packages/react/package.json`), then calls `dsModalController.create({
  ...options, component: container })` (imported from `@baloise/ds-core`,
  already publicly exported via `packages/core/src/index.ts`). Registers a
  one-time `dsDidDismiss` listener on the returned element to unmount the
  React root and detach the container.
- `dismiss(data?, role?)` — calls `.dismiss(data, role)` on the tracked
  element (per #2120, `dismiss` gains a `data`/`role` payload — write this
  against that new signature).

Scaffold this now, but it is **only functional once #2120 ships**
`ModalOptions.component`. Note this explicitly in the file (a code comment)
and keep it out of any "done" verification until #2120 lands.

## Verification

- `pnpm --filter @baloise/ds-react build` (plain `tsc`) compiles cleanly.
- Manual check in `apps/integration-react`: a page using `<Modal
  open={isOpen} onOpenChange={setIsOpen}>` with a controlled toggle button;
  confirm pressing Escape/backdrop/close syncs the button's state (no
  reopen-on-rerender).
- `useModal` verification is deferred until #2120 lands.

## Execution order

1. `idioms/` directory + `index.ts` export changes + `packages/react/CONTEXT.md`
   update + ADR-0027 (shared with the toast/snackbar plan — do once).
2. A1 (`<Modal>`) — ships independently now.
3. A2 (`useModal`) — scaffold now, functional once #2120 lands.
