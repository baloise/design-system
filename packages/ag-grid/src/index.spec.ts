import { describe, expect, it } from 'vitest'
import { designSystemGridTheme, designSystemGridThemeParams } from './index'

describe('designSystemGridTheme', () => {
  it('binds accentColor to the primary surface token', () => {
    expect(designSystemGridThemeParams.accentColor).toBe('var(--ds-alias-surface-primary)')
  })

  it('binds fontFamily to the ds-table body font token', () => {
    expect(designSystemGridThemeParams.fontFamily).toBe('var(--ds-table-font-font-family)')
  })

  it('binds headerFontFamily to the ds-table head font token', () => {
    expect(designSystemGridThemeParams.headerFontFamily).toBe('var(--ds-table-head-font-font-family)')
  })

  it('binds header and row borders to the ds-table border tokens', () => {
    expect(designSystemGridThemeParams.headerRowBorder).toEqual({
      width: 'var(--ds-alias-border-width-base)',
      color: 'var(--ds-alias-border-color-primary)',
    })
    expect(designSystemGridThemeParams.rowBorder).toEqual({
      width: 'var(--ds-alias-border-width-base)',
      color: 'var(--ds-alias-border-color-grey-light)',
    })
  })

  it('binds the header background to the same token as the row background, and makes header text bold', () => {
    expect(designSystemGridThemeParams.headerBackgroundColor).toBe(designSystemGridThemeParams.backgroundColor)
    expect(designSystemGridThemeParams.headerFontWeight).toBe('var(--ds-table-head-font-font-weight)')
  })

  it('binds row hover and selection colors to the ds-table row tokens', () => {
    expect(designSystemGridThemeParams.rowHoverColor).toBe('var(--ds-table-row-background-hover)')
    expect(designSystemGridThemeParams.selectedRowBackgroundColor).toBe('var(--ds-table-row-background-active)')
  })

  it('binds checkbox colors and shape to the ds-checkbox tokens', () => {
    expect(designSystemGridThemeParams.checkboxBorderRadius).toBe('var(--ds-alias-radius-base)')
    expect(designSystemGridThemeParams.checkboxBorderWidth).toBe('var(--ds-alias-border-width-base)')
    expect(designSystemGridThemeParams.checkboxUncheckedBackgroundColor).toBe('transparent')
    expect(designSystemGridThemeParams.checkboxUncheckedBorderColor).toBe('var(--ds-alias-border-color-primary)')
    expect(designSystemGridThemeParams.checkboxCheckedBackgroundColor).toBe('var(--ds-alias-surface-primary)')
    expect(designSystemGridThemeParams.checkboxCheckedBorderColor).toBe('var(--ds-alias-border-color-primary)')
    expect(designSystemGridThemeParams.checkboxCheckedShapeColor).toBe('var(--ds-alias-text-color-white)')
    expect(designSystemGridThemeParams.checkboxIndeterminateBackgroundColor).toBe('var(--ds-alias-surface-primary)')
    expect(designSystemGridThemeParams.checkboxIndeterminateBorderColor).toBe('var(--ds-alias-border-color-primary)')
    expect(designSystemGridThemeParams.checkboxIndeterminateShapeColor).toBe('var(--ds-alias-text-color-white)')
  })

  it('exports a themeQuartz-based AG Grid theme', () => {
    expect(designSystemGridTheme).toBeDefined()
    expect(designSystemGridTheme.withParams).toBeInstanceOf(Function)
  })
})
