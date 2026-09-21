# Plan: Improve Angular Getting Started docs in Storybook

## Context

`apps/storybook/src/development/00-guides/00-getting-started.mdx` already gives Angular the most complete framework section on the page (prerequisites, schematics vs. manual install, Standalone and Module-based integration, full working examples — lines 27–223). What it's missing is explanation of *why* certain steps are needed and links out to the growing set of Angular-specific capability docs landing under milestone **✏️ Angular Forms & Services** (#8): reactive-forms support per component (#2049–#2058) and the modal/overlay service (#2119–#2124).

Gaps against the rest of the page and against what's shipping in milestone #8:
- `CUSTOM_ELEMENTS_SCHEMA` is used in both the Standalone and Module examples with no explanation of why it's required
- No mention of reactive-forms integration (`ControlValueAccessor` support) even though this is a major, actively-developed capability (#2049–#2058)
- No mention of the upcoming `DsModalService` / component-overlay pattern (#2119–#2124)
- No guidance on when to prefer Standalone vs. NgModule-based setup for a new app (both are documented but not compared)

## Plan

Create a GitHub issue in `baloise/design-system`:

- **Milestone**: none (no existing milestone covers Angular docs specifically; #8 is scoped to form components/services, not documentation)
- **Labels**: `ready-for-agent`
- **Title**: `Storybook: improve Angular Getting Started docs`
- **Body** (What to build / Acceptance criteria, matching #2222/#2224 structure):
  - **What to build**: Enrich the `<AngularFramework>` section of `apps/storybook/src/development/00-guides/00-getting-started.mdx`:
    - Add a short explanation of why `CUSTOM_ELEMENTS_SCHEMA` is required (Angular's template compiler doesn't recognize custom elements by default)
    - Add a subsection or `<InfoQuote>` noting reactive-forms support (`ControlValueAccessor`) is available per-component, linking to the relevant docs once #2049 (forms foundation) and its per-component tickets land
    - Add a subsection or `<InfoQuote>` on the modal/overlay service (`DsModalService`) once #2119–#2121 land
    - Add brief guidance comparing Standalone vs. Module-based setup (when to pick which) — a sentence or two, not a new pattern
  - **Acceptance criteria**:
    - [ ] `CUSTOM_ELEMENTS_SCHEMA` requirement is explained inline near its first use
    - [ ] Reactive-forms support is mentioned with a link to the relevant docs, if landed at ticket time; otherwise skipped as a soft dependency on #2049
    - [ ] `DsModalService` is mentioned with a link to the relevant docs, if landed at ticket time; otherwise skipped as a soft dependency on #2119–#2121
    - [ ] Standalone vs. Module guidance added (1–2 sentences, not a new example)
    - [ ] Page still renders correctly in Storybook (`pnpm docs`) with no MDX/build errors
    - [ ] No unrelated content in the React/HTML sections changed
  - **Soft dependency note**: the forms and modal-service links depend on #2049 and #2119–#2121 respectively — skip whichever hasn't landed yet rather than blocking the ticket.

## Verification

- `gh issue view <new-number>` to confirm label and body rendered as expected.
- Confirm the issue appears in `gh issue list --search "Angular Getting Started"`.
