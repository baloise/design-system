/**
 * Shared configuration for Text component documentation pages.
 * Import and reuse this across all text documentation MDX files to reduce duplication.
 */

export const TEXT_DOC_CONFIG = {
  section: 'Components / Text',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-structure-text-text--text' },
    { label: 'Usage', storyId: 'components-structure-text-usage--usage' },
    { label: 'Variants', storyId: 'components-structure-text-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-structure-text-styling--styling' },
    { label: 'Accessibility', storyId: 'components-structure-text-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-structure-text-testing--testing' },
  ],
}

export const TEXT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getTextTabs('usage')
 */
export const getTextTabs = (activeLabel: keyof typeof TEXT_TAB_TITLES) => {
  return TEXT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TEXT_TAB_TITLES[activeLabel],
  }))
}
