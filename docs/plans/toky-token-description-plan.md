# Plan: Add `description` field per design token (toky)

## Context

Design tokens in this repo currently carry only `$type`/`$value` (plus `$extensions` for Figma variable IDs) — there's no way to document what a token means or is for. The W3C Design Tokens Format Module (2025.10 draft, https://www.designtokens.org/tr/drafts/format/) defines an optional `$description` field as a sibling of `$type`/`$value` on a token, which this repo doesn't yet use anywhere. This plan adds that field end-to-end: visible (truncated) in toky's token table, editable via the existing create/edit dialogs, persisted in `Base.tokens.json`/`Tcs.tokens.json` in spec-conformant shape, and synced bidirectionally with Figma's native variable `description` field (JSON as source of truth).

## Decisions locked in

1. **New table column**, not inline text — order is **Name → Description → Value**. Name/Value stay inline-editable `Input`s; Description does not join that editing model.
2. Description column is **read-only in the table**: pure-CSS truncation (Tailwind `truncate`), single line. Clicking it opens the **same edit dialog** used for the rest of the token — no separate mini-editor.
3. Name column gets **`min-w-[180px]`** so it stays stable now that Description competes for space.
4. Create and edit dialogs both get a **`Textarea`** field for description (unbounded length, no char cap/counter).
5. Description is **optional** everywhere — no required-field validation, no migration needed for existing tokens.
6. Description is **leaf-token level only** (`$description` sibling to `$type`/`$value`). No group-level `$description` — no UI surface for group nodes exists.
7. Description is **shared across brands** — a single string on the Base token; brand-override `FlatToken`s never set their own `description`.
8. Empty state in the table shows a **muted placeholder "Add description"** (not a blank cell); clicking it opens the edit dialog same as a filled description would.
9. Figma sync is **bidirectional**, JSON canonical:
   - **Push** (JSON → Figma): always writes JSON's `$description` into Figma's native `description` field, overwriting whatever's there.
   - **Pull** (Figma → JSON): only fills `$description` in JSON when JSON's is currently empty/absent — never overwrites an existing JSON description.
   - **Composite tokens** (shadow/border/typography/responsive, which map to multiple Figma sub-variables): push writes the **same description onto every sub-variable**; pull reads deterministically from one (e.g. the first sub-property in that type's `_SUB_PROPERTIES` array), since all sub-variables carry the same value.
   - **Pull scope**: implement fill-if-empty pull only in the **in-app Pull sidebar** (`apps/toky/src/tokens/figma-pull.ts`), which already has a propose → review → apply UX. The standalone `scripts/figma-sync/pull.mjs` GitHub Action script is **out of scope** — it has no existing mechanism to write JSON directly (today it only backfills variableIds via GitHub Action outputs), and building that is a separate, larger piece of work.
10. **No new JSON-Schema validation tooling.** DTCG conformance is achieved by construction (correct field name/position), consistent with the fact that no schema validator exists in this pipeline today for any field.

## Implementation, by file

### 1. `apps/toky/src/tokens/types.ts`
Add `description?: string` to `FlatToken` (~line 27, after `type`). `undefined` means "no description" — never round-tripped as `''`.

### 2. `apps/toky/src/tokens/flatten.ts`
In `walk()`'s leaf branch (~line 65-78), read `$description` off the leaf node:
```ts
description: typeof node.$description === 'string' ? node.$description : undefined,
```
No change to group-walking (group-level `$description` is out of scope, same as `$extensions` is already skipped at group level).

### 3. `apps/toky/src/tokens/edit.ts`
- **`describeChangeStatus`** (~line 100-120): fold a description change into the existing `'value'` status bucket — add `(token.description ?? '') !== (originalToken.description ?? '')` to the comparison. No new status needed.
- **`computeDiff`** (~line ~150 `changed` condition, and the create-entry branch): add the same description-comparison clause, otherwise a description-only edit produces no diff entry and is silently dropped.
- **`TokenDiffEntry`** interface (~line 18-46): add `description?: string`, set on `create`/`update` entries as `token.description || undefined`, unset on `delete`.
- **`applyDiffToDocument`** (~line 243-273): write `$description` right after `$value`, only when non-empty, before `$extensions`:
  ```ts
  const newNode: Record<string, unknown> = { $type: entry.type, $value: entry.value }
  if (entry.description) newNode.$description = entry.description
  ```

### 4. `apps/toky/app/token-editor.tsx` — state
- **`Draft`** (~line 187) and **`emptyDraft`** (~line 209): add `description: string` (empty-string default, controlled `Textarea`).
- **`EditDraftState`** (~line 236): add `description: string`.
- **`openEditDialog`** (~line 4247): populate `description: token.description ?? ''`.
- **`applyEditDialog`** (~line 4312, `setWorkingResolved` around line 4407): write `description: editDraft.description.trim() || undefined` unconditionally (not gated by value/reference mode). Brand-candidate objects built in the same function must **not** carry `description` (decision 7).
- **`commitDraftIfReady`** (~line 4030): add `description: draft.description.trim() || undefined` to the new `FlatToken` literal.
- `duplicateRow`/`duplicateGroup`: already spread the source token, so description carries over to duplicates automatically — no change needed.

### 5. Table column — `apps/toky/app/token-editor.tsx`
- `COLUMN_COUNT` (line 171) **stays `2`** — Description is click-only, not part of the Name/Value keyboard-nav grid (`getNextCell`), so it must not consume a nav-grid column index.
- `colSpan={4}` sites become `colSpan={5}` (5 real columns now: Name, Description, Value, Used/Brand, Actions) — currently at ~line 3155 and ~5040; re-grep at implementation time since line numbers shift.
- Header row (~line 5756): insert a new `<TableHead>Description</TableHead>` between Name and Base/Value; add `min-w-[180px]` to the Name head's className.
- `TokenRow` (~line 2005-3164, the **only** row-render path — composite types are ternary branches inside one cell, not separate components): insert a new `<TableCell>` between the Name cell and the value cell:
  ```tsx
  <TableCell className="max-h-8 p-0 px-1">
    <button
      type="button"
      aria-label={`Description for ${token.name || 'token'}`}
      onClick={() => handlers.onEdit(id)}
      className="flex h-8 w-full items-center truncate px-1 text-left text-sm outline-none hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring"
    >
      {token.description
        ? <span className="truncate">{token.description}</span>
        : <span className="truncate text-muted-foreground">Add description</span>}
    </button>
  </TableCell>
  ```
  Reuses `handlers.onEdit(id)` (already wired to `openEditDialog`) — no new handler needed.
- **Brand column interaction**: the Description cell always reads `token.description` (the Base-layer `FlatToken` passed to `TokenRow`), never `brandInfo.token.description` — falls out naturally since brand tokens never populate `description` (see §4).

### 6. Create dialog — `apps/toky/app/token-editor.tsx` (~line 5890+)
Insert a `Textarea` field directly after the "Full name" input, before the type/value editor (matches table's Name → Description → Value order):
```tsx
<div className="space-y-1.5">
  <Label htmlFor="create-token-description">Description</Label>
  <Textarea
    id="create-token-description"
    value={draft.description}
    onChange={e => setDraft(prev => ({ ...prev, description: e.target.value }))}
    placeholder="Optional description"
  />
</div>
```
`Textarea` already exists at `apps/toky/components/ui/textarea.tsx` — just import it.

### 7. Edit dialog — `apps/toky/app/token-editor.tsx` (~line 6367-6570)
Same field, directly after "Full name" (~line 6386-6395), before "Base value" (~line 6397):
```tsx
<div className="space-y-1.5">
  <Label htmlFor="edit-token-description">Description</Label>
  <Textarea
    id="edit-token-description"
    value={editDraft.description}
    onChange={e => setEditDraft(prev => (prev ? { ...prev, description: e.target.value } : prev))}
    placeholder="Optional description"
  />
</div>
```

### 8. `packages/tokens/Base.tokens.json` / `Tcs.tokens.json`
No migration script needed — purely additive/optional field; existing tokens simply have no `$description` and none gets written for them.

### 9. Figma sync — push (JSON → Figma), `scripts/figma-sync/lib/write.mjs`
**New work required, not just a payload field add.** `buildCreatePassPayload` (~line 214-338) only emits `action: 'CREATE'` for brand-new variables (guarded by `isTempId`) — there's no existing `UPDATE`-variable pass for metadata on already-synced variables, but decision 9 requires description to push on *every* sync run, including for already-created tokens.
- For **same-run creates**: fold `description: token.description ?? ''` directly into `buildCreatePassPayload`'s per-variable object literals (Figma's `CREATE` action accepts `description` directly) — cheap, no new pass needed.
- For **already-synced tokens** (real, resolved `variableId`): add a new exported function, e.g. `buildDescriptionUpdatePayload({ baseTokens, remoteVariablesById })`, iterating **Base tokens only** (description isn't per-brand), emitting `{ action: 'UPDATE', id: variableId, description: token.description ?? '' }` for each token whose local `$description` differs from the remote variable's description. For composite tokens, emit one such entry per sub-variable, all carrying the same description string (per decision 9's composite-token rule).
- Call this as a new **pass 3** from `pull.mjs`'s `writePull()` (~line 209-236), after pass 1 (create/delete) and pass 2 (alias/mode-values), so it only targets variables with a real resolved id.
- Add test coverage in `scripts/figma-sync/test/write.test.ts` for both the folded-into-CREATE case and the new UPDATE pass.

### 10. Figma sync — pull (Figma → JSON), in-app only: `apps/toky/src/tokens/figma-pull.ts` + `figma-map.ts`
- `PulledEntry` interface (~line 48): add `description?: string`, sourced from the Figma variable's native `description` field (confirm `FigmaVariable`/`FigmaVariablesMeta` type in `apps/toky/src/tokens/figma.ts` includes it — extend if the mirror type was trimmed).
- `deriveValue()` (~line 169-246): thread description through with fill-if-empty logic:
  ```ts
  description: localToken.description ? undefined : (remoteDescription || undefined)
  ```
- Composite-type derive functions (`deriveShadowValue` and parallel border/typography/responsive functions): read description from one deterministic sub-variable (e.g. first entry in that type's `_SUB_PROPERTIES` array) since push writes the same value to all of them.
- Wherever `PulledEntry` results get applied onto `working`/`workingResolved` in `token-editor.tsx`, carry `description` through with the same fill-if-empty semantics.
- Extend `apps/toky/src/tokens/figma-pull.test.ts` with both cases: local empty → filled from Figma; local non-empty → left untouched.

### 11. `packages/tokens/CONTEXT.md`
Small addition (~3-5 lines):
- In "JSON Structure" (~line 172-195): add `"$description": "..."` to the example, with a one-line note that it's optional, shared across brands, shown in Toky's table/dialog.
- Optionally one sentence under "Figma Integration" (~line 87-96) noting description round-trips with Figma's native `description` field, JSON as source of truth.

### 12. Tests to extend
- `apps/toky/src/tokens/edit.test.ts`: description-only edit produces an `update` diff entry with `'value'` change status; `applyDiffToDocument` omits `$description` when absent, includes when present, removes it when cleared back to empty.
- `apps/toky/src/tokens/figma-pull.test.ts`: fill-if-empty cases per §10.
- `scripts/figma-sync/test/write.test.ts`: `description` included in CREATE payloads when present; new UPDATE-pass payload shape per §9.
- Spot-check `filter.test.ts`, `css-preview.test.ts`, `graph.test.ts`, `validate.test.ts` for any `FlatToken`-shape assumptions that could break (description shouldn't feed search/CSS/graph logic — expect no changes needed, just confirm).

## Verification plan

1. `pnpm start` (or toky's dev script) — open a token with no description: table shows muted "Add description", row height unaffected by truncation.
2. Click the description cell — same edit dialog opens as "Edit" action; type a long description, Apply — table shows single-line truncated text with ellipsis; reopening the dialog shows the full text.
3. Create a new token with a description via the Create dialog — confirm it lands in `working`, and on diff/PR generation `Base.tokens.json` gets `$description` as a sibling of `$type`/`$value`, no `$description: ""` written elsewhere.
4. Edit only the description of an existing token (no name/value change) — confirm a diff entry is produced, not silently dropped.
5. Switch to a brand tab — description column still shows Base's description; no per-brand description field appears anywhere.
6. Clear a description back to empty and Apply — confirm `$description` is fully removed from the JSON node, not written as `""`.
7. Figma sync push (dry run) — new token's CREATE payload includes `description`; an already-synced token's changed description produces the new UPDATE-pass payload; a composite token's description appears identically on all its sub-variables.
8. Figma sync pull (in-app sidebar) — a Figma variable with a description and no local `$description` gets proposed as a fill; a Figma variable with a different description than an existing local `$description` does NOT get proposed as an overwrite.
9. Keyboard navigation — Tab/Arrow keys still move only between Name and Value cells (`COLUMN_COUNT`-driven grid); Description is reachable only via click (or native Tab-to-button focus), not the arrow-key grid.

## Critical files

- `apps/toky/src/tokens/types.ts`
- `apps/toky/src/tokens/flatten.ts`
- `apps/toky/src/tokens/edit.ts`
- `apps/toky/app/token-editor.tsx`
- `scripts/figma-sync/lib/write.mjs`
- `apps/toky/src/tokens/figma-pull.ts`
- `packages/tokens/CONTEXT.md`
