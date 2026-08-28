# 24. ds-input-phone loads per-country flag SVGs lazily instead of emoji or a sprite sheet

Package: `packages/core`

Date: 2026-08-28

## Status

Accepted

## Context

`ds-input-phone` must show a flag per country in the picker and next to the
selected calling code. No flag assets, ISO-3166 icon set, or country-flag
convention exists anywhere in the repo today (`packages/core`,
`packages/assets`, `packages/tokens`) — this is a greenfield choice.

Considered alternatives:

- **Unicode emoji flags** (e.g. `🇨🇭`) — zero bundle cost and real accessible
  text, but rendering is font/OS-dependent (some Windows/browser
  combinations historically substitute two-letter codes for the flag
  glyph), and visual weight isn't controllable to match the DS's visual
  language. Rejected because flag rendering consistency across platforms
  was judged more important than the zero-cost option for a DS component
  meant to look identical everywhere.
- **A flag icon package loaded as one CSS sprite sheet** (e.g. `flag-icons`'
  default CSS import) — simplest integration, but bundles all ~240
  countries' worth of sprite weight into every consumer regardless of
  whether `countries` restricts the picker to 4 entries. Rejected as it
  directly conflicts with this component's bundle-size mandate.

## Decision

Use a real SVG flag dependency, but resolve and inject each country's SVG
individually and lazily — only for countries actually rendered (the current
selection's trigger, plus whichever options are visible/opened in the
picker), never as a single sprite/CSS bundle covering every country. An
instance restricted via `countries` to e.g. `CH,DE,FR,IT` only ever loads 4
flag assets.

## Consequences

- The chosen flag package must expose flags as individually importable
  files/URLs (not only a combined CSS sprite) for this to work — verify this
  during Phase 3 implementation before committing to a specific package
  version.
- Slightly more implementation complexity than a single CSS import: a
  per-instance resolution step (dynamic import or asset-path lookup by ISO
  code) is needed, plus a loading/fallback state for the brief window before
  a flag asset resolves.
- SVGs need an explicit accessible-name story (unlike emoji, which are text
  by default) — the flag must be `aria-hidden` with the country name carried
  by adjacent visible/accessible text, not the flag itself. See the
  "Flags are supplementary, not the accessible name" rule in `CONTEXT.md`'s
  Phone Field section.
