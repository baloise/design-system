/**
 * Shared configuration for Icon component documentation pages.
 * Import and reuse this across all icon documentation MDX files to reduce duplication.
 */

export const ICON_DOC_CONFIG = {
  section: 'Components / Icon',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-data-display-icon--overview' },
    { label: 'Usage', storyId: 'components-data-display-icon--usage' },
    { label: 'Variants', storyId: 'components-data-display-icon--variants-overview' },
    { label: 'Styling', storyId: 'components-data-display-icon--styling' },
    { label: 'Accessibility', storyId: 'components-data-display-icon--accessibility' },
  ],
}

export const ICON_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getIconTabs('usage')
 */
export const getIconTabs = (activeLabel: keyof typeof ICON_TAB_TITLES) => {
  return ICON_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === ICON_TAB_TITLES[activeLabel],
  }))
}
