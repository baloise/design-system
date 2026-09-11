/**
 * Shared configuration for Time Input component documentation pages.
 */

export const TIME_INPUT_DOC_CONFIG = {
  section: 'Components / Forms / Time Input',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-time-input-time-input--time-input' },
    { label: 'Usage', storyId: 'components-forms-time-input-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-time-input-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-time-input-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-time-input-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-time-input-testing--testing' },
  ],
}

export const TIME_INPUT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getTimeInputTabs = (activeLabel: keyof typeof TIME_INPUT_TAB_TITLES) => {
  return TIME_INPUT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TIME_INPUT_TAB_TITLES[activeLabel],
  }))
}
