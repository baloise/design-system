/**
 * Shared configuration for Pagination component documentation pages.
 * Import and reuse this across all pagination documentation MDX files to reduce duplication.
 */

export const PAGINATION_DOC_CONFIG = {
  section: 'Components / Pagination',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-pagination--overview' },
    { label: 'Usage', storyId: 'components-pagination--usage' },
    { label: 'Variants', storyId: 'components-pagination--variants-overview' },
    { label: 'Styling', storyId: 'components-pagination--styling' },
    { label: 'Accessibility', storyId: 'components-pagination--accessibility' },
  ],
}

export const PAGINATION_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getPaginationTabs('usage')
 */
export const getPaginationTabs = (activeLabel: keyof typeof PAGINATION_TAB_TITLES) => {
  return PAGINATION_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === PAGINATION_TAB_TITLES[activeLabel],
  }))
}
