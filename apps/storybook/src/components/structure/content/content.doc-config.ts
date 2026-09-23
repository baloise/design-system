/**
 * Shared configuration for Content component documentation pages.
 * Import and reuse this across all content documentation MDX files to reduce duplication.
 */

export const CONTENT_DOC_CONFIG = {
  section: 'Components / Content',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-structure-content-content--content' },
    { label: 'Usage', storyId: 'components-structure-content-usage--usage' },
    { label: 'Variants', storyId: 'components-structure-content-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-structure-content-styling--styling' },
    { label: 'Accessibility', storyId: 'components-structure-content-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-structure-content-testing--testing' },
  ],
}

export const CONTENT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
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
