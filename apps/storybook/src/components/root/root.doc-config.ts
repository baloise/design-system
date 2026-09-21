/**
 * Shared configuration for Root component documentation pages.
 * Import and reuse this across all root documentation MDX files to reduce duplication.
 */

export const ROOT_DOC_CONFIG = {
  section: 'Components / Root',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-root-root--root' },
    { label: 'Usage', storyId: 'components-root-usage--usage' },
    { label: 'Variants', storyId: 'components-root-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-root-styling--styling' },
    { label: 'Accessibility', storyId: 'components-root-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-root-testing--testing' },
  ],
}

export const ROOT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getRootTabs('usage')
 */
export const getRootTabs = (activeLabel: keyof typeof ROOT_TAB_TITLES) => {
  return ROOT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === ROOT_TAB_TITLES[activeLabel],
  }))
}
