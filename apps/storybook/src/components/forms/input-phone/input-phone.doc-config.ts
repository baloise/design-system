/**
 * Shared configuration for InputPhone component documentation pages.
 */

export const INPUTPHONE_DOC_CONFIG = {
  section: 'Components / Forms / InputPhone',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-inputphone-input-phone--input-phone' },
    { label: 'Usage', storyId: 'components-forms-inputphone-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-inputphone-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-inputphone-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-inputphone-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-inputphone-testing--testing' },
  ],
}

export const INPUTPHONE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getInputPhoneTabs('usage')
 */
export const getInputPhoneTabs = (activeLabel: keyof typeof INPUTPHONE_TAB_TITLES) => {
  return INPUTPHONE_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === INPUTPHONE_TAB_TITLES[activeLabel],
  }))
}
