/**
 * Shared configuration for Button component documentation pages.
 * Import and reuse this across all button documentation MDX files to reduce duplication.
 */

export const BUTTON_DOC_CONFIG = {
  section: 'Components / Button',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-button-button--button' },
    { label: 'Usage', storyId: 'components-button-usage--usage' },
    { label: 'Variants', storyId: 'components-button-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-button-styling--styling' },
    { label: 'Accessibility', storyId: 'components-button-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-button-testing--testing' },
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
