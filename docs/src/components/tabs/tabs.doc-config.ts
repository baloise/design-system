/**
 * Shared configuration for Tabs component documentation pages.
 */

export const TABS_DOC_CONFIG = {
  section: 'Components / Tabs',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-tabs--overview' },
    { label: 'Usage', storyId: 'components-tabs--usage' },
    { label: 'Variants', storyId: 'components-tabs--variants-overview' },
    { label: 'Styling', storyId: 'components-tabs--styling' },
    { label: 'Accessibility', storyId: 'components-tabs--accessibility' },
  ],
}

export const TABS_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

export const getTabsTabs = (activeLabel: keyof typeof TABS_TAB_TITLES) => {
  return TABS_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TABS_TAB_TITLES[activeLabel],
  }))
}
