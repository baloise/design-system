/**
 * Shared configuration for Heading component documentation pages.
 * Import and reuse this across all heading documentation MDX files to reduce duplication.
 */

export const HEADING_DOC_CONFIG = {
  section: 'Components / Heading',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-structure-heading-heading--heading' },
    { label: 'Usage', storyId: 'components-structure-heading-usage--usage' },
    { label: 'Variants', storyId: 'components-structure-heading-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-structure-heading-styling--styling' },
    { label: 'Accessibility', storyId: 'components-structure-heading-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-structure-heading-testing--testing' },
  ],
}

export const HEADING_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
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
