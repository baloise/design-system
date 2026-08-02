# Plan: move the Storybook app to `apps/storybook`

Status: ready for implementation. Nothing in this plan has been implemented or committed yet.

Related decision: [ADR-0008](../adr/0008-split-docs-into-apps-storybook.md)

## Scope

Split the current `docs` workspace package into two things:

- **`apps/storybook`** — the Storybook app itself: `.storybook/`, `src/`, `public/`,
  `package.json` (renamed `storybook`), `eslint.config.ts`, `tsconfig.json`,
  `CONTEXT.md`, `.gitignore`.
- **`docs/`** — stays at its current path, stops being a pnpm package (no more
  `package.json`), and keeps only `adr/`, `agents/`, `plans/`, `security/`.

Out of scope: renaming the `pnpm docs` / `pnpm docs:preview` script commands
(kept as-is on purpose — see ADR-0008), moving/rewriting any content inside
`docs/src/**` (moves verbatim, no restructuring of stories/MDX), and touching
generated build output (`docs/dist`, `docs/public/build` — left behind, will
regenerate fresh under `apps/storybook/dist`).

## Steps

1. **Workspace registration**
   - Add `apps/*` to the `packages:` list in `pnpm-workspace.yaml`.

2. **Move the app** (use `git mv` to preserve history)
   - `docs/.storybook` → `apps/storybook/.storybook`
   - `docs/src` → `apps/storybook/src`
   - `docs/public` → `apps/storybook/public`
   - `docs/package.json` → `apps/storybook/package.json`
   - `docs/eslint.config.ts` → `apps/storybook/eslint.config.ts`
   - `docs/tsconfig.json` → `apps/storybook/tsconfig.json`
   - `docs/CONTEXT.md` → `apps/storybook/CONTEXT.md`
   - `docs/.gitignore` → `apps/storybook/.gitignore`
   - Leave `docs/dist`, `docs/node_modules`, `docs/.turbo` behind (build/cache
     output — do not move, will regenerate or get pruned).

3. **Rename the package**
   - In `apps/storybook/package.json`, change `"name": "docs"` → `"name": "storybook"`.

4. **Update `scripts/build-docs.mjs`**
   - Change `docsRoot = resolve(__dirname, '../docs')` →
     `resolve(__dirname, '../apps/storybook')`.

5. **Update root `package.json`**
   - `docs` / `docs:preview` / `build` scripts: keep the script *names*, update
     the paths inside them (`docs/.storybook` → `apps/storybook/.storybook`,
     `docs/dist` → `apps/storybook/dist`).

6. **Update `vercel.json`**
   - `outputDirectory`: `docs/dist` → `apps/storybook/dist`.

7. **Update root `.gitignore`**
   - Rewrite every `docs/...` entry that refers to app content (public/assets,
     dist, src/assets/data, src/components/**/api.md, etc.) to
     `apps/storybook/...`. Leave entries that refer to the remaining internal
     docs folder (if any) untouched.

8. **Update `cspell.json`**
   - `files` glob: `docs/src/**/*.{md,mdx}` → `apps/storybook/src/**/*.{md,mdx}`.
   - Ignore paths `docs/public/*`, `docs/assets/*` → `apps/storybook/public/*`,
     `apps/storybook/assets/*`.

9. **Update CI**
   - `.github/workflows/actions/upload-distribution-archives/action.yml`:
     the `docs` archive step's `output: docs/dist.zip` and `paths: docs/src`
     → `apps/storybook/dist.zip` / `apps/storybook/src`.

10. **Update top-level documentation**
    - `ARCHITECTURE.md`: workspace tree comment (`docs/  # Storybook
      documentation...`) and the `docs/src/components/<name>/` reference in
      the new-component checklist → `apps/storybook/...`.
    - `DEVELOPMENT.md`: `docs/src/components/<component>/` reference →
      `apps/storybook/src/components/<component>/`.
    - `STYLE_GUIDE.md`: links to `docs/src/contributing/10-style-guide.mdx` →
      `apps/storybook/src/contributing/10-style-guide.mdx`.
    - `CLAUDE.md`: add `apps/storybook/CONTEXT.md` to the "Current packages
      with CONTEXT.md" list under Domain docs.

11. **Verify**
    - `pnpm install` (picks up the new workspace package).
    - `pnpm docs` — confirm Storybook still boots from the new location.
    - `pnpm build` — confirm `build-docs.mjs` still assembles
      `apps/storybook/dist` correctly.
    - `pnpm lint` — confirm eslint/cspell configs still resolve correctly
      against the new path.
    - Grep the repo for any remaining bare `docs/` path references this plan
      missed (component MDX cross-links, snippets, etc.) before considering
      the move complete.
