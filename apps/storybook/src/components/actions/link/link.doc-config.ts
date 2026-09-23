/**
 * Shared configuration for Link component documentation pages.
 * Import and reuse this across all link documentation MDX files to reduce duplication.
 */

export const LINK_DOC_CONFIG = {
  section: 'Components / Link',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-actions-link-link--link' },
    { label: 'Usage', storyId: 'components-actions-link-usage--usage' },
    { label: 'Variants', storyId: 'components-actions-link-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-actions-link-styling--styling' },
    { label: 'Accessibility', storyId: 'components-actions-link-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-actions-link-testing--testing' },
  ],
}

export const LINK_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getLinkTabs('usage')
 */
export const getLinkTabs = (activeLabel: keyof typeof LINK_TAB_TITLES) => {
  return LINK_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === LINK_TAB_TITLES[activeLabel],
  }))
}
