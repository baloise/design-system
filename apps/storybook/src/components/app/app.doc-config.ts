/**
 * Shared configuration for App component documentation pages.
 * Import and reuse this across all app documentation MDX files to reduce duplication.
 */

export const APP_DOC_CONFIG = {
  section: 'Components / App',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-app-app--app' },
    { label: 'Usage', storyId: 'components-app-usage--usage' },
    { label: 'Variants', storyId: 'components-app-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-app-styling--styling' },
    { label: 'Accessibility', storyId: 'components-app-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-app-testing--testing' },
  ],
}

export const APP_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getAppTabs('usage')
 */
export const getAppTabs = (activeLabel: keyof typeof APP_TAB_TITLES) => {
  return APP_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === APP_TAB_TITLES[activeLabel],
  }))
}
