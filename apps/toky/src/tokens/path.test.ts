import { describe, expect, it } from 'vitest'
import {
  invalidSegments,
  isReservedSegmentName,
  isValidSegmentName,
  parseTokenPath,
  reservedSegments,
  sanitizePathInput,
  sanitizeSegmentInput,
} from './path'

describe('sanitizeSegmentInput', () => {
  it('strips spaces and dashes', () => {
    expect(sanitizeSegmentInput('background blue')).toBe('backgroundblue')
    expect(sanitizeSegmentInput('background-blue')).toBe('backgroundblue')
  })

  it('strips separators, since a segment must never contain one', () => {
    expect(sanitizeSegmentInput('Color.Danger')).toBe('ColorDanger')
    expect(sanitizeSegmentInput('Color/Danger')).toBe('ColorDanger')
  })

  it('keeps letters and digits', () => {
    expect(sanitizeSegmentInput('BackgroundBlue700')).toBe('BackgroundBlue700')
  })
})

describe('sanitizePathInput', () => {
  it('strips spaces and dashes but keeps separators', () => {
    expect(sanitizePathInput('background blue/danger-7')).toBe('backgroundblue/danger7')
  })

  it('keeps both . and / as separators', () => {
    expect(sanitizePathInput('Color.Danger/7')).toBe('Color.Danger/7')
  })
})

describe('parseTokenPath', () => {
  it('splits on . or /', () => {
    expect(parseTokenPath('Color.Danger.7')).toEqual(['Color', 'Danger', '7'])
    expect(parseTokenPath('Color/Danger/7')).toEqual(['Color', 'Danger', '7'])
    expect(parseTokenPath('Color/Danger.7')).toEqual(['Color', 'Danger', '7'])
  })

  it('trims segments and drops empty ones', () => {
    expect(parseTokenPath(' Color / Danger ..7')).toEqual(['Color', 'Danger', '7'])
  })
})

describe('isValidSegmentName', () => {
  it('accepts PascalCase segments', () => {
    expect(isValidSegmentName('BackgroundBlue')).toBe(true)
  })

  it('accepts a bare number, e.g. a color scale step', () => {
    expect(isValidSegmentName('700')).toBe(true)
  })

  it('rejects a lowercase-leading segment', () => {
    expect(isValidSegmentName('backgroundBlue')).toBe(false)
  })

  it('rejects a segment containing a dash or space', () => {
    expect(isValidSegmentName('background-blue')).toBe(false)
    expect(isValidSegmentName('background blue')).toBe(false)
  })
})

describe('invalidSegments', () => {
  it('returns only the offending segments of a dot-joined name', () => {
    expect(invalidSegments('Color.danger.700')).toEqual(['danger'])
  })

  it('returns an empty array for a fully valid name', () => {
    expect(invalidSegments('Color.Danger.700')).toEqual([])
  })
})

describe('isReservedSegmentName', () => {
  it('flags "default" case-insensitively', () => {
    expect(isReservedSegmentName('default')).toBe(true)
    expect(isReservedSegmentName('Default')).toBe(true)
    expect(isReservedSegmentName('DEFAULT')).toBe(true)
  })

  it('does not flag a segment that merely contains the word', () => {
    expect(isReservedSegmentName('DefaultColor')).toBe(false)
  })

  it('does not flag an unrelated segment', () => {
    expect(isReservedSegmentName('Color')).toBe(false)
  })
})

describe('reservedSegments', () => {
  it('returns only the reserved segments of a dot-joined name', () => {
    expect(reservedSegments('Color.Default.700')).toEqual(['Default'])
  })

  it('returns an empty array when no segment is reserved', () => {
    expect(reservedSegments('Color.Danger.700')).toEqual([])
  })
})
