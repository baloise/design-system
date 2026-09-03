import { themeQuartz } from 'ag-grid-community'

export { createBadgeCellRenderer } from './badge-cell-renderer'
export type { BadgeCellRendererOptions } from './badge-cell-renderer'
export { createButtonCellRenderer } from './button-cell-renderer'
export type { ButtonCellRendererAction } from './button-cell-renderer'
export { createTagCellRenderer } from './tag-cell-renderer'
export type { TagCellRendererOptions } from './tag-cell-renderer'
export { createTextCellRenderer } from './text-cell-renderer'
export type { TextCellRendererOptions } from './text-cell-renderer'

export const designSystemGridThemeParams = {
  accentColor: 'var(--ds-alias-surface-primary)',
  backgroundColor: 'var(--ds-alias-surface-white)',
  foregroundColor: 'var(--ds-table-color)',
  textColor: 'var(--ds-table-color)',
  borderColor: 'var(--ds-alias-border-color-grey-light)',
  borderRadius: 0,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
  columnBorder: false,
  rowBorder: { width: 'var(--ds-alias-border-width-base)', color: 'var(--ds-alias-border-color-grey-light)' },
  headerRowBorder: { width: 'var(--ds-alias-border-width-base)', color: 'var(--ds-alias-border-color-primary)' },
  headerBackgroundColor: 'var(--ds-alias-surface-white)',
  headerTextColor: 'var(--ds-table-color)',
  headerFontFamily: 'var(--ds-table-head-font-font-family)',
  headerFontWeight: 'var(--ds-table-head-font-font-weight)',
  headerFontSize: 'var(--ds-table-head-font-font-size)',
  fontFamily: 'var(--ds-table-font-font-family)',
  fontSize: 'var(--ds-table-font-font-size)',
  rowHoverColor: 'var(--ds-table-row-background-hover)',
  selectedRowBackgroundColor: 'var(--ds-table-row-background-active)',
  checkboxBorderRadius: 'var(--ds-alias-radius-base)',
  checkboxBorderWidth: 'var(--ds-alias-border-width-base)',
  checkboxUncheckedBackgroundColor: 'transparent',
  checkboxUncheckedBorderColor: 'var(--ds-alias-border-color-primary)',
  checkboxCheckedBackgroundColor: 'var(--ds-alias-surface-primary)',
  checkboxCheckedBorderColor: 'var(--ds-alias-border-color-primary)',
  checkboxCheckedShapeColor: 'var(--ds-alias-text-color-white)',
  checkboxIndeterminateBackgroundColor: 'var(--ds-alias-surface-primary)',
  checkboxIndeterminateBorderColor: 'var(--ds-alias-border-color-primary)',
  checkboxIndeterminateShapeColor: 'var(--ds-alias-text-color-white)',
  focusShadow: 'none',
}

export const designSystemGridTheme = themeQuartz.withParams(designSystemGridThemeParams)
