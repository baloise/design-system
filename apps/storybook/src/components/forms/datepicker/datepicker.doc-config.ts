/**
 * Shared configuration for Datepicker component documentation pages.
 */

export const DATEPICKER_DOC_CONFIG = {
  section: 'Components / Forms / Datepicker',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-datepicker-datepicker--datepicker' },
    { label: 'Usage', storyId: 'components-forms-datepicker-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-datepicker-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-datepicker-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-datepicker-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-datepicker-testing--testing' },
  ],
}

export const DATEPICKER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getDatepickerTabs = (activeLabel: keyof typeof DATEPICKER_TAB_TITLES) => {
  return DATEPICKER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === DATEPICKER_TAB_TITLES[activeLabel],
  }))
}
