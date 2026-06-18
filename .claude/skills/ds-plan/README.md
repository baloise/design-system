# `/ds-plan` — Design System Component Planning

**Generate structured, phased implementation plans for Helvetia Design System components.**

This skill guides you through an intelligent interview about your component, detects its architecture, proposes design decisions grounded in the design system, surfaces trade-offs with evidence-based suggestions, and generates a ready-to-implement phased plan.

## Usage

```bash
/ds-plan Create a new navbar component with mobile menu
/ds-plan Add a size variant to the button component
/ds-plan Build a card component with slots for header, content, and footer
```

## What You Get

A **phased implementation plan** in `docs/plan/NNN-component-scope.md` that includes:

- **Overview** — Purpose and context
- **Design Decisions** — Why these choices (grounded in ARCHITECTURE.md, CONTEXT.md, STYLE_GUIDE.md)
- **Technical Decisions** — Architecture, state, lifecycle (if web-component)
- **Accessibility Compliance** — WCAG 2.2 AA approach (if interactive)
- **Responsive Behavior** — Mobile → tablet → desktop (if layout-dependent)
- **SEO Considerations** — Crawlability strategy (if navigation/content-bearing)
- **Browser Support** — Compatibility expectations
- **Style Guide Alignment** — How it follows project standards
- **Risks & Mitigations** — Known risks and how to reduce them
- **Phase 1–N** — Detailed tasks, dependencies, acceptance criteria

## Interview Flow

The skill asks you **one question at a time**, building shared understanding as you go:

### 1. Parse & Clarify

"What are you building, and is it new or extending an existing component?"

### 2. Critical Core (Always)

- What's the public API? (props, events, methods)
- Slots and parts?
- Dependencies on other components?
- What's explicitly out-of-scope?

### 3. Contextual (Only if Relevant)

- Does it respond to breakpoints? (skip for utilities)
- Interactive? Keyboard navigation? (skip for static components)
- Navigation component? Links to crawl? (skip for controls/utilities)
  - **Rule:** If it's navigation, SEO crawling is required
- Special browser support? (usually assume defaults from ARCHITECTURE.md)

### 4. Auto-Detect & Propose

The skill:

- Detects component type (web-component-only, CSS-only, hybrid)
- Proposes design decisions grounded in your design system patterns
- Surfaces conflicts (e.g., AA + Shadow DOM, SEO + encapsulation) with evidence-based suggestions
- Recommends ADRs for hard-to-reverse decisions

### 5. Generate Plan

Based on your answers, the skill creates:

- **Adaptive phases:** 4–6 for simple components, 7–9 for medium, 10+ for large
- **Relevant sections:** Only includes sections that matter (skip SEO for utilities, skip Technical Decisions for CSS-only)
- **Task granularity:** Design phases detailed (5–8 tasks), implementation medium (3–5), testing/risk high-level (2–3)
- **Concrete acceptance criteria:** Specific, checkable items per phase

### 6. Review & Approve

The plan appears in your console. You can:

- Approve: "Looks good, save to `docs/plan/002-navbar-implementation.md`"
- Refine: "Add more detail to Phase 3" or "This feels too large, split it"
- Reject: "Let's rethink this"

Once approved, the file is auto-written to `docs/plan/` with auto-detected numbering.

## Design System Integration

This skill is **Stage 1** of a 4-step workflow:

```
1. /ds-plan               → Create plan in docs/plan/
                            ↓
2. /ds-create-component   → Scaffold files: .tsx, .interfaces.ts, .host.scss
                            ↓
3. /ds-test-component     → Generate test files: .spec.ts, .play.ts, PO
                            ↓
4. /ds-document-component → Create Storybook: stories, MDX pages
```

The plan explicitly references downstream skills, so you know what's next.

## Key Features

### Grounded in Design System Patterns

Proposals come from:

- **ARCHITECTURE.md** — Component patterns, CSS variable cascade, testing strategy
- **CONTEXT.md** — Component types, lifecycle, semantic HTML
- **STYLE_GUIDE.md** — Code standards, prop validation, naming conventions, **mobile-first styling**

You confirm or override each proposal.

### Mobile-First Styling (Always)

Every plan includes mobile-first SCSS guidance:

- Base styles for 320px+
- `@include media('>tablet')` for enhancements
- Design token breakpoints, never hardcoded pixels
- See STYLE_GUIDE.md for details

### Light DOM for Content

Plans recommend placing critical content (navigation links, user-provided text) in light DOM (slots):

- **Benefit 1:** WCAG 2.2 AA compliance (slotted content is interactive)
- **Benefit 2:** SEO crawling (search engines see semantic `<a>` tags)
- Shadow DOM is for layout and styling only

### Context-Aware Criteria

The skill knows what matters for your component:

- **SEO crawling required:** Navigation (navbar, breadcrumbs), content-bearing components
- **SEO optional:** Interactive controls, utilities, decorations
- **A11y required:** Interactive components (buttons, dialogs, modals)
- **A11y optional:** Static displays, decorations
- **Responsive behavior:** Layout components, cards, navigation
- **Responsive optional:** Form inputs, utilities
- **Mobile-first styling:** ALWAYS required

### Conflict Surfacing

If your component has conflicting requirements, the skill identifies them:

**Example:** "You want AA compliance AND Shadow DOM encapsulation"

- ✅ Suggestion: "Put critical content in light DOM (slots) for both"
- User chooses whether to follow the suggestion

**Example:** "Navigation component needs SEO crawling AND content encapsulation"

- ✅ Suggestion: "Navigation links must be in light DOM; use semantic `<a>` tags"
- User confirms the approach

### ADR Recommendations

For hard-to-reverse decisions, the skill suggests creating an ADR:

- "Using native `<dialog>` vs. custom popover"
- "Slot-based API vs. child components"
- "Semantic `<a>` tags vs. custom navigation widget"

You decide whether to document it.

## Example Plans

### New Web Component: Navbar

```
Input: /ds-plan Create a new navbar component with mobile menu

Output: docs/plan/002-navbar-implementation.md (10 phases)

Sections:
- Design Decisions: native <dialog>, slot-based API, semantic <a> links
- Technical Decisions: web-component-only, state management, breakpoint detection
- Accessibility: keyboard nav, focus trap, ARIA on button/dialog
- Responsive Behavior: hamburger on mobile, inline on desktop
- SEO: links in light DOM for crawling, semantic nav element
- Phases 1–10: API design, HTML structure, responsive behavior, dialog, CSS, state, a11y, backward compat, testing, risks
```

### CSS Utility: Spacing Scale

```
Input: /ds-plan Add CSS utility classes for spacing scale

Output: docs/plan/003-spacing-utilities.md (4 phases)

Sections:
- Design Decisions: token-driven values, mobile-first optional
- Style Guide Alignment: naming conventions, SCSS structure
- Phases 1–4: Define scale, create SCSS, test, document

(Skipped: Technical Decisions, Accessibility, Responsive Behavior, SEO)
```

### Component Variant: Button Size

```
Input: /ds-plan Add size variant (sm, md, lg) to button component

Output: docs/plan/004-button-size-variant.md (5 phases)

Sections:
- Design Decisions: CSS modifier classes, CSS variable cascade
- Style Guide Alignment: prop validation, naming
- Phases 1–5: Add prop, CSS variants, validation, tests, docs

(Skipped: Technical Decisions separate, Accessibility, SEO, Responsive Behavior)
```

## Tips for Best Results

1. **Be Specific**
   - ✅ "Create navbar with mobile hamburger menu"
   - ❌ "Create navigation"

2. **Mention Constraints**
   - "Internal admin component (no public SEO concerns)"
   - "Must support older browsers (check ARCHITECTURE.md defaults)"

3. **Reference Patterns**
   - "Similar to ds-navbar from recent work"
   - "Like snackbar's breakpoint detection"

4. **Refine Interactively**
   - After seeing the plan: "Add more detail to Phase 3"
   - "Combine Phases 8 and 9, testing and risks together"
   - "Remove SEO section, we don't need crawling for this"

5. **Create ADRs Promptly**
   - If the plan recommends an ADR, create it during the interview
   - Captures rationale while context is fresh
   - Link from plan to ADR file for reference

## What Happens After

Once your plan is approved and saved:

```bash
/ds-create-component
```

This scaffolds the component files (`.tsx`, `.interfaces.ts`, `.host.scss`) with structure ready for Phase 1 implementation.

Then:

```bash
/ds-test-component
```

Generates all test files (`.spec.ts`, `.component.play.ts`, `.visual.play.ts`, `.a11y.play.ts`, Page Object).

Finally:

```bash
/ds-document-component
```

Creates Storybook stories and MDX pages.

## Related Documentation

- **ARCHITECTURE.md** — Component patterns, CSS variable cascade, testing strategy, browser support
- **CONTEXT.md** — Glossary, component types, semantic HTML patterns
- **STYLE_GUIDE.md** — Code standards, naming, mobile-first styling, accessibility, semantic HTML
- **docs/plan/\*** — All generated implementation plans
- **docs/agents/** — Agent/skill documentation

## Questions?

See SKILL.md for detailed behavior and interview flow documentation.
