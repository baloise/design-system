/**
 * Shared configuration for Data component documentation pages.
 */

export const DATA_DOC_CONFIG = {
  section: 'Components / Data',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-structure-data-data--data' },
    { label: 'Usage', storyId: 'components-structure-data-usage--usage' },
    { label: 'Variants', storyId: 'components-structure-data-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-structure-data-styling--styling' },
    { label: 'Accessibility', storyId: 'components-structure-data-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-structure-data-testing--testing' },
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
