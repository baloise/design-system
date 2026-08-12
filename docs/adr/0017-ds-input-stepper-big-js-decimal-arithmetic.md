# 17. ds-input-stepper uses `big.js` for step arithmetic

Package: `packages/core`

Date: 2026-08-06

## Status

Accepted

## Context

`ds-input-stepper` performs a single arithmetic operation per user click:
`value ± step`. Both operands are `number` and may be non-integers —
common in the field for currency (`step = 0.01`), percentages
(`step = 0.1`), and other unit-based inputs.

IEEE-754 double-precision arithmetic produces surprising results here:
`0.1 + 0.2 === 0.30000000000000004`. A user clicking "+1" three times on a
stepper with `step = 0.1` starting at `0` would land on
`0.30000000000000004` instead of `0.3`, which would then appear directly in
the visible span (via `formatLocaleNumber`) and, worse, propagate through
`internals.setFormValue()` into whatever form the stepper is bound to.

Two families of fixes were considered:

1. A small in-repo helper that rounds to the maximum decimal precision of
   the two operands: `Math.round((a + b) * 10 ** decimals) / 10 ** decimals`.
2. An arbitrary-precision decimal library (`big.js`, `decimal.js`).

Option 1 is enough for the 95% case, but leaks in three real edge cases:

- If the incoming `value` prop was already floating-point-corrupted by an
  upstream computation (e.g. a parent passes `value={someTotal()}`),
  `String(value)` becomes `"0.30000000000000004"`; the helper reads 17
  decimals and multiplies by `10 ** 17`, which exceeds
  `Number.MAX_SAFE_INTEGER` (~`9e15`). The subsequent `Math.round` gives
  garbage.
- `String(1e-7) === "1e-7"` — scientific notation contains no `.`, so a
  naive `decimalsOf` returns 0 and the rounding step is skipped entirely.
- Large-magnitude values combined with small steps (`1e15 + 0.1`) lose
  precision _before_ the rounding step even runs.

None of these are absurd inputs for a general-purpose numeric form
control.

## Decision

`ds-input-stepper` uses `big.js` for the `value + step` and `value - step`
operations. Result:

```ts
import Big from 'big.js'
const next = new Big(this.value).plus(this.step).toNumber()
```

`big.js` is added as a runtime dependency of `packages/core`. The `@types/big.js`
package is added as a devDependency. Only the two arithmetic call sites
touch it; everything else in the component uses plain `number`.

## Consequences

**Positive**

- Guarantees that a **sequence** of exact-decimal operations does not
  accumulate floating-point drift. `0 + 0.1 + 0.1 + 0.1 === 0.3` (rather
  than `0.30000000000000004`) as long as each intermediate result stays
  inside big.js. Because our commit path assigns the big.js result back to
  `value` and reads it back through big.js on the next click, drift cannot
  build up across multiple clicks.
- Establishes a precedent: if a future numeric component needs the same
  guarantee (e.g. a currency input, a percentage editor), `big.js` is the
  DS choice.
- Matches the previous `bal-input-stepper` implementation, which also used
  `big.js` for the identical reason.

**Negative / risks**

- `big.js` does **not** repair an already-corrupted input. If a parent
  passes `value={0.1 + 0.2}`, that number arrives as
  `0.30000000000000004`; big.js parses those exact digits and preserves
  them. Fixing that would require rounding at the boundary (e.g. clamping
  input precision to `decimalsOf(step)`), which we currently do not do.
  Consumers that care must sanitize before setting `value`.
- Adds a runtime dependency to `packages/core` (~6 KB minified). Given the
  package already ships `air-datepicker`, `nouislider`, `luxon`, `imask`,
  `dompurify`, and others, the marginal cost is small — but it is another
  dependency to audit and keep updated.
- `big.js` is small and stable, but if it ever becomes unmaintained we
  would need to swap in an alternative (`decimal.js`, `bignumber.js`, or a
  hand-rolled helper). Because the surface used here is trivial
  (`new Big(a).plus(b).toNumber()`), that swap would be mechanical.

## Alternatives considered

- **In-repo `decimalsOf` + `Math.round` helper.** Rejected: fails on
  scientific-notation `step`/`value` and large-magnitude operands (10^d
  can exceed `Number.MAX_SAFE_INTEGER`). Cannot promise
  drift-free accumulation across many clicks even for well-formed inputs.
- **`decimal.js`.** Rejected: larger surface area, larger bundle, no
  additional benefit for the two-line arithmetic we actually need.
- **Do nothing; accept IEEE-754 drift.** Rejected: user-visible on the
  first three clicks of any `step = 0.1` stepper.
