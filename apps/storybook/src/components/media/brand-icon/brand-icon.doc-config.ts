/**
 * Shared configuration for BrandIcon component documentation pages.
 */

export const BRAND_ICON_DOC_CONFIG = {
  section: 'Components / BrandIcon',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-media-brandicon-brandicon--brandicon' },
    { label: 'Usage', storyId: 'components-media-brandicon-usage--usage' },
    { label: 'Variants', storyId: 'components-media-brandicon-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-media-brandicon-styling--styling' },
    { label: 'Accessibility', storyId: 'components-media-brandicon-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-media-brandicon-testing--testing' },
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
