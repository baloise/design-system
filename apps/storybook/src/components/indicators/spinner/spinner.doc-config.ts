/**
 * Shared configuration for Spinner component documentation pages.
 * Import and reuse this across all spinner documentation MDX files to reduce duplication.
 */

export const SPINNER_DOC_CONFIG = {
  section: 'Components / Spinner',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-indicators-spinner-spinner--spinner' },
    { label: 'Usage', storyId: 'components-indicators-spinner-usage--usage' },
    { label: 'Variants', storyId: 'components-indicators-spinner-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-indicators-spinner-styling--styling' },
    { label: 'Accessibility', storyId: 'components-indicators-spinner-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-indicators-spinner-testing--testing' },
  ],
}

export const SPINNER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getSpinnerTabs('usage')
 */
export const getSpinnerTabs = (activeLabel: keyof typeof SPINNER_TAB_TITLES) => {
  return SPINNER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === SPINNER_TAB_TITLES[activeLabel],
  }))
}
