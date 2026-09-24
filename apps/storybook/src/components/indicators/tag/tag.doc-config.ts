/**
 * Shared configuration for Tag component documentation pages.
 * Import and reuse this across all tag documentation MDX files to reduce duplication.
 */

export const TAG_DOC_CONFIG = {
  section: 'Components / Tag',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-indicators-tag-tag--tag' },
    { label: 'Usage', storyId: 'components-indicators-tag-usage--usage' },
    { label: 'Variants', storyId: 'components-indicators-tag-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-indicators-tag-styling--styling' },
    { label: 'Accessibility', storyId: 'components-indicators-tag-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-indicators-tag-testing--testing' },
  ],
}

export const TAG_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getTagTabs('usage')
 */
export const getTagTabs = (activeLabel: keyof typeof TAG_TAB_TITLES) => {
  return TAG_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TAG_TAB_TITLES[activeLabel],
  }))
}
