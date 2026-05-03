/**
 * Shared configuration for Progress-bar component documentation pages.
 * Import and reuse this across all progress-bar documentation MDX files to reduce duplication.
 */

export const PROGRESS_BAR_DOC_CONFIG = {
  section: 'Components / Progress-bar',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-data-display-progress-bar--overview' },
    { label: 'Usage', storyId: 'components-data-display-progress-bar--usage' },
    { label: 'Variants', storyId: 'components-data-display-progress-bar--variants-overview' },
    { label: 'Styling', storyId: 'components-data-display-progress-bar--styling' },
    { label: 'Accessibility', storyId: 'components-data-display-progress-bar--accessibility' },
  ],
}

export const PROGRESS_BAR_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getProgressBarTabs('usage')
 */
export const getProgressBarTabs = (activeLabel: keyof typeof PROGRESS_BAR_TAB_TITLES) => {
  return PROGRESS_BAR_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === PROGRESS_BAR_TAB_TITLES[activeLabel],
  }))
}
