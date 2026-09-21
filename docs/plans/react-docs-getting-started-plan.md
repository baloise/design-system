# Plan: Improve React Getting Started docs in Storybook

## Context

Milestone **⚛️ React Integration** (#21) tracks work improving `@baloise/ds-react`: SSR support for Next.js (#2220–#2223) and overlay-component idioms for modal/toast/snackbar (#2218/#2219). None of the existing tickets cover the developer-facing docs that explain how to get started with `@baloise/ds-react` — the "Getting Started" page in Storybook is where a new consumer lands first, and its React section is noticeably thinner than the Angular section on the same page.

Comparing `apps/storybook/src/development/00-guides/00-getting-started.mdx`:
- **Angular** (lines 27–223): prerequisites, recommendations (SCSS, Transloco), schematics install, manual install, style import, both Standalone and Module-based integration patterns, full working examples.
- **React** (lines 370–454): install command, style import, one minimal `BalApp` example. No prerequisites/framework setup guidance (CRA/Vite/Next.js), no TypeScript notes, no mention of the client/server entry split or SSR usage landing via #2220–#2223, no links to the modal/toast/snackbar idioms from #2218/#2219, no troubleshooting section.

## Plan

Create a GitHub issue in `baloise/design-system`:

- **Milestone**: `⚛️ React Integration` (#21)
- **Labels**: `ready-for-agent`
- **Title**: `Storybook: improve React Getting Started docs`
- **Body** (mirrors the What to build / Acceptance criteria structure used in #2222/#2221):
  - **What to build**: Expand the `<ReactFramework>` section of `apps/storybook/src/development/00-guides/00-getting-started.mdx` to parity with the Angular section: prerequisites/framework setup (Vite/CRA/Next.js), TypeScript usage notes, a note on `useDesignSystem()` and when it's needed, and cross-links to the modal/toast/snackbar idiom docs (once #2218/#2219 land) and the SSR/Next.js docs (once #2220 lands) via `<LinkCard>`/`<InfoQuote>` blocks consistent with existing page conventions.
  - **Acceptance criteria**:
    - [ ] React section includes a "Prerequisite"-equivalent subsection covering common React app setups (Vite, Create React App, Next.js) analogous to the Angular "Prerequisite" subsection
    - [ ] React section documents TypeScript usage (types are shipped, no extra config needed) or flags any caveats
    - [ ] React section clarifies `useDesignSystem()` purpose/placement with a short explanation, not just usage in the example
    - [ ] Footer `<LinkCards>` or an inline `<InfoQuote>` links to the React idioms docs (modal/toast/snackbar) if those docs exist at ticket time; otherwise this criterion is skipped as a soft dependency (same pattern as #2222)
    - [ ] Page still renders correctly in Storybook (`pnpm docs`) with no MDX/build errors
    - [ ] No unrelated content in the Angular/HTML sections changed
  - **Soft dependency note**: cross-links to idioms/SSR docs depend on #2218/#2219/#2220 — if those haven't landed yet, skip those specific links rather than blocking the ticket (same soft-dependency pattern used in #2222).

## Verification

- `gh issue view <new-number>` to confirm milestone, label, and body rendered as expected.
- Confirm the issue appears in `gh issue list --milestone "⚛️ React Integration"` alongside #2218–#2223.
