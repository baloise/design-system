# Input Mask: Vehicle Registration Number Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the `VehicleRegistrationNumber` mask formatter and wire it fully into the `ds-input` component so dots appear in real time as the user types.

**Architecture:** The formatter lives in `masks/vehicle-registration-number.ts` and implements `InputMaskFormatterInterface`. `InputMaskUtil` (already wired into `handleInput`) delegates to it. Two missing connections in `input.tsx` are added: `onKeydown` delegation and `maskUtil.format()` in `render()`.

**Tech Stack:** Stencil.js, TypeScript, Vitest

---

### Task 1: Fix `input.mask.ts` — type mismatch and debug logs

**Files:**
- Modify: `packages/core/src/components/input/input.mask.ts`

- [ ] **Step 1: Update `input.mask.ts`**

Replace the entire file with:

```typescript
export interface InputMaskInterface {}

export class InputMaskUtil {
  private formatter?: InputMaskFormatterInterface

  constructor(private component: InputMaskInterface) {}

  setFormatter(formatter: InputMaskFormatterInterface | undefined) {
    if (formatter) {
      this.formatter = formatter
    }
  }

  format(value: string | null) {
    return this.formatter?.format(value)
  }

  onInput(ev: InputEvent) {
    return this.formatter?.onInput(ev)
  }

  onKeydown(ev: KeyboardEvent) {
    return this.formatter?.onKeydown(ev)
  }
}

export interface InputMaskFormatterInterface {
  name: DS.InputMask
  maxLength: number

  format(value: string | null): string | null

  onInput(ev: InputEvent): void

  onKeydown(ev: KeyboardEvent): void
}

export class InputMaskFormatter {}
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/input/input.mask.ts
git commit -m "fix: correct onKeydown type to KeyboardEvent in InputMaskFormatterInterface"
```

---

### Task 2: Implement `VehicleRegistrationNumber`

**Files:**
- Modify: `packages/core/src/components/input/masks/vehicle-registration-number.ts`
- Test: `packages/core/src/components/input/test/input-util.spec.ts` (existing tests — run to verify)

- [ ] **Step 1: Replace the stub implementation**

```typescript
import { isCtrlOrCommandKey, ACTION_KEYS, NUMBER_KEYS } from '../../../utils/constants/keys.constant'
import { stopEventBubbling } from '../../../utils/form-control'
import { formatVehicleRegistrationNumber, MAX_LENGTH_VEHICLE_REGISTRATION_NUMBER } from '../input-util'
import { InputMaskFormatterInterface } from '../input.mask'

export class VehicleRegistrationNumber implements InputMaskFormatterInterface {
  name: DS.InputMask = 'vehicle-registration-number'
  maxLength = MAX_LENGTH_VEHICLE_REGISTRATION_NUMBER

  format(value: string | null): string | null {
    if (!value) return value
    return formatVehicleRegistrationNumber(value)
  }

  onInput(ev: InputEvent): void {
    const input = ev.target as HTMLInputElement | null
    if (!input) return

    const cursorStart = (ev.target as HTMLInputElement).selectionStart ?? 0
    const cursorEnd = (ev.target as HTMLInputElement).selectionEnd ?? 0

    const raw = input.value.replace(/\D/g, '').substring(0, this.maxLength)
    input.value = formatVehicleRegistrationNumber(raw)

    if (cursorStart < raw.length) {
      input.setSelectionRange(cursorStart, cursorEnd)
    }
  }

  onKeydown(ev: KeyboardEvent): void {
    if (isCtrlOrCommandKey(ev)) return
    if (![...NUMBER_KEYS, ...ACTION_KEYS].includes(ev.key)) {
      stopEventBubbling(ev)
    }
  }
}
```

- [ ] **Step 2: Run existing unit tests to verify `formatVehicleRegistrationNumber` still passes**

```bash
npx nx run core:test --testFile=packages/core/src/components/input/test/input-util.spec.ts
```

Expected: all `formatVehicleRegistrationNumber` tests pass (7 cases covering empty, partial, full, and 13-char truncation).

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/components/input/masks/vehicle-registration-number.ts
git commit -m "feat: implement VehicleRegistrationNumber mask formatter"
```

---

### Task 3: Wire the formatter into `input.tsx`

**Files:**
- Modify: `packages/core/src/components/input/input.tsx`

- [ ] **Step 1: Update `onKeydown` to delegate to the mask utility**

Find the `onKeydown` method (around line 543) and replace it:

```typescript
private onKeydown = (ev: KeyboardEvent) => {
  if (this.mask !== undefined) {
    return this.maskUtil.onKeydown(ev)
  }

  if (this.allowedKeyPress && !isNil(ev) && !isCtrlOrCommandKey(ev)) {
    const regex = new RegExp('^' + this.allowedKeyPress + '$')
    if (!regex.test(ev.key) && ![...ACTION_KEYS].includes(ev.key)) {
      return stopEventBubbling(ev)
    }
  }
}
```

- [ ] **Step 2: Update `render()` to use `maskUtil.format()` for the display value**

Find the `render()` method. Replace the line:

```typescript
let value = this.focused ? this.getRawValue() : this.getFormattedValue()
```

with:

```typescript
let value: string
if (this.mask) {
  value = this.maskUtil.format(this.getRawValue()) ?? this.getRawValue()
} else {
  value = this.focused ? this.getRawValue() : this.getFormattedValue()
}
```

- [ ] **Step 3: Remove the now-unused imports from `input-util`**

The commented code in `input.tsx` imported several formatters that are no longer called directly from the component. Remove these from the import at the top of the file (lines 24–37):

```typescript
import {
  MAX_LENGTH_CONTRACT_NUMBER,
  MAX_LENGTH_BE_ENTERPRISE_NUMBER,
  MAX_LENGTH_BE_IBAN,
  MAX_LENGTH_CLAIM_NUMBER,
  MAX_LENGTH_OFFER_NUMBER,
  MAX_LENGTH_VEHICLE_REGISTRATION_NUMBER,
} from './input-util'
```

becomes — remove the entire import block (all those symbols are now unused by the component):

```typescript
// (remove entirely — no longer imported directly)
```

> **Note:** Check whether the TypeScript compiler flags any unused import error after this step. If `formatBeEnterpriseNumber` etc. are still referenced in the commented block, they are already dead code and the import can be dropped.

- [ ] **Step 4: Run unit tests**

```bash
npx nx run core:test --testFile=packages/core/src/components/input/test/input-util.spec.ts
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/components/input/input.tsx
git commit -m "feat: wire VehicleRegistrationNumber formatter into ds-input onKeydown and render"
```
