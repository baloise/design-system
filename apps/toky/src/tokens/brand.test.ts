import { describe, expect, it } from 'vitest'
import { validateBrandName } from './brand'

describe('validateBrandName', () => {
  it('accepts a valid PascalCase name with no collisions', () => {
    expect(validateBrandName('Acme', ['Tcs'])).toBeNull()
  })

  it('rejects an empty or whitespace-only name', () => {
    expect(validateBrandName('', [])).toBe('empty')
    expect(validateBrandName('   ', [])).toBe('empty')
  })

  it('rejects names that are not PascalCase letters/digits', () => {
    expect(validateBrandName('acme', [])).toBe('invalid-format')
    expect(validateBrandName('Acme Dark', [])).toBe('invalid-format')
    expect(validateBrandName('Acme-Dark', [])).toBe('invalid-format')
    expect(validateBrandName('123Acme', [])).toBe('invalid-format')
  })

  it('allows digits after the first letter', () => {
    expect(validateBrandName('Acme2', [])).toBeNull()
  })

  it('rejects "Base" case-insensitively as reserved', () => {
    expect(validateBrandName('Base', [])).toBe('reserved')
    expect(validateBrandName('base', [])).toBe('invalid-format') // fails format before reserved check
    expect(validateBrandName('BASE', [])).toBe('reserved')
  })

  it('rejects a name colliding with an existing brand, case-insensitively', () => {
    expect(validateBrandName('Tcs', ['Tcs'])).toBe('duplicate')
    expect(validateBrandName('TCS', ['Tcs'])).toBe('duplicate')
  })

  it('rejects a name colliding with a staged (not-yet-real) brand', () => {
    expect(validateBrandName('Acme', ['Acme'])).toBe('duplicate')
  })
})
