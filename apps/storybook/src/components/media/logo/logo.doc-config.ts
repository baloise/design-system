/**
 * Shared configuration for Logo component documentation pages.
 * Import and reuse this across all logo documentation MDX files to reduce duplication.
 */

export const LOGO_DOC_CONFIG = {
  section: 'Components / Logo',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-media-logo-logo--logo' },
    { label: 'Usage', storyId: 'components-media-logo-usage--usage' },
    { label: 'Variants', storyId: 'components-media-logo-variants--variants' },
    { label: 'Styling', storyId: 'components-media-logo-styling--styling' },
    { label: 'Accessibility', storyId: 'components-media-logo-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-media-logo-testing--testing' },
  ],
}

export const LOGO_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getLogoTabs('usage')
 */
export const getLogoTabs = (activeLabel: keyof typeof LOGO_TAB_TITLES) => {
  return LOGO_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === LOGO_TAB_TITLES[activeLabel],
  }))
}
