/**
 * Shared configuration for Sheet component documentation pages.
 */

export const SHEET_DOC_CONFIG = {
  section: 'Components / Sheet',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-overlays-sheet-sheet--sheet' },
    { label: 'Usage', storyId: 'components-overlays-sheet-usage--usage' },
    { label: 'Variants', storyId: 'components-overlays-sheet-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-overlays-sheet-styling--styling' },
    { label: 'Accessibility', storyId: 'components-overlays-sheet-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-overlays-sheet-testing--testing' },
  ],
}

export const SHEET_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getSheetTabs = (activeLabel: keyof typeof SHEET_TAB_TITLES) => {
  return SHEET_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === SHEET_TAB_TITLES[activeLabel],
  }))
}
