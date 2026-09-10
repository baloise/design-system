/**
 * Shared configuration for Date component documentation pages.
 */

export const DATE_DOC_CONFIG = {
  section: 'Components / Forms / Date',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-date-date--date' },
    { label: 'Usage', storyId: 'components-forms-date-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-date-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-date-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-date-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-date-testing--testing' },
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
