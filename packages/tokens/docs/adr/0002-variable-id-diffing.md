# 2. Base-vs-brand diffing matches Figma variables by variableId, not name

Date: 2026-07-24

## Status

Accepted

## Context

`Tcs.tokens.json` only contains tokens whose value actually differs from `Base.tokens.json` (today produced by a person manually trimming Figma's full per-mode export). The pull workflow must reproduce this trimming automatically: fetch the Base-mode and Tcs-mode value for every variable, and keep only the ones that differ. Matching the two values for "the same variable" could be done by name/path or by Figma's own `variableId`. `Base.tokens.json` already carries `$extensions.com.figma.variableId` on tokens from the current manual export process.

## Decision

The diff step matches a variable's Base-mode value to its Tcs-mode value using the Figma `variableId` returned by the REST API, not by re-deriving and comparing the name path. Name/path is used only as a fallback for variables that have no id yet (shouldn't occur on a fresh pull, since the id always comes from the same API response, but keeps the door open if the transform ever merges with hand-edited data).

## Consequences

- A variable rename in Figma is still correctly recognized as "the same token, new name" during diffing, rather than looking like a delete-plus-add.
- The written JSON keeps `$extensions.com.figma.variableId` on every token (already the existing convention), which the diff step depends on for any future comparison, not just this pull.
- If Figma ever changes or recycles variable ids across collections, id-based matching would need revisiting — not expected under normal use.
