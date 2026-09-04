/**
 * Shared configuration for InputPhone component documentation pages.
 */

export const INPUTPHONE_DOC_CONFIG = {
  section: 'Components / InputPhone',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-inputphone--input-phone' },
    { label: 'Usage', storyId: 'components-inputphone--usage' },
    { label: 'Variants', storyId: 'components-inputphone--variants-overview' },
    { label: 'Styling', storyId: 'components-inputphone--styling' },
    { label: 'Accessibility', storyId: 'components-inputphone--accessibility' },
    { label: 'Testing', storyId: 'components-inputphone--testing' },
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
