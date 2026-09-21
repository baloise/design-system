# Rename component: ds-date → ds-datepicker

## Context

`ds-date` needs to be renamed to `ds-datepicker` across the whole monorepo — tag, Stencil
class, file/folder names, Playwright page object, Angular wrapper, design tokens, Storybook
docs, integration-test app, and the ADR. This is a **clean breaking rename** (no deprecated
alias/shim for the old tag) — confirmed with the user, since this isn't yet a widely-consumed
release and a shim would double the registration/wrapper surface for no real benefit.

Decisions locked in during grilling:
- **Clean rename**, `ds-date` removed entirely, single major-version changeset.
- Tag/class: **`ds-datepicker` / `DsDatepicker`** (one word, as originally specified — not
  `ds-date-picker` / `DsDatePicker`).
- **Design tokens renamed too**: `--ds-date-*` → `--ds-datepicker-*` in
  `packages/tokens/tokens/Base.tokens.json` (the `com.figma.variableId` extension links by ID,
  not name, so this shouldn't break Figma sync, but worth a sanity check after).
- **ADR renamed and rewritten** (`docs/adr/0001-ds-date-external-datepicker-libraries.md` →
  `0001-ds-datepicker-external-datepicker-libraries.md`, body text updated) — user chose full
  consistency over preserving it as an immutable historical record.
- Per `docs/ARCHITECTURE.md`'s versioning policy, this is a **major** version bump (tag/prop
  rename = breaking change) → needs a changeset.

## Files that are generated — do NOT hand-edit

These regenerate from `pnpm build` / `pnpm tokens` and must not be manually touched (confirmed
via `.gitignore` and `scripts/build-docs.mjs`):
- `packages/core/dist/**`, `packages/core/www/**`, `packages/core/components/**`,
  `packages/core/.stencil/**` (all gitignored)
- `packages/angular/src/generated/**` (proxies.ts, meta.ts — gitignored, produced by Stencil's
  Angular output target during the core build)
- `packages/react/src/generated/**` (gitignored, produced by the React output target)
- `apps/storybook/src/assets/data/{tags,components}.json` (copied from
  `packages/core/docs/*.json` by `scripts/build-docs.mjs`)
- `packages/tokens/dist/**` (gitignored, built from `packages/tokens/tokens/Base.tokens.json`)

One exception: `packages/core/src/components.d.ts` **is tracked in git** despite being
generated — it needs a rebuild (`pnpm --filter @baloise/ds-core build` or `pnpm tokens && pnpm
build`) and the regenerated file committed as part of this change.

## Core component (packages/core)

1. **Rename the folder and all files**: `packages/core/src/components/date/` →
   `packages/core/src/components/datepicker/`, with every `date.*` basename → `datepicker.*`:
   - `date.tsx` → `datepicker.tsx` — rename `@Component({ tag: 'ds-date', ... })` → `tag:
     'ds-datepicker'`, class `DsDate` → `DsDatepicker`, JSDoc references.
   - `date.host.scss` → `datepicker.host.scss` — rename all `--ds-date-*` var references to
     `--ds-datepicker-*`, and the local `date-*` SCSS var names (e.g. `date-trigger-icon-color-hover`
     → `datepicker-trigger-icon-color-hover`) for consistency.
   - `date.interfaces.ts` → `datepicker.interfaces.ts` — rename all exported types (`DateColor`,
     `DateBlurDetail`, `DateChangeDetail`, `DateClickDetail`, `DateFocusDetail`,
     `DateInputDetail`, `DateKeyPressDetail`, `DATE_COLORS`, `DateCustomEvent`, etc.) to their
     `Datepicker*` equivalents.
   - `date.mask.ts` → `datepicker.mask.ts`, `date.picker.ts` → `datepicker.picker.ts` (rename
     `DatePickerController` → `DatepickerController`), `date.i18n.ts` → `datepicker.i18n.ts`.
   - `test/date.*.ts` → `test/datepicker.*.ts` (`.a11y.play.ts`, `.component.play.ts`,
     `.visual.play.ts`, `.mask.spec.ts`, `.picker.spec.ts`), `test/date.visual.html` →
     `test/datepicker.visual.html`.
   - Visual snapshot baselines in `test/date.visual.play.ts-snapshots/` → move/rename into
     `test/datepicker.visual.play.ts-snapshots/` with filenames updated to match the new test
     file's auto-generated snapshot names (Playwright derives snapshot names from the spec
     filename + test title). After the rename, run the visual suite to confirm baselines
     match, or use the `ds-update-screenshots` skill to re-baseline if pixel names/paths shift.
2. Update all in-repo importers of the old paths/names — grep for `from '.*components/date` and
   `DsDate\b` after the rename to catch stragglers (e.g. any cross-component imports, though none
   were found besides the component's own files during exploration).
3. `packages/core/src/global/constants/tags.constant.ts` — replace `"ds-date"` with
   `"ds-datepicker"` in the tag list; re-check alphabetical ordering if the list is sorted.
4. `packages/core/CONTEXT.md` — rename the `## Date Field (ds-date)` section heading and body
   references to `ds-datepicker`; update the ADR link path if the ADR file is renamed (see below).
5. `packages/core/src/playground.html` — update the `<ds-date>` usage example.
6. `packages/core/src/components/select/test/select.visual.html` — check the one `ds-date`-ish
   reference found there (likely incidental/unrelated text) and confirm before touching.

## Design tokens (packages/tokens)

7. `packages/tokens/tokens/Base.tokens.json` — rename the top-level `"Date"` token group to
   `"Datepicker"` (and its nested keys stay structurally the same, e.g. `Datepicker.Calendar.Weight`,
   `Datepicker.Color.CurrentDate`), which will flow through the token build to rename the
   generated `--ds-date-*` CSS variables to `--ds-datepicker-*`. Run `pnpm tokens` after to
   regenerate `packages/tokens/dist/**` and confirm the new variable names, then verify
   `datepicker.host.scss` (step 1) references match exactly.

## Playwright page object (packages/playwright)

8. `packages/playwright/src/lib/components/date.po.ts` → `datepicker.po.ts` — rename class
   `DsDate` → `DsDatepicker`. The barrel `packages/playwright/src/lib/components/index.ts`
   already does `export * from './date.po'` → update to `'./datepicker.po'`; no other barrel
   changes needed since it's a wildcard re-export.
9. Grep `packages/playwright` for any other `DsDate`/`ds-date` references (locators, comments)
   missed by the file rename.

## Angular wrapper (packages/angular)

10. `packages/angular/src/forms/ds-date.ts` → `ds-datepicker.ts` — rename class `DsDate` →
    `DsDatepicker`, selector `'ds-date'` → `'ds-datepicker'`, and update references to
    `DsDateInputs`/`DsDateOutputs`/`HTMLDsDateElement` to their generated `Datepicker`
    equivalents (these come from the regenerated `packages/angular/src/generated/*` files, so
    just match the new generated names — rebuild core first to see them).
11. `packages/angular/src/index.ts` — update `export { DsDate } from './forms/ds-date'` →
    `export { DsDatepicker } from './forms/ds-datepicker'`.

## Consumers / apps

12. `apps/integration-angular/src/app/date-demo/` → rename directory to `datepicker-demo/`,
    rename `date-demo.ts`/`date-demo.html` → `datepicker-demo.ts`/`datepicker-demo.html`,
    update selector `app-date-demo` → `app-datepicker-demo`, and update wherever this component
    is registered/routed (check the app module/routes for `DateDemo` references).
13. `apps/integration-angular/e2e/date.spec.ts` → `datepicker.spec.ts` — update test content,
    the imported page object, and any `ds-date` selectors.

## Storybook docs (apps/storybook)

14. `apps/storybook/src/components/date/` → `apps/storybook/src/components/datepicker/`:
    - `date.stories.ts` → `datepicker.stories.ts`, `date.doc-config.ts` →
      `datepicker.doc-config.ts` — update `section: 'Components / Forms / Date'` →
      `'Components / Forms / Datepicker'`, all `storyId` strings (`components-forms-date-*` →
      `components-forms-datepicker-*`), and exported symbol names (`getDateTabs` →
      `getDatepickerTabs`, `DATE_TAB_TITLES` → `DATEPICKER_TAB_TITLES`, etc.).
    - `1-Overview.mdx` .. `6-Testing.mdx` — update all `ds-date` code samples and prose
      (`2-Usage.mdx`, `5-Accessibility.mdx` had direct hits; check all six for incidental refs).
15. `apps/storybook/src/components/00-overview.mdx` — update the `<ds-date value="...">` example
    (line ~304) to `<ds-datepicker>`.

## ADR

16. `docs/adr/0001-ds-date-external-datepicker-libraries.md` → rename to
    `docs/adr/0001-ds-datepicker-external-datepicker-libraries.md`, update the title and all
    body references from `ds-date` to `ds-datepicker`.
17. Check `docs/adr/0003-ds-react-no-custom-output-target.md` and
    `docs/adr/0006-ds-angular-uses-stock-output-target.md` for any `ds-date`-specific mentions
    (grep showed they matched only generically, likely just "date" or unrelated — verify and
    update if a direct reference exists).

## Integration guide

18. `AEM-with-DS.md` — update all `ds-date` references (component tag, code samples like
    `<ds-date invalid-text>`, `querySelectorAll('[data-cmp-is="adaptiveFormDatePicker"]
    ds-date')`, the `datepicker.html` Sling override discussion) to `ds-datepicker`.

## Misc plan docs

19. Check `docs/plans/angular-forms-docs-plan.md`, `docs/plans/contact-form-template-plan.md`,
    `docs/plans/ds-input-phone-plan.md` — these are prior planning docs that reference `ds-date`
    incidentally as an example of an existing component; low priority, update only if a quick
    grep pass is cheap (these are historical planning artifacts, similar to ADRs — spot check
    rather than exhaustively rewrite).

## Changeset

20. Run the `ds-changeset` skill / `pnpm changeset` to add a **major** changeset describing the
    breaking rename of `ds-date` to `ds-datepicker` (tag, class, CSS variables all changed).

## Verification

1. `pnpm --filter @baloise/ds-core build` (or `pnpm tokens && pnpm build`) — confirms the
   Stencil component compiles under the new tag/class name, regenerates
   `packages/core/src/components.d.ts`, `packages/angular/src/generated/*`,
   `packages/react/src/generated/*`, and `packages/core/docs/*.json`.
2. `pnpm --filter @baloise/ds-angular build` and `pnpm --filter @baloise/ds-react build` —
   confirm the framework wrappers compile against the renamed generated types.
3. `pnpm test` — run Vitest unit tests (`datepicker.mask.spec.ts`, `datepicker.picker.spec.ts`).
4. `pnpm play -- --grep="datepicker"` — run the renamed Playwright component/a11y/visual specs;
   expect visual tests to need re-baselining (see step 1 above) — use `ds-update-screenshots` if
   snapshots don't match after confirming the rename didn't change rendered pixels.
5. `pnpm docs` — start Storybook, navigate to the renamed "Components / Forms / Datepicker"
   section, confirm all six subpages render and the live component works (calendar opens, date
   picking, clear button, keyboard interaction).
6. Grep the whole repo for leftover `ds-date\b` and `DsDate\b` (excluding the ADR's renamed
   file, `node_modules`, and build output dirs) to catch anything missed.
