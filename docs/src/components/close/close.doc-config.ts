/**
 * Shared configuration for Close component documentation pages.
 * Import and reuse this across all close documentation MDX files to reduce duplication.
 */

export const CLOSE_DOC_CONFIG = {
  section: 'Components / Close',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-feedback-close--overview' },
    { label: 'Usage', storyId: 'components-feedback-close--usage' },
    { label: 'Variants', storyId: 'components-feedback-close--variants-overview' },
    { label: 'Styling', storyId: 'components-feedback-close--styling' },
    { label: 'Accessibility', storyId: 'components-feedback-close--accessibility' },
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
