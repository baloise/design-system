/**
 * Shared configuration for App component documentation pages.
 * Import and reuse this across all app documentation MDX files to reduce duplication.
 */

export const APP_DOC_CONFIG = {
  section: 'Components / App',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-navigation-app--overview' },
    { label: 'Usage', storyId: 'components-navigation-app--usage' },
    { label: 'Variants', storyId: 'components-navigation-app--variants-overview' },
    { label: 'Styling', storyId: 'components-navigation-app--styling' },
    { label: 'Accessibility', storyId: 'components-navigation-app--accessibility' },
  ],
}

export const APP_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
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
