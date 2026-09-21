/**
 * Shared configuration for Button component documentation pages.
 * Import and reuse this across all button documentation MDX files to reduce duplication.
 */

export const BUTTON_DOC_CONFIG = {
  section: 'Components / Button',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-actions-button-button--button' },
    { label: 'Usage', storyId: 'components-actions-button-usage--usage' },
    { label: 'Variants', storyId: 'components-actions-button-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-actions-button-styling--styling' },
    { label: 'Accessibility', storyId: 'components-actions-button-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-actions-button-testing--testing' },
  ],
}

export const BUTTON_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getButtonTabs('usage')
 */
export const getButtonTabs = (activeLabel: keyof typeof BUTTON_TAB_TITLES) => {
  return BUTTON_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === BUTTON_TAB_TITLES[activeLabel],
  }))
}
