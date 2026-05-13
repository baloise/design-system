/**
 * Shared configuration for Badge component documentation pages
 * Import and reuse this across all badge documentation MDX files to reduce duplication
 */

export const BADGE_DOC_CONFIG = {
  section: 'Components / Badge',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-badge--overview' },
    { label: 'Usage', storyId: 'components-badge--usage' },
    { label: 'Variants', storyId: 'components-badge--variants-overview' },
    { label: 'Styling', storyId: 'components-badge--styling' },
    { label: 'Accessibility', storyId: 'components-badge--accessibility' },
  ],
}

export const BADGE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
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
