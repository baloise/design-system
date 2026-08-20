# 13. Token references become native Figma variable aliases, not resolved literals

Package: `packages/tokens`

Date: 2026-07-24

## Status

Accepted

## Context

Token values in the Design Tokens Format (e.g.
`{🔗 Alias.🎨 Background.Color.Sky}`) are references that Style Dictionary
resolves at build time. Figma Variables have a native equivalent: a
variable's value can be a binding to another variable (a "variable alias")
instead of a literal. The plugin could either preserve this reference graph
as native Figma aliases, or flatten every reference to its resolved literal
value when creating/updating Figma Variables.

Flattening is simpler to implement (no need to resolve a reference path to
a target `variableId` and bind to it), but it breaks the
Global → Alias → Component layering inside Figma itself: editing a Global
color there would no longer cascade to anything downstream, contradicting
how the token system works everywhere else it's consumed.

## Decision

Pull-from-Code resolves each `{Reference}` string to its target token's
`variableId` and binds the Figma Variable to it via Figma's variable-alias
mechanism, mirroring the JSON reference graph exactly.

## Consequences

- Editing a Global variable in Figma cascades to Alias/Component variables
  there, matching the JSON model — this is the main reason for the
  decision.
- The diff engine must special-case alias changes vs. literal-value
  changes: a token whose _reference target_ changed (e.g. `Alias.Color.Sky`
  now points to a different Global swatch) is a different kind of change
  from one whose _literal value_ changed, and both must be distinguishable
  in the diff table and in the generated JSON.
- Push-to-Code, when reading a Figma Variable that is bound via alias, must
  reconstruct the `{Path}` reference string rather than writing the
  resolved literal — requiring a reverse lookup from target `variableId`
  back to its token path.
- A reference can only be created if the target variable already exists;
  ordering matters when creating brand-new tokens that reference other
  brand-new tokens in the same sync.
