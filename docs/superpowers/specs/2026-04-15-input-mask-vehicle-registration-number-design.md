# Input Mask: Vehicle Registration Number Formatter

**Date:** 2026-04-15
**Scope:** Finish `VehicleRegistrationNumber` mask formatter and wire it into `ds-input`

---

## Context

The `ds-input` component supports a `mask` prop that formats input values in real time (dots, slashes, etc. appear as the user types). The infrastructure for this is already in place:

- `input.mask.ts` — `InputMaskFormatterInterface` + `InputMaskUtil`
- `masks/index.ts` — registry of formatter instances
- `masks/vehicle-registration-number.ts` — skeleton class with stub implementations

The commented-out code inside `input.tsx` contains the original formatting logic. This spec describes moving that logic into the formatter class and wiring the two missing connections in the component.

---

## Format

Vehicle registration number: `123.456.789.012`
- Digits only, grouped in sets of 3 separated by dots
- Max 12 digits (4 groups)
- Dots appear in real time as the user types

---

## Changes

### 1. `masks/vehicle-registration-number.ts`

Fill in all three interface methods:

**`maxLength`** — fix from `2` to `MAX_LENGTH_VEHICLE_REGISTRATION_NUMBER` (12)

**`format(value: string | null): string | null`**
- Returns `value` unchanged if falsy
- Delegates to `formatVehicleRegistrationNumber(value)` — that function already strips non-digits and handles truncation at 12 chars

**`onInput(ev: InputEvent): void`**
- Read cursor positions from `ev.target` before mutating
- Strip non-digits from `input.value`, truncate to 12 chars → raw
- Write `formatVehicleRegistrationNumber(raw)` back to `input.value`
- Restore cursor via `input.setSelectionRange` if cursor is before end of raw value

**`onKeydown(ev: KeyboardEvent): void`**
- No-op if `isCtrlOrCommandKey(ev)`
- Allow keys in `[...NUMBER_KEYS, ...ACTION_KEYS]`
- Call `stopEventBubbling(ev)` for anything else

### 2. `input.mask.ts`

- Fix type mismatch: `onKeydown(ev: InputEvent)` → `onKeydown(ev: KeyboardEvent)` in both the interface and `InputMaskUtil`
- Remove `console.log` debug lines from `InputMaskUtil`

### 3. `input.tsx`

**`onKeydown` handler** — call `this.maskUtil.onKeydown(ev)` when a mask is active and return early (replaces the commented-out mask keydown block):
```ts
private onKeydown = (ev: KeyboardEvent) => {
  if (this.mask !== undefined) {
    return this.maskUtil.onKeydown(ev)
  }
  // existing allowedKeyPress logic...
}
```

**`render()`** — when a mask is set, use `maskUtil.format()` for the display value instead of the focused/unfocused suffix logic (masks don't use the suffix feature):
```ts
let value: string
if (this.mask) {
  value = this.maskUtil.format(this.getRawValue()) ?? this.getRawValue()
} else {
  value = this.focused ? this.getRawValue() : this.getFormattedValue()
}
```

---

## What is NOT changed

- `input-util.ts` — `formatVehicleRegistrationNumber` and the `MAX_LENGTH_*` constants stay as-is; they are reused by the formatter class
- Other mask formatters (contract, claim, offer, etc.) — out of scope for this pass
- The `getMask` registry in `masks/index.ts` — already includes `VehicleRegistrationNumber`

---

## Files touched

| File | Change |
|------|--------|
| `packages/core/src/components/input/masks/vehicle-registration-number.ts` | Implement all methods |
| `packages/core/src/components/input/input.mask.ts` | Fix `onKeydown` type, remove console.logs |
| `packages/core/src/components/input/input.tsx` | Wire `onKeydown` + `format` in render |
