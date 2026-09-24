/**
 * Shared configuration for Tabs component documentation pages.
 */

export const TABS_DOC_CONFIG = {
  section: 'Components / Tabs',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-navigation-tabs-tabs--tabs' },
    { label: 'Usage', storyId: 'components-navigation-tabs-usage--usage' },
    { label: 'Variants', storyId: 'components-navigation-tabs-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-navigation-tabs-styling--styling' },
    { label: 'Accessibility', storyId: 'components-navigation-tabs-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-navigation-tabs-testing--testing' },
  ],
}

export const TABS_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getTabsTabs = (activeLabel: keyof typeof TABS_TAB_TITLES) => {
  return TABS_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TABS_TAB_TITLES[activeLabel],
  }))
}
