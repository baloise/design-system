/**
 * Shared configuration for Logo component documentation pages.
 * Import and reuse this across all logo documentation MDX files to reduce duplication.
 */

export const LOGO_DOC_CONFIG = {
  section: 'Components / Logo',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-logo--overview' },
    { label: 'Usage', storyId: 'components-logo--usage' },
    { label: 'Variants', storyId: 'components-logo--variants-overview' },
    { label: 'Styling', storyId: 'components-logo--styling' },
    { label: 'Accessibility', storyId: 'components-logo--accessibility' },
  ],
}

export const LOGO_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
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
