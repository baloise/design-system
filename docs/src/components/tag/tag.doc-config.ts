/**
 * Shared configuration for Tag component documentation pages.
 * Import and reuse this across all tag documentation MDX files to reduce duplication.
 */

export const TAG_DOC_CONFIG = {
  section: 'Components / Tag',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-data-display-tag--overview' },
    { label: 'Usage', storyId: 'components-data-display-tag--usage' },
    { label: 'Variants', storyId: 'components-data-display-tag--variants-overview' },
    { label: 'Styling', storyId: 'components-data-display-tag--styling' },
    { label: 'Accessibility', storyId: 'components-data-display-tag--accessibility' },
  ],
}

export const TAG_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getTagTabs('usage')
 */
export const getTagTabs = (activeLabel: keyof typeof TAG_TAB_TITLES) => {
  return TAG_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TAG_TAB_TITLES[activeLabel],
  }))
}
