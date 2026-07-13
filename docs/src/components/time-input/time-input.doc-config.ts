/**
 * Shared configuration for Time Input component documentation pages.
 */

export const TIME_INPUT_DOC_CONFIG = {
  section: 'Components / Time Input',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-time-input--time-input' },
    { label: 'Usage', storyId: 'components-time-input--usage' },
    { label: 'Variants', storyId: 'components-time-input--variants-overview' },
    { label: 'Styling', storyId: 'components-time-input--styling' },
    { label: 'Accessibility', storyId: 'components-time-input--accessibility' },
    { label: 'Testing', storyId: 'components-time-input--testing' },
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
