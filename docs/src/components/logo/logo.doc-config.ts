/**
 * Shared configuration for Logo component documentation pages.
 * Import and reuse this across all logo documentation MDX files to reduce duplication.
 */

export const LOGO_DOC_CONFIG = {
  section: 'Components / Logo',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-brand-logo--overview' },
    { label: 'Usage', storyId: 'components-brand-logo--usage' },
    { label: 'Variants', storyId: 'components-brand-logo--variants-overview' },
    { label: 'Styling', storyId: 'components-brand-logo--styling' },
    { label: 'Accessibility', storyId: 'components-brand-logo--accessibility' },
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
