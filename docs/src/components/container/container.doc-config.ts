/**
 * Shared configuration for Container component documentation pages.
 */

export const CONTAINER_DOC_CONFIG = {
  section: 'Components / Container',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-container--container' },
    { label: 'Usage', storyId: 'components-container--usage' },
    { label: 'Variants', storyId: 'components-container--variants-overview' },
    { label: 'Styling', storyId: 'components-container--styling' },
    { label: 'Accessibility', storyId: 'components-container--accessibility' },
    { label: 'Testing', storyId: 'components-container--testing' },
  ],
}

export const CONTAINER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getContainerTabs('usage')
 */
export const getContainerTabs = (activeLabel: keyof typeof CONTAINER_TAB_TITLES) => {
  return CONTAINER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === CONTAINER_TAB_TITLES[activeLabel],
  }))
}
