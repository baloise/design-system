# Component Audit Plan

This file is the reusable checklist for auditing a rewritten `ds-*` component in `packages/core/src/components/<name>` (on `next`) against its legacy `bal-*` equivalent on `origin/main` — the LTS, currently-published Baloise Design System.

Use this as the source when creating a per-component audit issue with `gh issue create` (see [Creating the Issue](#creating-the-issue) below). Issues are created one component at a time, on request — not bulk-generated.

## Background

- `origin/main` = LTS = the published Baloise DS, components prefixed `bal-*` (e.g. `bal-accordion`).
- `next` (this repo's default working branch lineage) = the rewrite, components prefixed `ds-*`, living in `packages/core/src/components/<name>`.
- The mapping between old and new components is **not 1:1**. Some old components were merged, renamed, or dropped (e.g. `bal-dropdown`, `bal-field`, `bal-option`, `bal-option-list`, `bal-popover`, `bal-tooltip`, `bal-snackbar`, `bal-sheet`, `bal-stage`, `bal-notices`, `bal-nav`, `bal-input-group`, `bal-input-stepper` have no obvious single `ds-*` counterpart). There is no pre-built mapping table — each issue's assignee identifies the closest LTS equivalent(s) themselves and notes the mapping inline.
- All checks below are performed by a **human**. An AI agent may pre-fill research (e.g. diffing docs against props) but does not perform the visual check, monkey testing, or token scan itself.

## Checklist (per component)

### 1. Docs correctness

Scope: Storybook MDX subpages (Overview, Usage, Variants, Styling, Accessibility, Testing), `apps/storybook/src/components/<name>/<name>.stories.ts` and `<name>.doc-config.ts`, and JSDoc comments on `@Prop()` / `@Method()` / `@Event()` in `packages/core/src/components/<name>/<name>.tsx`.

- [ ] Every documented prop/slot/event/method exists in the current `.tsx` and behaves as described.
- [ ] No documented prop/slot/event/method has been removed or renamed without the docs being updated.
- [ ] Code samples in Usage/Variants pages run and produce the described result.
- [ ] JSDoc comments in the `.tsx` are accurate and match the generated docs.

### 2. Use-case parity vs LTS

- [ ] Identify the closest `bal-*` equivalent(s) in `origin/main` (`git show origin/main:packages/core/src/components/bal-<name>` or browse the LTS Storybook). Note the mapping in the issue (1:1, merged from N old components, or "no clear LTS equivalent").
- [ ] List every distinct use-case/variant the LTS component supports (props, slots, state combinations demonstrated in its stories).
- [ ] Confirm each LTS use-case has an equivalent story/doc entry in the new `ds-*` component, or explicitly note it as intentionally dropped/changed.

### 3. Manual visual check

- [ ] Run Storybook (`pnpm docs`) and open every story for the component.
- [ ] Visually confirm each variant renders correctly: layout, spacing, color, typography, icons.
- [ ] Check both light/dark or brand modes if the component supports them.

### 4. Monkey testing

Fixed exploratory checklist, applied per component (skip items that don't apply to a given component type, e.g. non-interactive components skip keyboard/focus items):

- [ ] Keyboard-only navigation (Tab/Shift+Tab, Enter/Space, Arrow keys where applicable) — no traps, logical order.
- [ ] Resize viewport across 320px–2560px — no overflow, breakage, or clipping.
- [ ] Browser zoom to 200% — content remains usable.
- [ ] Rapid/repeated interaction (double-click, spam-click, rapid open/close) — no stuck states or duplicate events.
- [ ] Focus handling on open/close (modals, popups, drawers) — focus moves in and returns correctly.
- [ ] Long/overflowing text and paste input — no layout breakage.
- [ ] RTL if the component supports it.

### 5. Token audit

- [ ] Open every `.scss` file in `packages/core/src/components/<name>/`.
- [ ] Manually scan each `var(--ds-...)` usage.
- [ ] Confirm every reference is to an alias token (`--ds-alias-*`) or a component-layer override (`--ds-<component>-*`) — flag any direct `--ds-global-*` usage as a finding.

## Creating the Issue

When asked to create the audit issue for a specific component:

1. Use the `🧪 test` issue template (`.github/ISSUE_TEMPLATE/test_report.yml`).
2. Title: `:test_tube: test(<name>): audit docs, use-case parity, visuals, and tokens`
3. Summary: one line naming the component and referencing this file.
4. Acceptance Criteria: the five checklist sections above, expanded into their individual checkboxes.
5. Labels: `🧪 test` (template default) + `ready-for-human`.

```bash
gh issue create \
  --title ":test_tube: test(<name>): audit docs, use-case parity, visuals, and tokens" \
  --label "🧪 test,ready-for-human" \
  --body-file <path-to-filled-checklist>.md
```
