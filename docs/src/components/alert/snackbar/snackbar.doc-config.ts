export const SNACKBAR_DOC_CONFIG = {
  section: 'Components / Snackbar',
  color: 'yellow' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-snackbar--overview' },
    { label: 'Usage', storyId: 'components-snackbar--usage' },
    { label: 'Variants', storyId: 'components-snackbar--variants-overview' },
    { label: 'Styling', storyId: 'components-snackbar--styling' },
    { label: 'Accessibility', storyId: 'components-snackbar--accessibility' },
  ],
}

export const SNACKBAR_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

export const getSnackbarTabs = (activeLabel: keyof typeof SNACKBAR_TAB_TITLES) => {
  return SNACKBAR_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === SNACKBAR_TAB_TITLES[activeLabel],
  }))
}
