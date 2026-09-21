export const COUNTER_DOC_CONFIG = {
  section: 'Components / Forms / Counter',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-counter-counter--counter' },
    { label: 'Usage', storyId: 'components-forms-counter-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-counter-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-counter-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-counter-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-counter-testing--testing' },
  ],
}

export const COUNTER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getCounterTabs = (activeLabel: keyof typeof COUNTER_TAB_TITLES) => {
  return COUNTER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === COUNTER_TAB_TITLES[activeLabel],
  }))
}
