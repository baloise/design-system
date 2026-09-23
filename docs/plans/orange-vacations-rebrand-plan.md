# Plan: Rename brand `ERV` → `OrangeVacations`

**Milestone:** 🎨 Theming (existing, no new milestone)
**Execution:** mechanical rename, single atomic change (one PR, no phasing)

## Context

This repository is public. The only real brand implemented in the
multi-brand token pipeline today is `ERV` (Helvetia's ERV insurance brand),
and its real name appears throughout source code, filenames, CSS output,
Storybook UI, and docs. That exposes which companies are Helvetia's brand
partners — a confidentiality concern, not a style preference.

**New naming convention (applies to this and future brands):** real brand
names are replaced with a fictional company name in the pattern
`{color matching the brand's primary color} + {unrelated generic word}`.
The color and word are chosen manually by judgment (no algorithm) — picked
so the result reads as a plausible real company from an industry unrelated
to insurance, avoiding any accidental resemblance to the real partner.

**This rename:** `ERV` → `OrangeVacations`
- `OrangeVacations` — PascalCase, for token filenames and the `brands` array
- `orange-vacations` — kebab-case, for CSS output, npm export paths, and
  `data-theme` attribute values
- `Orange Vacations` — display label with a space, for UI text
  (Storybook theme switcher title, prose)

Rewriting already-published git history (past commits, merged PRs, closed
issues that mention "ERV") is **out of scope** for this plan — flagged here
as a follow-up for legal/security to decide on separately, since rewriting
public git history is a distinct, high-risk operation.

## Scope

### Token source & build
- [ ] Rename `packages/tokens/tokens/ERV.tokens.json` →
      `packages/tokens/tokens/OrangeVacations.tokens.json`
- [ ] `packages/tokens/src/index.ts`: `brands` array entry `'ERV'` →
      `'OrangeVacations'`
- [ ] `packages/tokens/package.json`: exports `./css/erv`,
      `./css/erv-override` → `./css/orange-vacations`,
      `./css/orange-vacations-override` (clean break — no deprecation
      alias kept for the old `erv` export path; no changeset entry)
- [ ] Rebuild so generated CSS regenerates under the new names in
      `packages/tokens/dist/`, `packages/core/www/assets/tokens/`, and
      `apps/storybook/public/assets/css/` (no hand-editing generated
      output)
- [ ] Update all `data-theme="erv"` references to `data-theme="orange-vacations"`

### Storybook
- [ ] `apps/storybook/.storybook/addons/theme.addon.tsx` — theme switcher
      entry (`id: 'erv'` → `'orange-vacations'`, `title: 'ERV'` →
      `'Orange Vacations'`; keep existing color `#f19654`, already an
      orange)
- [ ] `apps/storybook/src/development/00-guides/06-theming.mdx`
- [ ] `apps/storybook/src/development/00-guides/00-getting-started.mdx`
- [ ] `apps/storybook/src/components/structure/table/ag-grid.stories.ts`

### Toky (internal token editor)
- [ ] `apps/toky/src/tokens/brand.ts` — comment/example references
- [ ] `apps/toky/src/tokens/github-write.ts` — comment references
- [ ] `apps/toky/src/tokens/css-preview.test.ts` — comment references
- [ ] `apps/toky/CONTEXT.md`
- [ ] `apps/toky/docs/adr/0001-auto-patch-brands-array-on-create.md`

### ADRs
- [ ] `docs/adr/0012-brand-modes-not-collections.md`
- [ ] `docs/adr/0030-full-merge-brand-token-css.md`
- [ ] `docs/adr/0014-git-data-api-atomic-commits.md`
- [ ] `packages/tokens/docs/adr/0002-brand-modes-not-collections.md`
- [ ] `packages/tokens/docs/adr/0004-git-data-api-atomic-commits.md`

### Plan docs
- [ ] Rename `docs/plans/erv-demo-brand-plan.md` →
      `docs/plans/orange-vacations-demo-brand-plan.md`, update contents
      (including the `erv.visual.html` / `erv.visual.play.ts` planned
      filenames → `orange-vacations.visual.html` /
      `orange-vacations.visual.play.ts`; these files don't exist yet, so
      no filesystem rename needed there, only the plan text)
- [ ] Update passing mentions in: `docs/plans/device-token-layer-plan.md`,
      `docs/plans/border-token-type-plan.md`,
      `docs/plans/font-weight-token-type-plan.md`,
      `docs/plans/toky-token-description-plan.md`,
      `docs/plans/toky-live-token-preview-plan.md`,
      `packages/tokens/docs/figma-token-sync-plugin-plan.md`

### Other docs & config
- [ ] `packages/tokens/CONTEXT.md`
- [ ] `packages/ag-grid/CONTEXT.md`
- [ ] `.claude/skills/ds-token-lint/SKILL.md`
- [ ] `.claude/skills/ds-token-lint/REFERENCE.md`
- [ ] `.claude/skills/ds-token-lint/README.md`
- [ ] `.github/ISSUE_TEMPLATE/theme_report.yml`
- [ ] `scripts/figma-sync/lib/write.mjs`

### Unreleased changesets
- [ ] `.changeset/toky-update-next-1789388979378.md`
- [ ] `.changeset/toky-update-next-1789389656337.md`
- [ ] `.changeset/toky-update-next-1789389881532.md`

  These are not yet released, so rewrite their content ("create erv
  brand" / "Created brand: ERV") to reference OrangeVacations rather than
  leaving them as a historical record.

## Verification

- [ ] `pnpm build` (tokens + styles) succeeds and produces
      `orange-vacations.tokens.css` / `orange-vacations.override.css`
      with no `erv`-named output remaining
- [ ] `pnpm test` passes (`apps/toky/src/tokens/css-preview.test.ts` and
      any other affected unit tests)
- [ ] Storybook theme switcher: selecting "Orange Vacations" applies
      `data-theme="orange-vacations"` and correct brand colors/typography,
      matching prior `erv` behavior
- [ ] Repo-wide case-insensitive search for standalone `erv` (excluding
      `node_modules`, `dist`, `.next`, `.turbo`, `.git`, and false-positive
      substring matches like "server"/"overview") returns no remaining
      hits in source, docs, or config

## Explicitly not part of this plan

- No rewriting of published git history (past commits/PRs/issues
  mentioning "ERV") — flagged separately for legal/security follow-up.
- No deprecation shim for the old `./css/erv` export — clean breaking
  removal.
- No changeset entry for this rename.
- No change to the actual brand color values, only names/identifiers.
