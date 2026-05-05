/**
 * Shared configuration for Toggle component documentation pages.
 * Import and reuse this across all toggle documentation MDX files to reduce duplication.
 */

export const TOGGLE_DOC_CONFIG = {
  section: 'Components / Forms / Toggle',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-toggle--overview' },
    { label: 'Usage', storyId: 'components-forms-toggle--usage' },
    { label: 'Variants', storyId: 'components-forms-toggle--variants-overview' },
    { label: 'Styling', storyId: 'components-forms-toggle--styling' },
    { label: 'Accessibility', storyId: 'components-forms-toggle--accessibility' },
  ],
}

export const TOGGLE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getToggleTabs('usage')
 */
export const getToggleTabs = (activeLabel: keyof typeof TOGGLE_TAB_TITLES) => {
  return TOGGLE_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TOGGLE_TAB_TITLES[activeLabel],
  }))
}
