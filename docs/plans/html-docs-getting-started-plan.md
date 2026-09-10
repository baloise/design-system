# Plan: Improve HTML Getting Started docs (Shadow DOM basics)

## Context

Continuing the series of Getting Started doc-gap tickets (React → #2224, Angular → #2225, Angular forms → #2226), this covers the **HTML** framework section of `apps/storybook/src/development/00-guides/00-getting-started.mdx` (lines 231–362), filed under milestone **👻 Shadow Dom Review / V2.0** (#14).

The HTML section currently covers: Node Modules install, a raw `index.html` example, an `<InfoQuote>` tip about the `initialize`/`initializeDesignSystem` entry point for non-code-splitting bundlers, and CDN install/usage. Unlike the React/Angular sections, there's no sibling framework section to compare against for parity — the natural gap for a plain-HTML consumer is **Shadow DOM specifics**: styling encapsulation, `::part`/`::slotted` usage, CSS custom-property penetration, and slotting — none of which are documented anywhere in Getting Started, even though every component is a shadow-DOM web component. This gap is also exactly what milestone #14 is reviewing, making it a natural fit there rather than a generic docs-parity ask.

Milestone #14's existing issues (#2193, #2189, #2185, #2184, #2048) are all component/a11y work — this is the first docs-only ticket in that milestone.

## Plan

Create a GitHub issue in `baloise/design-system`:

- **Milestone**: `👻 Shadow Dom Review / V2.0` (#14)
- **Labels**: `ready-for-agent`
- **Title**: `Storybook: improve HTML Getting Started docs (Shadow DOM basics)`
- **Body**:
  - **What to build**: Add a Shadow DOM subsection to the `<HTMLFramework>` section of `apps/storybook/src/development/00-guides/00-getting-started.mdx`, covering what a plain-HTML consumer needs to know since every component renders inside a shadow root:
    - How styling reaches into components: CSS custom properties (design tokens) cross the shadow boundary, plain selectors don't
    - `::part` usage where components expose parts, with a pointer to per-component docs for available part names rather than duplicating them here
    - Slotting basics (`<slot>` / named slots) with one minimal example
    - A note that `document.querySelector` won't reach into shadow-rooted internals — relevant for consumers doing manual DOM manipulation outside a framework
  - **Acceptance criteria**:
    - [ ] New subsection explains CSS custom-property penetration into shadow DOM with a short example
    - [ ] `::part` usage is documented with one example and a pointer to per-component docs for available parts
    - [ ] Slotting is documented with one minimal example (default or named slot)
    - [ ] Note added about `querySelector` not piercing shadow roots for consumers doing manual DOM work
    - [ ] Page still renders correctly in Storybook (`pnpm docs`) with no MDX/build errors
    - [ ] No unrelated content in the Angular/React sections changed

## Verification

- `gh issue view <new-number>` to confirm milestone, label, and body rendered as expected.
- Confirm the issue appears in `gh issue list --milestone "👻 Shadow Dom Review / V2.0"`.
