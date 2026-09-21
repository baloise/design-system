/**
 * Shared configuration for Badge component documentation pages
 * Import and reuse this across all badge documentation MDX files to reduce duplication
 */

export const BADGE_DOC_CONFIG = {
  section: 'Components / Badge',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-indicators-badge-badge--badge' },
    { label: 'Usage', storyId: 'components-indicators-badge-usage--usage' },
    { label: 'Variants', storyId: 'components-indicators-badge-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-indicators-badge-styling--styling' },
    { label: 'Accessibility', storyId: 'components-indicators-badge-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-indicators-badge-testing--testing' },
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
