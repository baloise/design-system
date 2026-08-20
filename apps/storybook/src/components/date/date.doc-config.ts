/**
 * Shared configuration for Date component documentation pages.
 */

export const DATE_DOC_CONFIG = {
  section: 'Components / Date',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-date--date' },
    { label: 'Usage', storyId: 'components-date--usage' },
    { label: 'Variants', storyId: 'components-date--variants-overview' },
    { label: 'Styling', storyId: 'components-date--styling' },
    { label: 'Accessibility', storyId: 'components-date--accessibility' },
    { label: 'Testing', storyId: 'components-date--testing' },
  ],
}

export const DATE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getDateTabs = (activeLabel: keyof typeof DATE_TAB_TITLES) => {
  return DATE_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === DATE_TAB_TITLES[activeLabel],
  }))
}
