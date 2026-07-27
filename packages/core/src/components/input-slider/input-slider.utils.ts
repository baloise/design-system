/**
 * Clamps `value` into `[min, max]`. Degrades sanely when `min > max` by
 * treating the effective range as `[min(min, max), max(min, max)]`.
 */
export function clampValue(value: number, min: number, max: number): number {
  const lower = Math.min(min, max)
  const upper = Math.max(min, max)
  return Math.min(Math.max(value, lower), upper)
}

/**
 * Resolves the initial value: a range input can never be empty, so an unset
 * (`NaN`, this codebase's "empty number" sentinel — see `isValueEmpty`) value
 * defaults to `min`.
 */
export function resolveInitialValue(value: number, min: number): number {
  return isNaN(value) ? min : value
}
