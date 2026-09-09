export const SNACKBAR_DOC_CONFIG = {
  section: 'Components / Snackbar',
  color: 'yellow' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-snackbar-snackbar--snackbar' },
    { label: 'Usage', storyId: 'components-snackbar-usage--usage' },
    { label: 'Variants', storyId: 'components-snackbar-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-snackbar-styling--styling' },
    { label: 'Accessibility', storyId: 'components-snackbar-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-snackbar-testing--testing' },
  ],
}

export const SNACKBAR_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getSnackbarTabs = (activeLabel: keyof typeof SNACKBAR_TAB_TITLES) => {
  return SNACKBAR_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === SNACKBAR_TAB_TITLES[activeLabel],
  }))
}
