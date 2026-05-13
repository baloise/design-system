/**
 * Shared configuration for Divider component documentation pages.
 * Import and reuse this across all divider documentation MDX files to reduce duplication.
 */

export const DIVIDER_DOC_CONFIG = {
  section: 'Components / Divider',
  color: 'yellow' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-divider--overview' },
    { label: 'Usage', storyId: 'components-divider--usage' },
    { label: 'Variants', storyId: 'components-divider--variants-overview' },
    { label: 'Styling', storyId: 'components-divider--styling' },
    { label: 'Accessibility', storyId: 'components-divider--accessibility' },
  ],
}

export const DIVIDER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getDividerTabs('usage')
 */
export const getDividerTabs = (activeLabel: keyof typeof DIVIDER_TAB_TITLES) => {
  return DIVIDER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === DIVIDER_TAB_TITLES[activeLabel],
  }))
}
