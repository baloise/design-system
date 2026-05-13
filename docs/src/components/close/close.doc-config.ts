/**
 * Shared configuration for Close component documentation pages.
 * Import and reuse this across all close documentation MDX files to reduce duplication.
 */

export const CLOSE_DOC_CONFIG = {
  section: 'Components / Close',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-close--overview' },
    { label: 'Usage', storyId: 'components-close--usage' },
    { label: 'Variants', storyId: 'components-close--variants-overview' },
    { label: 'Styling', storyId: 'components-close--styling' },
    { label: 'Accessibility', storyId: 'components-close--accessibility' },
  ],
}

export const CLOSE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
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
