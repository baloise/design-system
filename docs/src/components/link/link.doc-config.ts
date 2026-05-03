/**
 * Shared configuration for Link component documentation pages.
 * Import and reuse this across all link documentation MDX files to reduce duplication.
 */

export const LINK_DOC_CONFIG = {
  section: 'Components / Link',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-navigation-link--overview' },
    { label: 'Usage', storyId: 'components-navigation-link--usage' },
    { label: 'Variants', storyId: 'components-navigation-link--variants-overview' },
    { label: 'Styling', storyId: 'components-navigation-link--styling' },
    { label: 'Accessibility', storyId: 'components-navigation-link--accessibility' },
  ],
}

export const LINK_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
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
