/**
 * Shared configuration for List component documentation pages.
 * Import and reuse this across all list documentation MDX files to reduce duplication.
 */

export const LIST_DOC_CONFIG = {
  section: 'Components / List',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-list--overview' },
    { label: 'Usage', storyId: 'components-list--usage' },
    { label: 'Variants', storyId: 'components-list--variants-overview' },
    { label: 'Styling', storyId: 'components-list--styling' },
    { label: 'Accessibility', storyId: 'components-list--accessibility' },
  ],
}

export const LIST_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getListTabs('usage')
 */
export const getListTabs = (activeLabel: keyof typeof LIST_TAB_TITLES) => {
  return LIST_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === LIST_TAB_TITLES[activeLabel],
  }))
}
