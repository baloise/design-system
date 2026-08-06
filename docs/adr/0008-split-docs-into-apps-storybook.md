# 8. Split `docs/` into `apps/storybook` and `docs/`

Package: `apps/storybook`

`docs/` used to mix two unrelated things: the Storybook app (`.storybook/`, `src/`, `public/`, `dist/`, `package.json`) and internal-only engineering documentation (`adr/`, `agents/`, `plans/`, `security/`, `CONTEXT.md`). We split them: the app moves to `apps/storybook` as a normal workspace package named `storybook`, added via a new `apps/*` glob in `pnpm-workspace.yaml`. `docs/` stays at its current path but becomes a plain (non-package) folder holding only `adr/`, `agents/`, `plans/`, `security/`, and `CONTEXT.md` no longer applies there — `CONTEXT.md` moves with the app to `apps/storybook/CONTEXT.md`.

We kept `docs/` at its existing path (rather than renaming to something like `docs-internal/`) to avoid rewriting every ADR/agent-doc cross-reference, and kept the root `pnpm docs` / `pnpm docs:preview` script names unchanged so the Storybook launch command developers already know keeps working — only the underlying paths change.

## Considered options

- Move internal docs under `apps/storybook/docs` — rejected, since ADRs and agent docs cover the whole design system, not just Storybook.
- Move internal docs to a new top-level `docs-internal/` — rejected, more churn than needed given `docs/` unambiguously means "internal docs" once the app is gone.
