/**
 * Shared configuration for BrandIcon component documentation pages.
 */

export const BRAND_ICON_DOC_CONFIG = {
  section: 'Components / BrandIcon',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-brandicon--brandicon' },
    { label: 'Usage', storyId: 'components-brandicon--usage' },
    { label: 'Variants', storyId: 'components-brandicon--variants-overview' },
    { label: 'Styling', storyId: 'components-brandicon--styling' },
    { label: 'Accessibility', storyId: 'components-brandicon--accessibility' },
    { label: 'Testing', storyId: 'components-brandicon--testing' },
  ],
}

export const BRAND_ICON_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getBrandIconTabs('usage')
 */
export const getBrandIconTabs = (activeLabel: keyof typeof BRAND_ICON_TAB_TITLES) => {
  return BRAND_ICON_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === BRAND_ICON_TAB_TITLES[activeLabel],
  }))
}
