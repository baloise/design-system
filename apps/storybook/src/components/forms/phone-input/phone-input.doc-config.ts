/**
 * Shared configuration for Phone-input component documentation pages.
 */

export const PHONE_INPUT_DOC_CONFIG = {
  section: 'Components / Forms / Phone-input',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-phone-input-phone-input--phone-input' },
    { label: 'Usage', storyId: 'components-forms-phone-input-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-phone-input-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-phone-input-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-phone-input-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-phone-input-testing--testing' },
  ],
}

export const PHONE_INPUT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getPhoneInputTabs('usage')
 */
export const getPhoneInputTabs = (activeLabel: keyof typeof PHONE_INPUT_TAB_TITLES) => {
  return PHONE_INPUT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === PHONE_INPUT_TAB_TITLES[activeLabel],
  }))
}
