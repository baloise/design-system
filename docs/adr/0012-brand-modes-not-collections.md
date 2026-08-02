# 12. Brands map to Figma modes within one Variable Collection, not separate collections

Package: `packages/tokens`

Date: 2026-07-24

## Status

Accepted

## Context

`Base.tokens.json` and brand files (e.g. `Tcs.tokens.json`) need a
corresponding structure in Figma. Figma Variables support two ways to model
this: multiple **modes** on a single Variable Collection (e.g. "Base" and
"Tcs" modes on every variable), or a **separate Collection per brand**, with
brand collections aliasing Base collection variables for inherited tokens.

Modes are Figma's native mechanism for "the same variable, different value
per context" (its most common use is Light/Dark). Separate collections
would require the plugin to manually simulate inheritance via variable
aliasing across collections, and Figma places practical limits on
collection/variable counts that make one-collection-per-brand less
scalable as brands grow.

## Decision

One Figma Variable Collection holds every token; each brand (Base, Tcs, and
future brands) is a mode on that collection. A brand override is simply a
different mode-value on the same variable.

## Consequences

- Adding a brand = adding a mode, not restructuring collections.
- Figma has no native "unset, inherit from another mode" — every mode must
  hold an explicit value. Non-overridden tokens get Base's resolved value
  copied into the brand's mode on Pull; whether that copy is a "real"
  override is re-derived by value comparison at Push time, not stored as a
  separate flag (see the Push-to-Code diff step in the implementation
  plan).
- All brands live in one collection, so a designer can see every brand's
  value for a token side-by-side in Figma's variables panel — a workflow
  benefit that separate collections wouldn't offer as directly.
