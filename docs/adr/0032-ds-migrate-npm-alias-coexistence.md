# 32. Coexist old and new DS packages via npm aliases

Package: `packages/ds-skills`

Date: 2026-09-23

## Status

Accepted

## Context

Old Baloise DS and new Helvetia DS custom-element tags don't collide
(`bal-*` vs `ds-*`), but their npm package names do — both publish as
`@baloise/ds-core`, `@baloise/ds-react`, `@baloise/ds-angular`, and
`@baloise/ds-styles`. An app migrating component-by-component needs both
installed at once, which a single package name can't do.

`ds-migrate-from-baloise`'s Init step is the first consumer of this
decision. The migration plan drafted it as ADR 0028; that number is already
[ADR-0028](0028-react-idioms-for-overlay-components.md), so this decision is
recorded as 0032.

## Decision

`ds-migrate-from-baloise`'s Init step installs the new packages under npm
aliases (`@helvetia/ds-react`: `npm:@baloise/ds-react@<version>`, same
pattern for ds-core/ds-angular/ds-styles) and generates all new imports
against those alias names. `<version>` is the `next` dist-tag from
`npm view @baloise/ds-core dist-tags`, not a hardcoded version. HTML apps
alias `ds-core` and `ds-styles`. React apps alias `ds-react` and
`ds-styles`. Angular apps alias `ds-angular` and `ds-styles`.

This makes incremental, per-component migration possible today without
waiting on a real rename of the published package name — which remains a
separate, unscheduled decision.

## Consequences

Every consumer app that runs this skill ends up importing the new DS via
`@helvetia/*`, not the package's real published name. If the real package is
later renamed to something under an `@helvetia` scope, these generated
imports would already match; if it's renamed to anything else, a follow-up
codemod will be needed across every migrated app. This trade-off was chosen
deliberately over blocking this entire migration tool on an unscheduled
rename decision.
