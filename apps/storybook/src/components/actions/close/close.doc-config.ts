/**
 * Shared configuration for Close component documentation pages.
 * Import and reuse this across all close documentation MDX files to reduce duplication.
 */

export const CLOSE_DOC_CONFIG = {
  section: 'Components / Close',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-actions-close-close--close' },
    { label: 'Usage', storyId: 'components-actions-close-usage--usage' },
    { label: 'Variants', storyId: 'components-actions-close-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-actions-close-styling--styling' },
    { label: 'Accessibility', storyId: 'components-actions-close-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-actions-close-testing--testing' },
  ],
}

export const CLOSE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getCloseTabs('usage')
 */
export const getCloseTabs = (activeLabel: keyof typeof CLOSE_TAB_TITLES) => {
  return CLOSE_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === CLOSE_TAB_TITLES[activeLabel],
  }))
}
