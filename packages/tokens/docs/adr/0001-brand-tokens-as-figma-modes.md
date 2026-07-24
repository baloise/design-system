# 1. Brand tokens are Figma modes within one collection, not separate collections or files

Date: 2026-07-24

## Status

Accepted

## Context

The Figma token pull workflow needs to know where to look for `Base.tokens.json` and `Tcs.tokens.json` (and any future brand file) inside Figma. Figma Variables support two ways to model a brand override: a separate Variable Collection (or even a separate file) per brand, or a single collection with one mode per brand. In this Figma file, Base and Tcs are modeled as two modes ("Base" and "Tcs") within one Variable Collection.

## Decision

The pull workflow reads a single Figma file and a single Variable Collection, and maps each Figma mode to one `tokens/<Mode>.tokens.json` file. It does not expect or support brands living in separate collections or separate files.

## Consequences

- One `file_key` and one collection lookup covers Base + all brands; no per-brand Figma file configuration.
- Adding a brand in Figma means adding a mode to the existing collection, not creating new Figma structure — but the workflow's mode list (`Base`, `Tcs`) is still hardcoded in code (see `packages/tokens/src/index.ts`'s `brands` array), so a new mode in Figma alone does not automatically produce a new tokens file; the workflow needs a matching code change.
- If Figma variable organization ever changes to per-brand collections or files, the fetch logic (not just the mode list) needs to change.
