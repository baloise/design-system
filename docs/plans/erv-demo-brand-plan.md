# Plan: First demo brand — ERV

**Milestone:** 🎨 Theming (existing, no new milestone)
**Reference brand site:** https://www.erv.ch/ch/site/de/home.html
**Execution:** entirely human-driven — no agent automation for this ticket.

## Context

The multi-brand pipeline already exists and only has one brand today, `Tcs`
(`packages/tokens/tokens/Tcs.tokens.json`), which is a 15-line stub (only
overrides `White`). ERV is the first **real, complete** brand override — the
goal is to prove the existing pipeline end-to-end (colors → buttons →
typography), not to build new infrastructure.

Existing pipeline (no changes needed):
- `packages/tokens/tokens/<Name>.tokens.json` — sparse brand override file,
  diffed against `Base.tokens.json`.
- `packages/tokens/src/index.ts:26` `const brands = [...]` — build loop; new
  brands are appended here.
- Style Dictionary emits `dist/css/<name>.tokens.css`, scoped under
  `[data-theme="<name>"]`.
- `packages/core/src/global/token-preview.ts` `applyBrand()` — runtime brand
  switch (sets `data-theme`, injects the brand's CSS).
- Storybook's `Theme` global (`apps/storybook/.storybook/preview.ts`) is a
  free-text field that loads `/assets/tokens/${theme}.tokens.css` for whatever
  brand name is typed — **no Storybook code changes are needed** to preview a
  new brand.

## How the brand file gets created

Brand values (colors, font family, button shape/spacing) are **sourced by a
human** from erv.ch and Helvetia's internal ERV style guide — not scraped or
guessed by an agent.

The brand file itself is created via **Toky**
(`apps/toky` — the internal token editor), not by hand-editing JSON, and this
step is done entirely by a human:
- Toky's brand-creation flow writes `Erv.tokens.json` **and** auto-patches
  `packages/tokens/src/index.ts`'s `brands` array in the same PR
  (see `apps/toky/docs/adr/0001-auto-patch-brands-array-on-create.md`) — so
  wiring the brand into the build is not a separate step.
- Toky's Live Preview tab renders the in-progress brand against real
  components before submit.

## Scope

Override only:
1. **Colors** — global palette tokens ERV's brand relies on (primary/accent
   colors used by `Button`'s alias/component tokens).
2. **Button** (`🧩 Component.Button.*` in token terms) — primary/secondary/
   tertiary color and shape tokens
   (`packages/core/src/components/button/button.style.scss`).
3. **Typography** — the two font-family alias tokens only
   (`🔗 Alias.🔤 Text.Family.Heading` / `.Text`), not full type scale
   (sizes/weights/line-heights stay Helvetia's — explicitly out of scope for
   this first demo).

Out of scope: any other component (chips, tabs, links-as-buttons, etc.) —
follow-up work once this pipeline is proven for one brand.

## Definition of done

- [ ] `Erv.tokens.json` created via Toky, with real color, button, and
      typography-family overrides sourced from erv.ch + the internal ERV
      style guide.
- [ ] `packages/tokens/src/index.ts` brands array includes `'Erv'` (handled
      automatically by Toky's submit).
- [ ] **Contrast/WCAG 2.2 AA check** on the new Button colors (text-on-
      background contrast for primary/secondary/tertiary, all interactive
      states). If a sourced color fails AA, flag it back for a value change
      rather than silently adjusting the brand color.
- [ ] New visual test page: `packages/core/src/foundation/theming/erv.visual.html`
      (new `theming/` subfolder — first of its kind), wrapped in
      `data-theme="erv"`, showing a collection of components (at minimum:
      all `ds-button` variants/states, heading, and body text) so the brand
      override is visible in one place.
- [ ] Matching Playwright visual regression test:
      `packages/core/src/foundation/theming/erv.visual.play.ts` (+ generated
      snapshots), following the same pattern as
      `colors.visual.play.ts` / `typography.visual.play.ts`.
- [ ] Manual spot-check: Storybook `Theme` global set to `erv` against a
      handful of existing component stories, confirming colors/buttons/
      typography swap correctly with no visual regressions elsewhere.
- [ ] Changeset entry (`pnpm changeset`) for the new brand + visual test.

## Explicitly not part of this ticket

- No new "💄 Multi-Brand" milestone (folded into existing "🎨 Theming").
- No scraping/automation to extract ERV's brand values — human-sourced.
- No changes to Storybook config/toolbar — the theme switcher is already
  brand-agnostic.
- No type-scale changes, no components beyond Button + typography-family.
