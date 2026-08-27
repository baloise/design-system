import { describe, expect, it } from 'vitest'
import { helvetiaGridTheme, helvetiaGridThemeParams } from './index'

describe('helvetiaGridTheme', () => {
  it('binds accentColor to the Helvetia primary background token', () => {
    expect(helvetiaGridThemeParams.accentColor).toBe('var(--ds-alias-background-color-primary)')
  })

  it('binds fontFamily to the Helvetia body text font token', () => {
    expect(helvetiaGridThemeParams.fontFamily).toBe('var(--ds-alias-text-family-body)')
  })

  it('binds headerFontFamily to the Helvetia heading text font token', () => {
    expect(helvetiaGridThemeParams.headerFontFamily).toBe('var(--ds-alias-text-family-heading)')
  })

  it('binds header and row borders to the ds-table border tokens', () => {
    expect(helvetiaGridThemeParams.headerRowBorder).toEqual({
      width: 'var(--ds-alias-border-width-base)',
      color: 'var(--ds-table-head-cell-border-color)',
    })
    expect(helvetiaGridThemeParams.rowBorder).toEqual({
      width: 'var(--ds-alias-border-width-base)',
      color: 'var(--ds-table-cell-border-color)',
    })
  })

  it('binds the header background to the same token as the row background, and makes header text bold', () => {
    expect(helvetiaGridThemeParams.headerBackgroundColor).toBe(helvetiaGridThemeParams.backgroundColor)
    expect(helvetiaGridThemeParams.headerFontWeight).toBe('var(--ds-alias-text-weight-bold)')
  })

  it('binds row hover and selection colors to the ds-table row tokens', () => {
    expect(helvetiaGridThemeParams.rowHoverColor).toBe('var(--ds-table-row-background-color-hover)')
    expect(helvetiaGridThemeParams.selectedRowBackgroundColor).toBe('var(--ds-table-row-background-color-active)')
  })

  it('binds checkbox colors and shape to the ds-checkbox tokens', () => {
    expect(helvetiaGridThemeParams.checkboxBorderRadius).toBe('var(--ds-alias-radius-base)')
    expect(helvetiaGridThemeParams.checkboxBorderWidth).toBe('var(--ds-alias-border-width-base)')
    expect(helvetiaGridThemeParams.checkboxUncheckedBackgroundColor).toBe('transparent')
    expect(helvetiaGridThemeParams.checkboxUncheckedBorderColor).toBe('var(--ds-alias-border-color-primary)')
    expect(helvetiaGridThemeParams.checkboxCheckedBackgroundColor).toBe('var(--ds-alias-background-color-primary)')
    expect(helvetiaGridThemeParams.checkboxCheckedBorderColor).toBe('var(--ds-alias-border-color-primary)')
    expect(helvetiaGridThemeParams.checkboxCheckedShapeColor).toBe('var(--ds-alias-text-color-white)')
    expect(helvetiaGridThemeParams.checkboxIndeterminateBackgroundColor).toBe(
      'var(--ds-alias-background-color-primary)',
    )
    expect(helvetiaGridThemeParams.checkboxIndeterminateBorderColor).toBe('var(--ds-alias-border-color-primary)')
    expect(helvetiaGridThemeParams.checkboxIndeterminateShapeColor).toBe('var(--ds-alias-text-color-white)')
  })

  it('exports a themeQuartz-based AG Grid theme', () => {
    expect(helvetiaGridTheme).toBeDefined()
    expect(helvetiaGridTheme.withParams).toBeInstanceOf(Function)
  })
})
