/**
 * Shared configuration for Badge component documentation pages
 * Import and reuse this across all badge documentation MDX files to reduce duplication
 */

export const BADGE_DOC_CONFIG = {
  section: 'Components / Badge',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-badge-badge--badge' },
    { label: 'Usage', storyId: 'components-badge-usage--usage' },
    { label: 'Variants', storyId: 'components-badge-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-badge-styling--styling' },
    { label: 'Accessibility', storyId: 'components-badge-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-badge-testing--testing' },
  ],
}

export const BADGE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set
 * Usage: getBadgeTabs('usage')
 */
export const getBadgeTabs = (activeLabel: keyof typeof BADGE_TAB_TITLES) => {
  return BADGE_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === BADGE_TAB_TITLES[activeLabel],
  }))
}
