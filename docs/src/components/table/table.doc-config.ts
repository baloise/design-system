/**
 * Shared configuration for Table component documentation pages.
 */

export const TABLE_DOC_CONFIG = {
  section: 'Components / Table',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-table--overview' },
    { label: 'Usage', storyId: 'components-table--usage' },
    { label: 'Variants', storyId: 'components-table--variants-overview' },
    { label: 'Styling', storyId: 'components-table--styling' },
    { label: 'Accessibility', storyId: 'components-table--accessibility' },
  ],
}

export const TABLE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

export const getTableTabs = (activeLabel: keyof typeof TABLE_TAB_TITLES) => {
  return TABLE_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TABLE_TAB_TITLES[activeLabel],
  }))
}
