/**
 * Shared configuration for Content component documentation pages.
 * Import and reuse this across all content documentation MDX files to reduce duplication.
 */

export const CONTENT_DOC_CONFIG = {
  section: 'Components / Content',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-content--overview' },
    { label: 'Usage', storyId: 'components-content--usage' },
    { label: 'Variants', storyId: 'components-content--variants-overview' },
    { label: 'Styling', storyId: 'components-content--styling' },
    { label: 'Accessibility', storyId: 'components-content--accessibility' },
  ],
}

export const CONTENT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getContentTabs('usage')
 */
export const getContentTabs = (activeLabel: keyof typeof CONTENT_TAB_TITLES) => {
  return CONTENT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === CONTENT_TAB_TITLES[activeLabel],
  }))
}
