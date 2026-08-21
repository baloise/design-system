/**
 * Shared configuration for Sheet component documentation pages.
 */

export const SHEET_DOC_CONFIG = {
  section: 'Components / Sheet',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-sheet--sheet' },
    { label: 'Usage', storyId: 'components-sheet--usage' },
    { label: 'Variants', storyId: 'components-sheet--variants-overview' },
    { label: 'Styling', storyId: 'components-sheet--styling' },
    { label: 'Accessibility', storyId: 'components-sheet--accessibility' },
    { label: 'Testing', storyId: 'components-sheet--testing' },
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
