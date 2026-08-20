import { describe, expect, it } from 'vitest'
import { baloiseGridTheme, baloiseGridThemeParams } from './index'

describe('baloiseGridTheme', () => {
  it('binds accentColor to the Baloise primary background token', () => {
    expect(baloiseGridThemeParams.accentColor).toBe('var(--ds-alias-background-color-primary)')
  })

  it('binds cellFontFamily to the Baloise body text font token', () => {
    expect(baloiseGridThemeParams.cellFontFamily).toBe('var(--ds-alias-text-family-body)')
  })

  it('binds headerFontFamily to the Baloise heading text font token', () => {
    expect(baloiseGridThemeParams.headerFontFamily).toBe('var(--ds-alias-text-family-heading)')
  })

  it('exports a themeQuartz-based AG Grid theme', () => {
    expect(baloiseGridTheme).toBeDefined()
    expect(baloiseGridTheme.withParams).toBeInstanceOf(Function)
  })
})
