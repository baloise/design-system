/**
 * Shared configuration for Data component documentation pages.
 */

export const DATA_DOC_CONFIG = {
  section: 'Components / Data',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-data--data' },
    { label: 'Usage', storyId: 'components-data--usage' },
    { label: 'Variants', storyId: 'components-data--variants-overview' },
    { label: 'Styling', storyId: 'components-data--styling' },
    { label: 'Accessibility', storyId: 'components-data--accessibility' },
    { label: 'Testing', storyId: 'components-data--testing' },
  ],
}

export const DATA_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getDataTabs = (activeLabel: keyof typeof DATA_TAB_TITLES) => {
  return DATA_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === DATA_TAB_TITLES[activeLabel],
  }))
}
