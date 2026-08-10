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
  it('strips dashes', () => {
    expect(sanitizeSegmentInput('background-blue')).toBe('backgroundblue')
  })

  it('keeps spaces, for multi-word segments and emoji prefixes', () => {
    expect(sanitizeSegmentInput('Background Blue')).toBe('Background Blue')
    expect(sanitizeSegmentInput('🌈 Color')).toBe('🌈 Color')
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
  it('strips dashes but keeps spaces and separators', () => {
    expect(sanitizePathInput('Background Blue/Danger-7')).toBe('Background Blue/Danger7')
  })

  it('keeps both . and / as separators', () => {
    expect(sanitizePathInput('Color.Danger/7')).toBe('Color.Danger/7')
  })

  it('keeps emoji', () => {
    expect(sanitizePathInput('🌈 Color/Danger')).toBe('🌈 Color/Danger')
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

  it('accepts an all-uppercase acronym, e.g. a size like "XL"', () => {
    expect(isValidSegmentName('XL')).toBe(true)
  })

  it('accepts an uppercase word with leading digits, e.g. a size like "4XL"', () => {
    expect(isValidSegmentName('4XL')).toBe(true)
  })

  it('rejects a word that is neither PascalCase nor UPPERCASE', () => {
    expect(isValidSegmentName('4Xl')).toBe(false)
    expect(isValidSegmentName('4xl')).toBe(false)
  })

  it('accepts multiple PascalCase words separated by spaces', () => {
    expect(isValidSegmentName('Background Blue')).toBe(true)
  })

  it('accepts an emoji prefix, e.g. a layer or group icon', () => {
    expect(isValidSegmentName('🌈 Color')).toBe(true)
    expect(isValidSegmentName('🌐 Global')).toBe(true)
  })

  it('accepts a plain symbol prefix, e.g. a Figma folder icon like "▭"', () => {
    expect(isValidSegmentName('▭ Border')).toBe(true)
  })

  it('rejects a lowercase-leading segment', () => {
    expect(isValidSegmentName('backgroundBlue')).toBe(false)
  })

  it('rejects a dash', () => {
    expect(isValidSegmentName('background-blue')).toBe(false)
  })

  it('rejects a space-separated word that is not itself PascalCase', () => {
    expect(isValidSegmentName('background blue')).toBe(false)
  })

  it('rejects an emoji with no word after it', () => {
    expect(isValidSegmentName('🌈')).toBe(false)
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
