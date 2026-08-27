import Big from 'big.js'

export function clampValue(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min
  if (value < min) return min
  if (value > max) return max
  return value
}

export function stepPlus(value: number, step: number): number {
  return new Big(value).plus(step).toNumber()
}

export function stepMinus(value: number, step: number): number {
  return new Big(value).minus(step).toNumber()
}
