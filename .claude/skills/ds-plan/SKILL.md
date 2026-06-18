---
name: ds-plan
description: Generate phased implementation plans for design system components with adaptive scope, design decisions, and risk assessment
---

# `/ds-plan` — Design System Component Planning Skill

Generate structured, phased implementation plans for design system components. The skill interviews you about component scope, detects the architecture type, proposes design decisions grounded in your design system patterns, surfaces conflicts with evidence-based suggestions, and creates a ready-to-implement plan.

Use /grill-with-docs to interview the user to have a complete understanding of the component requirements.

## Quick Start

```bash
/ds-plan Create a new navbar component with mobile menu
/ds-plan Add a size variant to the button component
/ds-plan Build a card component with slots for header, content, and footer
```

## Behavior Overview

1. **Parse user input** — Extract component name, purpose, and initial context
2. **Adaptive interview** — Ask critical questions (purpose, API, scope) then contextual ones (responsive, accessibility, SEO)
3. **Auto-detect type** — Determine if web-component-only, CSS-only, or hybrid based on context
4. **Propose decisions** — Ground design decisions in ARCHITECTURE.md, CONTEXT.md, STYLE_GUIDE.md patterns
5. **Surface conflicts** — Identify trade-offs (AA + Shadow DOM, SEO + encapsulation) with recommendations
6. **Generate plan** — Adaptive phases, sections, and task granularity
7. **Review + save** — Output to console, get user approval, write to `docs/plan/NNN-kebab-case.md`

## Interview Stages

### Stage 1: Parse & Clarify

Extract component name, purpose, and scope (new/update).

### Stage 2: Critical Core (Always)

Ask: API, Slots & Parts, Dependencies, Out-of-scope.

### Stage 3: Contextual (If Relevant)

Ask about: Responsive behavior, Accessibility, SEO crawling, Browser support (only if relevant to component type).

### Stage 4: Auto-Detect & Propose

- Detect component type (web-component, CSS-only, hybrid)
- Propose design decisions from design system patterns
- Surface conflicts with evidence-based suggestions
- Recommend ADRs for hard-to-reverse decisions

### Stage 5: Generate Plan

- Determine phase count (4–10+ based on complexity)
- Select relevant sections (adapt to component type)
- Define phases with adaptive task granularity
- Include concrete acceptance criteria
- Reference downstream skills

### Stage 6: Review & Approve

- Output full plan to console
- Ask for approval with suggested filename
- Allow refinement iterations
- On approval: auto-write to `docs/plan/NNN-kebab-case.md`

## Key Principles

### Mobile-First Styling

Always propose mobile-first SCSS per STYLE_GUIDE.md. Define base styles for 320px+, use `@include media()` for enhancements, never hardcode breakpoints.

### Light DOM for Content

Place critical content in light DOM (slots), Shadow DOM for layout/styling only. Enables both AA compliance and SEO crawling.

### Design Tokens Only

All colors, spacing, typography use `--ds-*` tokens from `packages/tokens`. Never hardcode values.

### Semantic HTML

Use native elements: `<nav>`, `<button>`, `<a>`, `<dialog>`. Adds accessibility and SEO value automatically.

### Context-Aware Criteria

- **Mobile-first:** Always required
- **SEO crawling:** Required if navigation; optional otherwise
- **Accessibility (WCAG 2.2 AA):** Required if interactive; optional otherwise
- **Responsive behavior:** Required if layout-dependent; optional otherwise

## Output Structure

Generated plan includes: Overview, Design Decisions, Technical Decisions (if web-component), Accessibility Compliance (if interactive), Responsive Behavior (if layout-dependent), SEO Considerations (if navigation), Browser Support, Style Guide Alignment, Risks & Mitigations, Related Documentation, Phases (1–N with goals, tasks, dependencies, acceptance criteria).

## Integration

4-skill workflow:

1. **`/ds-plan`** — Create implementation plan → `docs/plan/NNN-component-scope.md`
2. **`/ds-create-component`** — Scaffold component files
3. **`/ds-test-component`** — Generate test files
4. **`/ds-document-component`** — Create Storybook docs

## Scope

### Out of Scope

- Test automation (unit/E2E test code — handled by `/ds-test-component`)
- Storybook stories (handled by `/ds-document-component`)
- MDX documentation

### In Scope

- Component architecture
- Design decisions with rationale
- Technical decisions
- Accessibility compliance approach
- Responsive behavior definition
- Risk identification and mitigation
- Phased tasks with acceptance criteria
- **Final phase:** Manual testing checklist (user verifies by running app)

## Testing Phase (Final Phase)

The final phase focuses on **manual testing**, not test automation:

- **Purpose:** User verifies implementation works as intended by running the app and observing behavior
- **Not included:** Writing unit tests, E2E tests, or test automation (use `/ds-test-component` for that)
- **Method:** User navigates to localhost, interacts with the component, checks accessibility, verifies responsive behavior
- **Checklist:** Includes all acceptance criteria as manual test items (click this, verify that, check console, etc.)
- **Documentation:** Lists ARIA attributes, keyboard shortcuts, responsive rules to verify

This ensures the implementation is validated at runtime before test suite creation.

## Pro Tips

1. **Be specific:** "Create navbar with mobile menu" not "Create navigation"
2. **Mention constraints:** "Internal use only (no SEO needs)" or "Support IE11"
3. **Refer to patterns:** "Similar to ds-navbar" or "Like snackbar breakpoint handling"
4. **Refine interactively:** "Add detail to Phase 4" or "Remove SEO section"
5. **Create ADRs:** If plan recommends one, create during interview while context is fresh

## Questions Answered

- **What's the scope?** → Interview + plan define MVP and phases
- **Web component or CSS-only?** → Skill auto-detects and proposes
- **How handle trade-offs?** → Skill surfaces conflicts with design system solutions
- **What's in each phase?** → Adaptive task breakdown with acceptance criteria
- **Ensure compliance?** → Specific criteria for accessibility, SEO, mobile-first, style guide

---

See README.md for team guidance and implementation notes.
