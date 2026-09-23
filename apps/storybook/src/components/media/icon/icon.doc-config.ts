/**
 * Shared configuration for Icon component documentation pages.
 * Import and reuse this across all icon documentation MDX files to reduce duplication.
 */

export const ICON_DOC_CONFIG = {
  section: 'Components / Icon',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-media-icon-icon--icon' },
    { label: 'Usage', storyId: 'components-media-icon-usage--usage' },
    { label: 'Variants', storyId: 'components-media-icon-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-media-icon-styling--styling' },
    { label: 'Accessibility', storyId: 'components-media-icon-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-media-icon-testing--testing' },
  ],
}

export const ICON_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getIconTabs('usage')
 */
export const getIconTabs = (activeLabel: keyof typeof ICON_TAB_TITLES) => {
  return ICON_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === ICON_TAB_TITLES[activeLabel],
  }))
}
