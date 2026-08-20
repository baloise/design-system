import { themeQuartz } from 'ag-grid-community'

export const baloiseGridThemeParams = {
  accentColor: 'var(--ds-alias-background-color-primary)',
  cellFontFamily: 'var(--ds-alias-text-family-body)',
  headerFontFamily: 'var(--ds-alias-text-family-heading)',
}

export const baloiseGridTheme = themeQuartz.withParams(baloiseGridThemeParams)
