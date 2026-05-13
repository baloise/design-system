/**
 * Shared configuration for Heading component documentation pages.
 * Import and reuse this across all heading documentation MDX files to reduce duplication.
 */

export const HEADING_DOC_CONFIG = {
  section: 'Components / Heading',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-heading--overview' },
    { label: 'Usage', storyId: 'components-heading--usage' },
    { label: 'Variants', storyId: 'components-heading--variants-overview' },
    { label: 'Styling', storyId: 'components-heading--styling' },
    { label: 'Accessibility', storyId: 'components-heading--accessibility' },
  ],
}

export const HEADING_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getHeadingTabs('usage')
 */
export const getHeadingTabs = (activeLabel: keyof typeof HEADING_TAB_TITLES) => {
  return HEADING_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === HEADING_TAB_TITLES[activeLabel],
  }))
}
