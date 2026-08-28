import { themeQuartz } from 'ag-grid-community'

export { createBadgeCellRenderer } from './badge-cell-renderer'
export type { BadgeCellRendererOptions } from './badge-cell-renderer'
export { createButtonCellRenderer } from './button-cell-renderer'
export type { ButtonCellRendererAction } from './button-cell-renderer'
export { createTagCellRenderer } from './tag-cell-renderer'
export type { TagCellRendererOptions } from './tag-cell-renderer'
export { createTextCellRenderer } from './text-cell-renderer'
export type { TextCellRendererOptions } from './text-cell-renderer'

export const helvetiaGridThemeParams = {
  accentColor: 'var(--ds-alias-background-color-primary)',
  backgroundColor: 'var(--ds-table-background-color)',
  foregroundColor: 'var(--ds-table-color)',
  textColor: 'var(--ds-table-color)',
  borderColor: 'var(--ds-table-cell-border-color)',
  borderRadius: 0,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
  columnBorder: false,
  rowBorder: { width: 'var(--ds-alias-border-width-base)', color: 'var(--ds-table-cell-border-color)' },
  headerRowBorder: { width: 'var(--ds-alias-border-width-base)', color: 'var(--ds-table-head-cell-border-color)' },
  headerBackgroundColor: 'var(--ds-table-background-color)',
  headerTextColor: 'var(--ds-table-head-cell-color)',
  headerFontFamily: 'var(--ds-alias-text-family-heading)',
  headerFontWeight: 'var(--ds-alias-text-weight-bold)',
  headerFontSize: 'var(--ds-table-head-font-size)',
  fontFamily: 'var(--ds-alias-text-family-body)',
  fontSize: 'var(--ds-alias-text-size-base-mobile)',
  rowHoverColor: 'var(--ds-table-row-background-color-hover)',
  selectedRowBackgroundColor: 'var(--ds-table-row-background-color-active)',
  checkboxBorderRadius: 'var(--ds-alias-radius-base)',
  checkboxBorderWidth: 'var(--ds-alias-border-width-base)',
  checkboxUncheckedBackgroundColor: 'transparent',
  checkboxUncheckedBorderColor: 'var(--ds-alias-border-color-primary)',
  checkboxCheckedBackgroundColor: 'var(--ds-alias-background-color-primary)',
  checkboxCheckedBorderColor: 'var(--ds-alias-border-color-primary)',
  checkboxCheckedShapeColor: 'var(--ds-alias-text-color-white)',
  checkboxIndeterminateBackgroundColor: 'var(--ds-alias-background-color-primary)',
  checkboxIndeterminateBorderColor: 'var(--ds-alias-border-color-primary)',
  checkboxIndeterminateShapeColor: 'var(--ds-alias-text-color-white)',
  focusShadow: 'none',
}

export const helvetiaGridTheme = themeQuartz.withParams(helvetiaGridThemeParams)
